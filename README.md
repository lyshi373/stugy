# 学习打卡中心 · 多软件自学打卡系统

基于 B站教程的多软件自学打卡系统，内置 UG NX 12.0、数字化入门、DJI Action 4、SolidWorks、Excel、游泳等学习模块，也支持自定义创建任意课程的打卡计划。

**在线访问**：https://lyshi373.github.io/stugy/ （代码推送到 GitHub 后约 1-2 分钟自动部署；看到旧内容按 `Ctrl+F5` 强刷一次）

## 文件说明

| 文件 | 说明 |
|------|------|
| `index.html` | **主入口** - 首页、软件打卡（通用引擎）、知识点汇总、「如何新增」说明页、访问控制 |
| `template.html` | 通用打卡模板（SolidWorks / Excel / 游泳 / 自定义软件使用） |
| `modules/` | **每个软件一个文件**，存放学习内容与配置（详见「模块化结构」） |
| `tools/` | 开发测试工具：`test_app.js`（52 项功能回归）、`verify_modules.js`（模块数据一致性校验） |
| `manifest.json` | PWA 应用配置文件 |
| `sw.js` | Service Worker（离线缓存） |
| `make_zip.py` | 打包工具（生成 ZIP 方便传到手机） |
| `打包.bat` | 双击运行打包工具 |

## 快速开始

### 电脑使用

双击 `index.html` 用浏览器打开即可，或直接使用在线地址。

### 在线访问（GitHub Pages）

无需下载，直接打开 **https://lyshi373.github.io/stugy/** 。

### 手机使用

1. 用手机浏览器打开在线地址
2. 点底部「📖 如何新增」→「📱 添加到手机屏幕」，按安卓/苹果步骤添加到主屏幕，像 App 一样使用
3. 也可以离线使用：电脑运行 `python make_zip.py` 生成 ZIP → 传到手机解压 → 打开 `index.html`

> 💡 **手机端视频播放**：手机端自动显示「📱 在B站App中打开」按钮，点击直接唤起已安装的 bilibili App 播放，无需服务器。

## 预置学习计划

| 模块 | 天数 | 视频 | 知识点 | 默认状态 |
|------|------|------|--------|----------|
| UG NX 12.0 | 10天 | 25节（合集 BV1SYJc6MEWJ） | 205条 | 默认隐藏 |
| 数字化入门 | 10天 | 20个（已配 B站 BV 号） | 159条 | 显示 |
| DJI Action 4 | 5天 | 9个 | 按天知识点 | 默认隐藏 |
| SolidWorks | 10天 | 11个 | 按天知识点 | 显示 |
| Excel | 10天 | 11个 | 按天知识点 | 显示（需密码） |
| 游泳 | 10天 | 11个 | 按天知识点 | 显示 |
| 自定义软件 | 1-365天 | 自填 | 自填 | 显示 |

- **UG / DJI 默认隐藏**：不出现在首页与知识点列表；恢复显示需在左下角「👁 已隐藏」面板输入管理密码
- **Excel 需密码**：点击卡片或知识点入口时需输入密码（默认 161114）
- **数字化入门**：20 个视频全部预置 B站 BV 号，课程弹窗内直接内嵌播放，主题覆盖 ChatGPT、Prompt、Canvas、代码解释器、Python、Codex、Cursor、Copilot、Agent、LangChain、RAG、部署

## 界面导航

底部导航三个入口：

- **首页**：打卡中心，软件卡片列表（含添加/隐藏/删除）
- **知识点**：全部软件的知识点汇总
- **如何新增**：新增项目图文教程、添加到手机屏幕教程、常见问题

## 访问控制（密码与隐藏）

相关配置都在 `index.html` 顶部的「显示与访问控制」区域：

| 配置 | 说明 | 当前值 |
|------|------|--------|
| `HIDDEN_SOFTWARE_IDS` | 默认隐藏的软件 id 列表 | `["ug-nx12", "dji-action4"]` |
| `PASSWORD_SOFTWARE` | 需要密码才能进入的软件 | Excel 密码 `161114` |
| `ADMIN_PASSWORD` | 显示默认隐藏模块需要输入的管理密码 | `161114` |

