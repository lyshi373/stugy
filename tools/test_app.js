/* 功能测试：用最小 DOM/localStorage 桩运行重构后的 index.html / template.html */
const fs = require("fs");
const path = require("path");

const BASE = path.dirname(__dirname);
const read = (p) => fs.readFileSync(path.join(BASE, p), "utf-8");

/* ---------- 元素桩 ---------- */
class El {
  constructor(id, tag) {
    this.id = id;
    this.tagName = (tag || "div").toUpperCase();
    this.children = [];
    this.style = {};
    this.dataset = {};
    this.attributes = {};
    this.classList = {
      _set: new Set(),
      add: (...c) => c.forEach((x) => this.classList._set.add(x)),
      remove: (...c) => c.forEach((x) => this.classList._set.delete(x)),
      toggle: (c, force) => {
        const has = this.classList._set.has(c);
        const want = force === undefined ? !has : force;
        if (want) this.classList._set.add(c);
        else this.classList._set.delete(c);
        return want;
      },
      contains: (c) => this.classList._set.has(c),
    };
    this._handlers = {};
    this._text = "";
    this._html = "";
    this.value = "";
    this.src = "";
    this.href = "";
    this.disabled = false;
    this.min = "";
    this.className = "";
  }
  set textContent(v) {
    this._text = String(v == null ? "" : v);
  }
  get textContent() {
    return this._text;
  }
  set innerHTML(v) {
    this._html = String(v == null ? "" : v);
    this.children = []; // 真实 DOM 中设置 innerHTML 会重建子树
  }
  get innerHTML() {
    return this._html;
  }
  addEventListener(type, fn) {
    (this._handlers[type] = this._handlers[type] || []).push(fn);
  }
  fire(type, ev) {
    (this._handlers[type] || []).forEach((fn) => fn(ev || { target: this }));
  }
  appendChild(el) {
    this.children.push(el);
    return el;
  }
  removeChild(el) {
    this.children = this.children.filter((c) => c !== el);
  }
  focus() {}
  click() {
    this.fire("click");
  }
  setAttribute(k, v) {
    this.attributes[k] = String(v);
  }
}

/* ---------- 全局浏览器桩 ---------- */
const store = new Map();
const elements = new Map();
const views = [];

function el(id) {
  if (!elements.has(id)) {
    const e = new El(id);
    elements.set(id, e);
    if (String(id).startsWith("view-")) views.push(e);
  }
  return elements.get(id);
}

const localStorageStub = {
  _m: store,
  getItem(k) {
    return store.has(k) ? store.get(k) : null;
  },
  setItem(k, v) {
    store.set(k, String(v));
  },
  removeItem(k) {
    store.delete(k);
  },
};

const documentStub = {
  readyState: "complete",
  title: "",
  body: new El("body", "body"),
  documentElement: new El("html", "html"),
  getElementById: (id) => el(id),
  querySelectorAll: (sel) => {
    if (sel === ".view") return views;
    if (sel === ".nav-item") return [];
    return [];
  },
  querySelector: (sel) => {
    if (/^\.nav-item\[data-view=/.test(sel)) {
      const m = sel.match(/data-view="?([^"\]]+)"?\]/);
      const v = m ? m[1] : "";
      if (v === "home") return el("nav-home");
      if (v === "knowledge") return el("nav-knowledge");
      if (v === "ug") return el("nav-ug");
      if (v === "digital") return el("nav-digital");
    }
    if (sel === "header") return el("page-header", "header");
    return null;
  },
  createElement: (tag) => {
    const e = new El("auto-" + Math.random().toString(36).slice(2), tag);
    return e;
  },
  addEventListener() {},
  querySelectorAll2() {},
};
documentStub.documentElement.style.setProperty = () => {};

