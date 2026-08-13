# 项目进展文档

> 最后更新：2026-08-13
> 项目名称：学习打卡中心 · 多软件自学打卡系统

---

## 📁 项目结构

```
docs-project-progress-Y9iLEE/
├── index.html          # 主入口（首页、UG打卡、知识点汇总）
├── template.html       # 通用打卡模板（DJI/SolidWorks/Excel/游泳/自定义）
├── modules/            # 软件学习内容模块（每个软件一个文件）
│   ├── ug-nx12.js      # UG NX 12.0（内嵌打卡）
│   ├── digital-basics.js  # 数字化入门（内嵌打卡）
│   ├── dji-action4.js  # DJI Action 4（模板打卡）
│   ├── solidworks.js   # SolidWorks（模板打卡）
│   ├── excel.js        # Excel（模板打卡）
│   └── swimming.js     # 游泳（模板打卡）
├── manifest.json       # PWA 应用配置
├── sw.js               # Service Worker（离线缓存）
├── README.md           # 用户使用说明
└── PROGRESS.md         # 本文件 - 项目进展记录
```

---

## ✅ 已实现功能

### 1. 多模块学习打卡

| 模块 | 天数 | 状态 | 说明 |
|------|------|------|------|
| UG NX 12.0 | 10天 | ✅ 完成 | 内嵌在 index.html，含25节课知识点 |
| DJI Action 4 | 5天 | ✅ 完成 | 通过 template.html 加载 |
| SolidWorks | 10天 | ✅ 完成 | 通过 template.html 加载 |
| Excel | 10天 | ✅ 完成 | 通过 template.html 加载 |
| 游泳 | 10天 | ✅ 完成 | 通过 template.html 加载 |
| 自定义软件 | 任意 | ✅ 完成 | 用户可创建任意模块 |

### 2. 核心功能

- ✅ **打卡日历视图** - 展示每天学习进度
- ✅ **学习/编辑双模式** - 切换查看/修改内容
- ✅ **30字打卡限制** - 必须输入足够笔记
- ✅ **Word 导出** - 单日/全集笔记导出
- ✅ **手机端适配** - 自动识别，唤起B站App
- ✅ **PWA 支持** - 可添加到主屏幕
- ✅ **按天解锁** - 完成前一天才能开启下一天

### 3. 视频播放控制（最新修复）

- ✅ **单 iframe 方案** - 每天只渲染一个播放器
- ✅ **视频切换** - 点击切换，旧视频自动停止
- ✅ **关闭停止** - 关闭弹窗时视频完全停止
- ✅ **自动播放控制** - 默认不自动播放

### 4. 学习计划天数调整（最新修复）

- ✅ **均匀分配策略** - 无论多少天，内容总量保持不变，只是每天分配的数量不同
- ✅ **智能分配算法** - 前几天多分配，后几天少分配
- ✅ **可视化弹窗** - 替代原有的 prompt 对话框

**示例**（36节课）：
- 18天 → 每天 2 节
- 36天 → 每天 1 节
- 25天 → 11天 2 节 + 14天 1 节（36÷25=1余11）

### 5. 数据持久化

- ✅ **本地存储** - localStorage 保存打卡数据
- ✅ **数据备份** - 自定义软件删除后可恢复
- ✅ **版本管理** - 预填充数据版本号校验

---

## 🔧 最近修改历史

### 2026-08-13 数字化模块接入 B站视频（内嵌播放）

**需求**：数字化入门模块的 20 个视频此前没有预设链接，每次都要手动去 B站 搜索，希望直接内嵌播放。

**改动**
- [modules/digital-basics.js](./modules/digital-basics.js)：20 个视频全部配置了对应的 B站 BV 号（`bvid` 字段），点击课程弹窗后直接在页面内播放，标题下方显示「BV 号 · 第 1 P」并提供「在 B站 原页观看」跳转，无需再手动搜索
- 视频按 10 天主题逐一匹配：ChatGPT 入门/注册、Prompt、Canvas、代码解释器、Python、Codex、Cursor、Copilot、Agent、LangChain、RAG、部署等均有对应教程
- `planVersion` 升级为 `20260813-v2`：用户端打开后会自动刷新学习计划内容（已打卡记录与笔记不受影响）
- `sw.js` 缓存版本升到 v11，确保离线/缓存的浏览器能拿到新模块文件
- [tools/test_app.js](./tools/test_app.js)：新增断言「数字化弹窗内嵌 B站播放器」「20 个视频全部配置合法 BV 号」（33/33 通过）
- [tools/verify_modules.js](./tools/verify_modules.js)：重写为独立的模块数据一致性校验（原脚本依赖重构前已删除的内联数据，已失效）

> 说明：受当前网络限制无法逐一在线核验每个 BV 号，BV 均来自 B站 官方页面搜索结果；如个别视频失效，只需在模块文件中把对应 `bvid` 换成新 BV 号即可（修改后记得把 `planVersion` 递增）。

### 2026-08-13 模块化重构 + 修复数字化模块

**问题**
1. 新增的「数字化入门」模块点击后仍进入 UG 学习界面
2. 知识点汇总页不显示任何内容

**根因**
- 首页渲染把所有 `builtin` 类型模块都写死为 `switchView('ug')`
- `index.html` 末尾的数字化 10 天数据被截断（字符串未闭合），导致整个知识点脚本块语法错误、知识点页面代码全部未加载
- 旧的 `BUILTIN_CONFIGS` 引用了不存在的 `digitalPlan`，且没有 `view-digital` 视图