**隐藏 / 恢复**

- 任意软件卡片点「隐藏」可收起，左下角出现「👁 已隐藏」按钮
- 「已隐藏」面板分两区：自己隐藏的软件可直接「显示」；「🛠 默认隐藏模块」点「显示」需输入管理密码
- 删除则走右下角橙色「恢复」回收站（单个/全部恢复、彻底删除）

**修改密码 / 默认隐藏范围**：编辑 `index.html` 顶部配置 → 递增缓存版本 → 推送到 GitHub 部署即可。

> ⚠️ 说明：这是**界面层面的门禁**，密码写在前端代码中，不能抵御查看源码的人；如需真正的安全保密，请接入后端鉴权。

## 添加新软件

> 底部「📖 如何新增」页有图文步骤 + 常见问题，第一次使用建议先看它。

1. 首页点「＋ 添加新软件」→ 填名称、描述、天数、颜色 → 创建
2. 点新卡片进入打卡页，切「编辑模式」
3. 逐天填 B站 BV 号、分P、标题、知识点；或使用「⚡ B站合集快速分配」一键按天排视频
4. 切回「学习模式」开始打卡：看视频 → 30字笔记 → 完成打卡

## 核心功能

- **打卡日历**：按天解锁，完成前一天才能开启下一天
- **学习 / 编辑双模式**；30 字笔记打卡限制
- **Word 导出**：单日 / 全集学习笔记
- **本地存储（localStorage）**：数据存在本机浏览器，关闭后保留；**不跨设备、不跨浏览器、换地址（file 与 https）不互通**
- **教程管理**：导出/导入 JSON、套用模板、B站合集快速分配
- **PWA**：可添加到主屏幕
- **单 iframe 视频播放**：同时只有一个播放器，默认不自动播放、切换时自动播放、关闭即停止

## 模块化结构（开发者）

所有软件学习内容独立存放在 `modules/`，主程序统一加载，不写死课程数据：

| 文件 | 软件 | 类型 |
|------|------|------|
| `modules/ug-nx12.js` | UG NX 12.0 | 内嵌打卡（builtin） |
| `modules/digital-basics.js` | 数字化入门 | 内嵌打卡（builtin） |
| `modules/dji-action4.js` | DJI Action 4 | 通用模板（template） |
| `modules/solidworks.js` | SolidWorks | 通用模板（template） |
| `modules/excel.js` | Excel | 通用模板（template） |
| `modules/swimming.js` | 游泳 | 通用模板（template） |

### 修改某个软件的学习内容

只改 `modules/` 下对应文件即可，无需动主程序：

1. `embeddedPlan`：内置模块的每日计划（学习目标、学习要点、视频、知识点）
2. `templatePlan`：模板模块（template.html）的每日计划
3. `knowledgePreset`：知识点汇总页数据（内置模块可省略，自动由 embeddedPlan 生成）
4. 视频对象：`bvid` 填 B站 BV 号、`page` 填分P（如 `{title:"...", bvid:"BV1SYJc6MEWJ", page:1, knowledge:[...]}`）
5. 修改后递增 `planVersion`，浏览器自动更新学习计划，**已打卡记录和笔记不会丢**

### 新增一个内嵌打卡软件（builtin）

1. 在 `modules/` 新建 `xxx.js`，参照 `modules/digital-basics.js`：
   - `type: "builtin"`、`engine` 里指定 `viewId`（如 `view-xxx`）与 `domPrefix`（如 `xxx`）、`embeddedPlan` 填每日计划
2. 在 `index.html` 里复制一份打卡视图 HTML（参照 `view-digital`），把 id 前缀换成 `domPrefix`
3. 把软件 id 加进 `index.html` 顶部的 `DEFAULT_SOFTWARE_IDS` / `EXTENDED_SOFTWARE_IDS`
4. 主程序自动注册视图、渲染日历、加载知识点

### 新增一个模板型软件（template）