const windowStub = {
  location: {
    href: "file:///C:/app/index.html",
    pathname: "/C:/app/index.html",
    search: "",
    protocol: "file:",
    host: "",
  },
  scrollTo: () => {},
  alert: () => {},
  confirm: () => true,
  navigator: { userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36" },
  localStorage: localStorageStub,
  sessionStorage: localStorageStub,
  caches: undefined,
  Blob: function Blob() {},
  URL: { createObjectURL: () => "blob:test", revokeObjectURL: () => {} },
};

global.window = globalThis; // 浏览器中 window 就是全局对象
globalThis.window = globalThis;
global.document = documentStub;
global.navigator = windowStub.navigator;
global.localStorage = localStorageStub;
global.sessionStorage = localStorageStub;
global.location = windowStub.location;
global.URLSearchParams = URLSearchParams;
global.confirm = windowStub.confirm;
global.alert = windowStub.alert;
global.Blob = windowStub.Blob;
global.URL = windowStub.URL;
global.scrollTo = () => {};

/* ---------- 拼接并执行：模块文件 + index.html 内联脚本 ---------- */
const indexHtml = read("index.html");
const moduleFiles = fs.readdirSync(path.join(BASE, "modules")).filter((f) => f.endsWith(".js")).sort();
let appSrc = "";
for (const f of moduleFiles) appSrc += "\n;\n" + read("modules/" + f) + "\n";

const inlineScripts = indexHtml.match(/<script>\r?\n([\s\S]*?)<\/script>/g) || [];
inlineScripts.forEach((b) => {
  const body = b.replace(/^<script>\r?\n/, "").replace(/\r?\n<\/script>$/, "");
appSrc += "\n;\n" + body + "\n";
});

appSrc += `
;
globalThis.__T = {
  BUILTIN_CONFIGS, BUILTIN_VIEWS, BUILTIN_VIEWS_BY_ID,
  defaultSoftware, extendedSoftware, viewConfig, BI,
  KPB_PRESETS, kpPlan,
  renderList, switchView,
  kpRenderSoftwareList, kpShowKnowledge, kpGetPlanData, kpGoCheckin,
  kpCurrentSoftware: () => kpCurrentSoftware
};
globalThis.__setKp = function(sw){ kpCurrentSoftware = sw; };
`;

let appError = null;
try {
  (0, eval)(appSrc);
} catch (e) {
  appError = e;
}
if (appError) {
  console.error("启动失败:", appError);
  process.exit(1);
}

const results = [];
function check(name, cond, extra) {
  results.push({ name, ok: !!cond, extra });
  console.log((cond ? "PASS " : "FAIL ") + name + (extra ? " | " + extra : ""));
}

/* ---------- 断言 ---------- */
const app = (expr) => (0, eval)(expr);
const T = () => global.__T;

check("模块注册表包含6个模块", Object.keys(global.LearningModules).length === 6,
  Object.keys(global.LearningModules).join(","));
check("BUILTIN_CONFIGS 含 ug-nx12 与 digital-basics",
  !!T().BUILTIN_CONFIGS["ug-nx12"] && !!T().BUILTIN_CONFIGS["digital-basics"]);
check("BUILTIN_VIEWS 含 ug/digital", !!T().BUILTIN_VIEWS["ug"] && !!T().BUILTIN_VIEWS["digital"]);
check("defaultSoftware 顺序", JSON.stringify(T().defaultSoftware.map((s) => s.id)) === JSON.stringify(["ug-nx12", "dji-action4", "swimming"]));
check("extendedSoftware 含数字化", T().extendedSoftware[0].name === "数字化入门");

/* 首页卡片路由 */
app("__T.renderList()");
const homeHtml = app("document.getElementById('softwareGrid').innerHTML");
check("首页数字化卡片路由到 switchView('digital')", homeHtml.includes("switchView('digital')"), "digital");
check("首页UG卡片路由到 switchView('ug')", homeHtml.includes("switchView('ug')"));

/* 如何新增项目 说明页 */
check("viewConfig 含 guide", !!T().viewConfig["guide"]);
app("__T.switchView('guide')");
check("view-guide 激活", app("document.getElementById('view-guide').classList.contains('active')"));
const guideHtml = read("index.html");
check("guide 页含新增步骤说明", guideHtml.includes("如何新增学习项目") && guideHtml.includes("B站合集快速分配") && guideHtml.includes("添加新软件"));
app("__T.switchView('home')");

/* 数字化打卡视图 */
app("__T.switchView('digital')");
check("view-digital 激活", app("document.getElementById('view-digital').classList.contains('active')"));
check("数字化日历10天", app("document.getElementById('dgCalendarGrid').children.length") === 10);
check("数字化标题", app("document.getElementById('dgHeaderTitle').innerHTML").includes("数字化入门"));

/* 数字化某天：知识点 */
app("__T.BI.openDayModal(__T.BUILTIN_CONFIGS['digital-basics'], 1)");
const dgBody = app("document.getElementById('dgModalBody').innerHTML");
check("数字化Day1弹窗含学习目标", dgBody.includes("学习目标"));
check("数字化Day1知识点显示", dgBody.includes("大语言模型（LLM）本质"));
check("数字化Day1内嵌B站播放器", dgBody.includes("player.bilibili.com/player.html?bvid=BV1U84y167i3"), "bvid=BV1U84y167i3");
check("数字化弹窗含笔记输入", !!app("document.getElementById('dgNoteInput')"));

/* 数字化全部视频都有 BV 号 */
const dgPlan = app("__T.BUILTIN_CONFIGS['digital-basics'].planSource");
const dgVideos = dgPlan.flatMap((p) => p.videos || []);
const dgBvids = dgVideos.map((v) => v.bvid || "");
check("数字化20个视频全部配置B站BV号", dgVideos.length === 20 && dgBvids.every((b) => /^BV[0-9A-Za-z]{10}$/.test(b)),
  dgVideos.length + "个视频, 缺失=" + dgBvids.filter((b) => !b).length);

/* 数字化打卡提交 */
app("document.getElementById('dgNoteInput').value = '今天学习了AI大模型的基本原理，包括Transformer架构、预训练与微调流程，还了解了Token的概念和上下文窗口，收获很大。'");
app("document.getElementById('dgNoteInput').fire('input')");
app("document.getElementById('dgCheckinBtn').click()");
const dgData = JSON.parse(app("localStorage.getItem('checkin_digital-basics')"));
check("数字化打卡写入", dgData && dgData[1] && dgData[1].checked === true);

/* UG 打卡视图（回归） */
app("__T.switchView('ug')");
check("UG日历10天", app("document.getElementById('ugCalendarGrid').children.length") === 10);
app("__T.BI.openDayModal(__T.BUILTIN_CONFIGS['ug-nx12'], 1)");
const ugBody = app("document.getElementById('ugModalBody').innerHTML");
check("UG Day1 知识点显示", ugBody.includes("UG NX 12.0 启动方式"));
check("UG 生成 bilibili iframe", ugBody.includes("player.bilibili.com/player.html?bvid=BV1SYJc6MEWJ"));

/* 知识点汇总页 */
app("__T.switchView('knowledge')");
app("__T.kpRenderSoftwareList()");
const kpList = app("document.getElementById('kpSoftwareGrid').innerHTML");
check("知识点列表含数字化", kpList.includes("数字化入门"));
app("__T.kpShowKnowledge('digital-basics')");
const kpDetail = app("document.getElementById('kpContent').innerHTML");
check("数字化知识点详情非空", kpDetail.length > 500 && kpDetail.includes("大语言模型"));
const kpStats = app("document.getElementById('kpDetailStats').innerHTML");
check("数字化知识点统计", kpStats.includes("10") && kpStats.includes("20") && kpStats.includes("条知识点"), kpStats);

/* 其它软件知识点仍可用 */
app("__T.kpShowKnowledge('swimming')");
const swimDetail = app("document.getElementById('kpContent').innerHTML");
check("游泳知识点详情正常", swimDetail.includes("下水前热身"));
app("__T.kpShowKnowledge('ug-nx12')");
const ugKp = app("document.getElementById('kpContent').innerHTML");
check("UG知识点详情正常", ugKp.includes("UG NX 12.0 启动方式"));

/* 重分配逻辑（UG 改 20 天） */
const rd = app("__T.BI.redistribute(__T.BUILTIN_CONFIGS['ug-nx12'], 20)");
check("UG 重分配20天", rd && Object.keys(rd).length === 20);

/* kpGoCheckin 数字化 → digital 视图 */
global.__setKp({ id: "digital-basics", link: "#" });
app("__T.kpGoCheckin()");
check("知识点页进入打卡跳转 digital", app("document.getElementById('view-digital').classList.contains('active')"));

/* Word 导出冒烟测试 */
let exErr = null;
try {
  app("__T.BI.exportDay(__T.BUILTIN_CONFIGS['ug-nx12'], 1, '这是一段足够长的测试笔记，用来验证导出功能是否正常工作。')");
} catch (e) { exErr = e; }
check("UG 单日导出不报错", !exErr, exErr && exErr.message);
exErr = null;
try {
  app("__T.BI.exportDay(__T.BUILTIN_CONFIGS['digital-basics'], 1, '这是一段足够长的测试笔记，用来验证导出功能是否正常工作。')");
} catch (e) { exErr = e; }
check("数字化单日导出不报错", !exErr, exErr && exErr.message);
exErr = null;
try {
  app("__T.BI.exportAll(__T.BUILTIN_CONFIGS['digital-basics'])");
} catch (e) { exErr = e; }
check("数字化全集导出不报错", !exErr, exErr && exErr.message);

/* ---------- template.html ---------- */
const tplHtml = read("template.html");
const tplScript = (tplHtml.match(/<script>\r?\n([\s\S]*?)<\/script>/) || [])[1];
const tplStore = new Map();
global.localStorage = { _m: tplStore, getItem: (k) => tplStore.get(k) || null, setItem: (k, v) => tplStore.set(k, String(v)), removeItem: (k) => tplStore.delete(k) };
global.location = { search: "?software=dji-action4", href: "file:///C:/app/template.html?software=dji-action4", pathname: "/C:/app/template.html" };
try {
  (0, eval)("\n;\n" + tplScript + "\n;globalThis.__TPL = { PRESET_PLANS, PRESET_VERSION, loadDayContent };");
  check("template.html 脚本执行成功", true);
  check("template PRESET_PLANS 来自模块", global.__TPL.PRESET_PLANS["dji-action4"] && global.__TPL.PRESET_PLANS["swimming"]);
  const d1 = global.__TPL.loadDayContent(1);
  check("template DJI Day1 内容", d1 && d1.title === "开箱与基础设置", d1 && d1.title);
  const kp1 = global.__TPL.PRESET_PLANS["dji-action4"][1].knowledge.length;
  check("template DJI Day1 知识点", kp1 > 0, String(kp1));
} catch (e) {
  check("template.html 脚本执行成功", false, e.message);
}

const failed = results.filter((r) => !r.ok).length;
console.log("\n=== 结果:", results.length - failed, "/", results.length, "通过 ===");
process.exit(failed ? 1 : 0);