**改造**
- 新增 `modules/` 目录：每个软件一份文件（学习内容 + 配置），主程序统一加载
- 新增通用内嵌打卡引擎 `BI.*`：UG 和数字化共用一套日历/打卡/导出逻辑，按模块配置驱动
- 新增 `view-digital` 视图，首页按模块路由，不再写死进 UG
- 知识点汇总页数据改为由模块自动生成（内置模块由 `embeddedPlan` 生成，模板模块用 `knowledgePreset`）
- `template.html` 的预填充数据同样改为从 `modules/` 加载（单一数据源）
- 补全了数字化 Day10 被截断的知识点；升级缓存版本到 v10

### 2026-08-06 修复视频播放问题

**问题**：多个视频同时播放，关闭后视频仍在播放

**修改文件**：
- `template.html`
- `index.html`

**修改内容**：

1. **新增 `stopAllVideos()` 函数**
   - template.html 第 1121-1128 行
   - index.html 第 2140-2145 行
   - 将 iframe 的 src 设为 `about:blank` 停止播放

2. **新增 `switchVideo()` / `ugSwitchVideo()` 函数**
   - template.html 第 1139-1170 行
   - index.html 第 2148-2189 行
   - 通过修改唯一 iframe 的 src 实现视频切换

3. **修改渲染函数**
   - `renderLearnMode()` - 只渲染第一个视频的 iframe
   - `ugOpenDayModal()` - 只渲染一个 iframe（id: `ug-main-video-iframe`）

4. **修改关闭函数**
   - `closeModal()` / `ugCloseDayModal()` - 关闭时停止视频

**核心改进**：采用单 iframe 方案，确保同时只有一个播放器

---

### 2026-08-06 修复学习计划天数调整问题（v2 - 逻辑修正）

**问题**：将 18 天改为 36 天后，系统采用循环填充策略，导致学习两轮内容

**修改文件**：`template.html` 第 982-1078 行

**修改内容**：重写 `redistributePlan()` 函数，采用**均匀分配策略**

**核心逻辑**：
1. 将所有视频和知识点扁平化成列表
2. 使用 `distributeEvenly()` 函数平均分配到每一天
3. 分配算法：前 `remainder` 天多分配一个

```javascript
function distributeEvenly(items, days){
  const total = items.length;
  const base = Math.floor(total / days);
  const remainder = total % days;
  
  for(let d=1; d<=days; d++){
    const count = base + (d <= remainder ? 1 : 0);
    groups.push(items.slice(idx, idx + count));
    idx += count;
  }
}
```

**示例**（36节课）：
- 18天：base=2, remainder=0 → 每天 2 节
- 36天：base=1, remainder=0 → 每天 1 节
- 25天：base=1, remainder=11 → 11天 2 节 + 14天 1 节

---

### 2026-08-06 修复模块恢复功能

**问题**：自定义软件删除后无法恢复

**修改内容**：
- 自定义软件删除时备份元信息和打卡记录
- 恢复面板支持单个/全部恢复
- 彻底删除功能（不可逆）
- 重置所有默认内置模块功能

---

## 📝 技术实现说明

### 视频播放控制

```javascript
// 单 iframe 方案
const iframe = document.getElementById("main-video-iframe");

// 切换视频
function switchVideo(targetIdx) {
  iframe.src = getVideoEmbedUrl(v, true); // autoplay=1
}

// 停止视频
function stopAllVideos() {
  iframe.src = "about:blank";
}
```

### 学习计划重分配

```javascript
// 均匀分配策略
function redistributePlan(newDays) {
  // 1. 收集所有视频和知识点，扁平化成列表
  // 2. 使用 distributeEvenly() 平均分配
  const videoGroups = distributeEvenly(allVideos, newDays);
  const kpGroups = distributeEvenly(allKnowledge, newDays);
  // 3. 生成新的学习计划
}

// 平均分配函数
function distributeEvenly(items, days) {
  const base = Math.floor(total / days);
  const remainder = total % days;
  // 前 remainder 天多分配一个
}
```

### 数据存储结构

```javascript
// localStorage keys
// checkin_{software_id}           - 打卡数据
// checkin_{software_id}_content   - 编辑内容
// checkin_{software_id}_plan_ver  - 预填充版本号
// checkin_days_total               - 所有软件总天数
// checkin_hidden_custom           - 隐藏的自定义软件
// checkin_permanently_deleted     - 彻底删除的模块
```

---

## 🎯 待办事项 / 改进方向

### 高优先级
- [ ] 优化视频加载速度（考虑懒加载）
- [ ] 添加视频进度保存功能
- [ ] 支持视频笔记同步（笔记定位到视频时间点）

### 中优先级
- [ ] 增加更多预置学习计划（如瑜伽、编程等）
- [ ] 实现学习数据统计图表
- [ ] 支持导入导出学习计划模板

### 低优先级
- [ ] 添加深色主题支持
- [ ] 实现 PWA 离线视频缓存
- [ ] 支持多人协作打卡

---

## ⚠️ 注意事项

1. **浏览器兼容性**：推荐使用 Chrome/Edge 最新版本
2. **数据备份**：重要数据请定期导出为 JSON 文件
3. **Service Worker**：首次加载后会缓存，更新需清理缓存
4. **跨设备**：数据存储在浏览器本地，不同设备不互通

---

## 📚 相关文档

- [README.md](./README.md) - 用户使用说明
- [template.html](./template.html) - 打卡模板源码
- [index.html](./index.html) - 主入口源码

---

*文档由 AI 助手在开发过程中自动维护*