1. 在 `modules/` 新建 `xxx.js`，参照 `modules/excel.js`：`type: "template"`，提供 `templatePlan` 与 `knowledgePreset`
2. 在 `index.html` 顶部的 `DEFAULT_SOFTWARE_IDS` / `EXTENDED_SOFTWARE_IDS` 加上该软件 id

> 首页展示顺序修改 `index.html` 顶部的 `DEFAULT_SOFTWARE_IDS` 即可；默认隐藏加进 `HIDDEN_SOFTWARE_IDS`。

### 测试

```bash
node tools/test_app.js       # 52 项功能回归测试
node tools/verify_modules.js # 模块数据一致性校验
```

### 发布更新

1. 修改内容后递增 `modules/xxx.js` 的 `planVersion`
2. 同步递增 `index.html` / `template.html` 的 `CACHE_VERSION` 与 `sw.js` 的 `CACHE_NAME`（三者保持一致），强制用户端自动刷新
3. 提交推送到 GitHub：

```bash
git add -A
git commit -m "更新说明"
git push origin main
```

4. GitHub Pages 约 1-2 分钟自动部署

## 学习计划天数调整说明

当用户修改学习天数时，采用**均匀分配策略**：内容总量不变，只是每天分配的数量不同。

1. 数据源：`_content`（用户编辑过）→ `PRESET_PLANS`（内置预填充）
2. 将所有视频和知识点扁平化成列表
3. 用 `distributeEvenly()` 平均分配：`base = Math.floor(total / days)`，`remainder = total % days`，前 `remainder` 天多分配一个

示例（36 节课）：18 天 → 每天 2 节；36 天 → 每天 1 节；25 天 → 11 天 2 节 + 14 天 1 节。

## 视频播放控制说明

### 单 iframe 方案

- **电脑端**：每天只渲染一个 `<iframe>` 播放器
- **手机端**：自动切换为「在B站App中打开」按钮
- **切换视频**：修改唯一 iframe 的 `src`，不会创建新播放器；切换时 `autoplay=1`
- **停止视频**：关闭弹窗时将 iframe 的 `src` 设为 `about:blank`

## 常见问题

**Q：明天打开还能看到今天的打卡记录吗？**
A：能。数据存在浏览器 localStorage，同一设备、同一浏览器、同一地址打开都在。不要用无痕窗口、不要清除网站数据；换设备 / 换浏览器 / 换地址（本地 file 与在线 https）数据不互通。

**Q：页面还是旧版怎么办？**
A：更新会递增缓存版本并自动清理一次；仍旧就 `Ctrl+F5` 强刷，或 `F12 → Application → Clear site data`，或在地址后加 `?v=版本号` 绕过缓存。

**Q：Excel 密码 / 显示默认隐藏模块的管理密码是多少？**
A：默认都是 **161114**，可在 `index.html` 顶部的 `PASSWORD_SOFTWARE` 与 `ADMIN_PASSWORD` 修改。

**Q：UG / DJI 怎么恢复显示？**
A：左下角「👁 已隐藏」→「🛠 默认隐藏模块」→ 点「显示」→ 输入管理密码。

**Q：想换掉内置模块的视频（BV号）？**
A：改 `modules/` 对应文件里该视频的 `bvid`，递增 `planVersion`，刷新即可生效；自定义项目直接在「编辑模式」改。

**Q：误删了模块怎么办？**
A：右下角橙色「恢复」按钮打开回收站，可单个/全部恢复；彻底删除后不可恢复（只能清除浏览器站点数据，但会丢失所有打卡记录）。

**Q：B站视频无法内嵌播放？**
A：电脑端直接内嵌播放；手机端自动显示「在B站App中打开」按钮，唤起 App 播放。

**Q：多个视频同时播放怎么办？**
A：单 iframe 方案，同时只有一个播放器，切换或关闭时旧视频自动停止。

**Q：修改学习天数后内容没正确分配？**
A：系统采用均匀分配策略，内容总量不变，只是每天数量不同。

---

*本文档由项目开发过程自动维护，与代码保持同步。*
