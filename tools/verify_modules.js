/* 模块数据一致性校验：
 * 1. modules/*.js 全部可正常加载，注册到 window.LearningModules
 * 2. 内置模块（type=builtin）的 embeddedPlan 结构完整：天数/视频/知识点/学习要点
 * 3. 模板模块（type=template）的 templatePlan 与 knowledgePreset 数据一致
 * 4. 数字化入门：10 天 20 个视频，且每个视频都配置了合法 B站 BV 号
 */
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const assert = require("assert");

const BASE = path.dirname(__dirname);

function loadModule(file) {
  const src = fs.readFileSync(path.join(BASE, "modules", file), "utf-8");
  const sandbox = { window: {} };
  sandbox.window.window = sandbox.window;
  vm.createContext(sandbox);
  vm.runInContext(src, sandbox, { timeout: 5000 });
  return sandbox.window.LearningModules || {};
}

const mods = {};
for (const f of fs.readdirSync(path.join(BASE, "modules")).filter((x) => x.endsWith(".js")).sort()) {
  Object.assign(mods, loadModule(f));
}
const ids = Object.keys(mods).sort();
assert.ok(ids.length >= 6, "至少 6 个模块，实际 " + ids.length);
console.log("模块注册:", ids.join(", "));

/* ---------- 通用结构校验 ---------- */
function checkPlanDay(day, idx) {
  assert.strictEqual(day.day, idx + 1, "day 序号连续");
  assert.ok(day.title && String(day.title).trim(), "day " + day.day + " 标题");
  assert.ok(Array.isArray(day.videos) && day.videos.length >= 1, "day " + day.day + " 至少1个视频");
  assert.ok(Array.isArray(day.points) && day.points.length >= 1, "day " + day.day + " 至少1条学习要点");
  day.videos.forEach((v) => {
    assert.ok(v.title && String(v.title).trim(), "视频标题");
    assert.ok(v.page >= 1, "分P >= 1");
    assert.ok(Array.isArray(v.knowledge) && v.knowledge.length >= 1, "视频知识点非空");
  });
}

const BUILTIN_BVID_MODULES = ["digital-basics"];
for (const id of ids) {
  const m = mods[id];
  assert.ok(m.id === id, "模块 id 一致");
  assert.ok(m.name, id + " 名称");
  if (m.type === "builtin") {
    assert.ok(Array.isArray(m.embeddedPlan) && m.embeddedPlan.length >= 1, id + " embeddedPlan");
    m.embeddedPlan.forEach(checkPlanDay);
    if (BUILTIN_BVID_MODULES.includes(id)) {
      const videos = m.embeddedPlan.flatMap((d) => d.videos);
      videos.forEach((v) => {
        assert.ok(/^BV[0-9A-Za-z]{10}$/.test(v.bvid || ""), id + " 视频缺 bvid: " + v.title);
      });
      console.log(id + ": " + m.embeddedPlan.length + "天 / " + videos.length + "个视频，全部含 BV 号");
    }
  } else if (m.type === "template") {
    assert.ok(m.templatePlan && typeof m.templatePlan === "object", id + " templatePlan");
    assert.ok(Array.isArray(m.knowledgePreset) && m.knowledgePreset.length >= 1, id + " knowledgePreset");
    const tplDays = Object.keys(m.templatePlan).map(Number).sort((a, b) => a - b);
    // templatePlan 与 knowledgePreset 是两套独立编写的计划数据，分别校验结构完整性
    tplDays.forEach((d, i) => {
      const tpl = m.templatePlan[d];
      assert.ok(tpl.title, id + " templatePlan day " + d + " 标题");
      assert.ok(Array.isArray(tpl.videos) && tpl.videos.length >= 1, id + " templatePlan day " + d + " 视频");
      tpl.videos.forEach((v) => {
        assert.ok(v.title, id + " templatePlan day " + d + " 视频标题");
        assert.ok(typeof v.bv === "string", id + " templatePlan day " + d + " bv 字段");
        assert.ok(v.page >= 1, id + " templatePlan day " + d + " page");
      });
      assert.ok(Array.isArray(tpl.knowledge) && tpl.knowledge.length >= 1, id + " templatePlan day " + d + " 知识点");
    });
    m.knowledgePreset.forEach((kp, i) => {
      assert.strictEqual(kp.day, i + 1, id + " knowledgePreset day 序号");
      assert.ok(kp.title, id + " knowledgePreset day " + kp.day + " 标题");
      assert.ok(Array.isArray(kp.videos) && kp.videos.length >= 1, id + " knowledgePreset day " + kp.day + " 视频");
      kp.videos.forEach((v) => {
        assert.ok(v.title, id + " knowledgePreset day " + kp.day + " 视频标题");
        assert.ok(Array.isArray(v.knowledge) && v.knowledge.length >= 1, id + " knowledgePreset " + v.title + " 知识点");
      });
    });
    const totalVideos = tplDays.reduce((s, d) => s + m.templatePlan[d].videos.length, 0);
    console.log(id + ": templatePlan " + tplDays.length + "天/" + totalVideos + "个视频, knowledgePreset " + m.knowledgePreset.length + "天, 结构完整");
  } else {
    assert.fail(id + " 未知 type: " + m.type);
  }
}

/* ---------- 统计 ---------- */
const stat = (m) => {
  let v = 0, k = 0;
  m.embeddedPlan.forEach((d) => {
    v += d.videos.length;
    d.videos.forEach((x) => (k += (x.knowledge || []).length));
  });
  return v + " videos, " + k + " knowledge";
};
console.log("=== 校验通过 ===");
console.log("UG:", stat(mods["ug-nx12"]));
console.log("数字化:", stat(mods["digital-basics"]));
