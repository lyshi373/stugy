# -*- coding: utf-8 -*-
"""
UG NX 12.0 25节课知识点汇总 - Word文档生成器
运行后生成「UG_NX12_25节课知识点汇总.doc」
"""
import os
import datetime

# 输出文件名
OUT_FILE = "UG_NX12_25节课知识点汇总.doc"

# 基础教程信息
BASE_BVID = "BV1SYJc6MEWJ"
BASE_URL = f"https://www.bilibili.com/video/{BASE_BVID}/"
BASE_TITLE = "UG12.0从入门到精通教程，25节课全面了解UG"
BASE_AUTHOR = "软考教程官方"

# 10天学习计划数据（25节课 + 详细知识点）
plan = [
    {
        "day": 1,
        "title": "软件入门基础",
        "range": "1.1 - 1.3",
        "goal": "完成 UG NX 12.0 软件启动、文件新建与保存、认识工作界面各区域功能，掌握鼠标三键的基本操作。",
        "videos": [
            {
                "title": "1.1 UG文件新建及保存",
                "page": 1,
                "knowledge": [
                    "UG NX 12.0 启动方式：开始菜单 / 桌面快捷方式；第一次启动可选择角色（高级、加工、装配等）",
                    "新建文件（Ctrl+N）：模板分「模型」「图纸」「装配」「仿真」等大类，建模常用「模型」→「建模」",
                    "单位设置：毫米(mm) / 英寸(inch)，机械行业一律选毫米；模板默认单位由 NX 安装决定",
                    "文件名规则：不允许中文、空格、特殊字符，建议用字母+数字+下划线，如 part_001.prt",
                    "保存文件（Ctrl+S）：首次保存需选择保存路径，建议路径纯英文避免中文字符乱码",
                    "另存为 / 保存工作部件 / 全部保存（Ctrl+Shift+S）的区别",
                    "文件关闭：仅关闭窗口 vs 关闭并保存；UG 会周期性自动备份（.log 文件），崩溃后可恢复",
                    "历史记录：「文件」→「最近打开的部件」快速打开最近用过的文件",
                ],
            },
            {
                "title": "1.2 UG界面编辑",
                "page": 2,
                "knowledge": [
                    "菜单栏：文件、编辑、视图、插入、格式、工具、装配、信息、分析、首选项、窗口、帮助共12项",
                    "功能区（Ribbon）选项卡：「主页」最常用，「装配」「曲面」「分析」等模块切换",
                    "资源条（左侧竖条）：部件导航器（最重要）、装配导航器、重用库、角色、历史记录等",
                    "图形窗口：中间显示模型的区域，支持多标签页，每个部件独立显示",
                    "提示行（上）与状态行（下）：提示当前步骤应该做什么；状态行显示选择了多少对象",
                    "定制界面（Ctrl+1）：「命令」标签拖拽命令到工具条；「选项卡/条」显隐各模块；「角色」保存当前界面布局",
                    "角色（Role）：内置高级、基本、CAM 专项；可「新建角色」保存自己的按钮布局",
                    "全屏模式：Ctrl+Shift+F 放大图形窗口，再按还原；适合大模型查看",
                ],
            },
            {
                "title": "1.3 鼠标的操作",
                "page": 3,
                "knowledge": [
                    "鼠标左键（LB）：单击选单个对象、框选（从左到右选全包围、从右到左选半包围），按住拖拽连续选",
                    "鼠标中键（MB）：按一下 = 确定（OK）；按住拖拽 = 旋转模型视图；滚轮滚动 = 缩放视图",
                    "滚轮缩放中心：默认以光标位置为中心缩放，可在首选项中切换缩放模式",
                    "Ctrl + 中键拖拽：平移视图（不旋转只移动）；也可用 Shift + 中键",
                    "鼠标右键（RB）：在空白处长按弹出「快捷圆盘」菜单（径向菜单），中心是常用命令，周围8个扇区可选",
                    "圆盘菜单定制：Ctrl+1 →「圆盘菜单」标签页，可设置自己常用的8个命令",
                    "物体上右键：弹出该对象专属菜单（编辑参数、编辑位置、隐藏、抑制、删除等）",
                    "视图方向快捷键：F8 摆正到最近的正视图；Home 恢复默认等轴测视图",
                ],
            },
        ],
    },
    {
        "day": 2,
        "title": "视图操作与草图入门",
        "range": "1.4 - 1.5 + 2.1 进入草图",
        "goal": "掌握右键菜单与组合键推拉菜单的视图操作技巧，了解草图概念并掌握三种进入草图环境的方式。",
        "videos": [
            {
                "title": "1.4 右键菜单",
                "page": 4,
                "knowledge": [
                    "空白处右键：刷新、选择条过滤方式、刷新屏幕、清除高亮、布局切换",
                    "物体上右键（无命令激活时）：编辑参数、可回滚编辑、编辑位置、抑制、隐藏、删除、属性",
                    "命令激活中右键：确认当前步、后退（上一步）、取消（ESC）、重置当前输入",
                    "弹出菜单深度：不同对象弹出的菜单项不同，如草图右键含「完成草图」「定向视图到草图」",
                    "快捷圆盘菜单：按住右键在空白区域停留片刻弹出，中心区域+8扇区",
                    "视图操作菜单：在圆盘菜单「视图」扇区里有正等侧/俯视图/正视图/左视图等快速切换",
                    "圆盘菜单定制：Ctrl+1 →「圆盘」页签，按扇区分配按钮",
                    "常用：圆盘里放「隐藏」「显示」「正视于」「显示所有对象」这四个最省时间",
                ],
            },
            {
                "title": "1.5 组合键及推拉菜单",
                "page": 5,
                "knowledge": [
                    "Ctrl+Shift+左键九宫格(3×3)：每格对应命令，左上起依次为视图方向、比例、窗口切换等",
                    "Ctrl+Shift+中键九宫格：旋转、平移、缩放等观察命令",
                    "Ctrl+Shift+右键九宫格：测量、隐藏、编辑、对象显示等编辑命令",
                    "九宫格自定义：Ctrl+1 定制里可改每个格子放什么命令",
                    "右键方向滑动：上下左右推按不同方向触发不同动作",
                    "视图切换键：Top=俯视图、Front=正视图、Right=右视图、TFR-TRI=正等轴测等",
                    "定向视图到对象（Ctrl+Shift+O）：把视图正视于你选的面，画草图/钻孔前必用",
                    "小技巧：F8=视图摆正到最近平面；Ctrl+Shift+F=全屏视图；Ctrl+F=拟合视图到最大",
                ],
            },
            {
                "title": "2.1 进入草图",
                "page": 6,
                "knowledge": [
                    "草图（Sketch）：二维参数化绘图环境，是所有三维特征的截面基础，所有尺寸都可驱动",
                    "三种进入草图方式：①直接草图 ②任务环境中的草图 ③特征内草图（画拉伸时自动进草图）",
                    "草图平面是第一步要选的：现有平面、创建平面、创建基准坐标系（CSYS）",
                    "XY/YZ/XZ 三个基准平面是建模坐标系的三大平面，默认平面优先用它们",
                    "「自动判断」：选到哪个面/基准平面就用哪个平面，最省事",
                    "草图方向：平面选完后可选「参考」方向（哪个方向朝上）",
                    "草图原点：草图(0,0)落在哪，一般默认即可",
                    "完成草图（Ctrl+Q）：退出草图环境返回建模",
                ],
            },
        ],
    },
    {
        "day": 3,
        "title": "草图绘制工具",
        "range": "2.2 直线圆 + 2.3 阵列 + 2.4 对称偏置",
        "goal": "掌握直线、圆工具的XY模式与参数模式绘制，学会阵列曲线、对称镜像、偏置曲线及圆角工具。",
        "videos": [
            {
                "title": "2.2 直线与圆工具",
                "page": 7,
                "knowledge": [
                    "直线工具：①XY坐标模式 ②鼠标点击拖动 ③参数化长度+角度绘制",
                    "圆工具：①圆心+直径 ②三点画圆 ③相切相切半径",
                    "圆弧工具：三点圆弧、中心+起点+终点圆弧",
                    "尺寸驱动性：画完不用在意大小，之后双击尺寸输入数值即可修改",
                    "捕捉点开关：端点、中点、圆心、交点、切点、四等分点、控制点、象限点等",
                    "点构造器：鼠标右键可临时调用；也可按对话框箭头打开精确输入窗口",
                    "快速修剪：点选线段一段段剪掉，或按住左键横扫把多余段批量剪",
                    "快速延伸：与修剪同组，让线段自动延长到下一条边界上",
                    "几何约束入门：相切、共点、同心、共线、水平、竖直、平行、垂直 8 种最基础",
                ],
            },
            {
                "title": "2.3 阵列工具",
                "page": 8,
                "knowledge": [
                    "阵列曲线（草图内阵列）：分「线性阵列」和「圆形阵列」",
                    "线性阵列：选择要阵列的曲线→指定X方向（数量+节距或数量+总跨距）→指定Y方向→确定",
                    "节距 vs 跨距：节距=相邻中心距；跨距=首末对象之间总距离",
                    "圆形阵列：选曲线→选中心参考点→数量+节距角或数量+总角度",
                    "布尔选项：无、加、减、交——在草图里阵列和原对象是分开还是合并",
                    "对象类型转换（实线↔参考线）：画阵列基准圆时经常需要把圆转成参考线",
                    "阵列孔：圆画一个孔，再用圆形/线性阵列出全部孔，是法兰盘等零件的标准画法",
                    "删除阵列实例：阵列后可单独删除某个位置的对象",
                ],
            },
            {
                "title": "2.4 对称偏置圆角",
                "page": 9,
                "knowledge": [
                    "镜像曲线（对称）：选要镜像的曲线→选对称中心线→确认；UG 自动添加「对称」约束",
                    "镜像中心线要求：必须是草图中的直线，一般转参考线；轴必须在同一张草图里",
                    "偏置曲线：把已有曲线按指定距离偏移出一条平行副本",
                    "3D 偏置 vs 草图偏置：草图内偏置是二维平面内偏，3D 偏置是空间偏",
                    "角焊（圆角/倒圆）：选两条相邻线→输入半径→确定；支持同时框选多个角批量倒圆角",
                    "圆角规则：先在约束基本完成后再倒圆角，否则约束可能乱跑",
                    "取消圆角：圆角出错时可回退；若已添加约束先删掉该约束再重画",
                    "小练习完整流程：画中心参考十字→画大圆外形→画孔位参考圆→画一个孔→阵列孔→镜像对称部分→全约束→修多余线→倒圆角",
                ],
            },
        ],
    },
    {
        "day": 4,
        "title": "草图约束与技巧",
        "range": "2.5 约束 + 2.6 派生 + 2.7 草图技巧",
        "goal": "系统掌握草图几何约束与尺寸约束，学会派生曲线、偏置曲线操作，积累草图绘制技巧。",
        "videos": [
            {
                "title": "2.5 约束工具",
                "page": 10,
                "knowledge": [
                    "几何约束 vs 尺寸约束：几何约束控制位置关系；尺寸约束控制大小，二者配合构成全约束",
                    "全约束（自由度=0）：所有曲线都变成浅绿色，草图不会乱动",
                    "11种几何约束：固定/重合/同心/共线/点在曲线上/中点/水平/竖直/平行/垂直/相切/等长/等半径/恒定角度/对称",
                    "自动约束 vs 手动约束：绘制时自动加的约束不够或错→手动补",
                    "约束冲突：两条线同时被加平行+垂直就会冲突，提示栏变红",
                    "快速尺寸：自动判断模式最省时；必要时切换到水平、竖直、平行、垂直、角度、径向、周长尺寸",
                    "周长尺寸：给封闭轮廓约束总长，常用于弹簧、凸轮类",
                    "钩子实例完整流程：画中心十字→画外轮廓大圆→画各段圆弧（相切约束是关键）→画小圆并约束到指定距离→加圆角→修剪多余段→全约束",
                ],
            },
            {
                "title": "2.6 派生曲线",
                "page": 11,
                "knowledge": [
                    "派生直线：画两条平行线，选两条平行线段→UG 在它们中间自动派生一条平行线",
                    "偏置曲线（草图内）：选已有曲线→输入偏置距离→选方向；支持链式偏置多条边",
                    "投影曲线：把当前草图外的对象投影到当前草图平面上，变成草图里的曲线；最常用命令之一",
                    "投影曲线注意：投影来的曲线会带「投影约束」，删除投影约束才能自由改",
                    "相交曲线：求一个面/基准面与草图平面的交线；常用于确定草图与已有特征的交界",
                    "综合：派生直线用得少，偏置/投影/相交用得多",
                    "派生类曲线一般是辅助，最后要修剪并和主体线合并成封闭轮廓才能拉伸",
                ],
            },
            {
                "title": "2.7 草图技巧",
                "page": 12,
                "knowledge": [
                    "草图绘制黄金顺序：① 画参考线 ② 画主体形状 ③ 加几何约束 ④ 加尺寸约束 ⑤ 倒圆角 ⑥ 修剪完成",
                    "草图欠约束可接受吗？初学建议先做到全约束（浅绿色），熟练后少量欠约束可以接受",
                    "约束符号看不清：「显示草图约束」按钮可切换显示/隐藏所有约束符号；双击符号可以编辑该约束",
                    "定向视图到草图：进入复杂草图先按 F8 或点「定向视图到草图」按钮",
                    "参考线用法：复杂零件的中心、中心线、孔位分布圆等都先画再转参考线",
                    "轮廓命令：先拖画整体轮廓（直线+圆弧自动切换），最后再统一加约束",
                    "草图失败排查：修改父特征后草图失效，进草图看是不是有冲突或悬空约束→删掉死约束重新加",
                    "草图评估：「信息」→「草图」可查看自由度、约束数量、状态",
                ],
            },
        ],
    },
    {
        "day": 5,
        "title": "拉伸特征入门",
        "range": "3.1 拉伸实例 + 3.2 拉伸详解",
        "goal": "理解草图到实体的转换流程，掌握拉伸命令的截面选择、方向、距离限制等核心参数。",
        "videos": [
            {
                "title": "3.1 拉伸实例",
                "page": 13,
                "knowledge": [
                    "拉伸（Extrude）= 把二维截面沿着指定方向扫出一段高度，生成实体/片体",
                    "拉伸完整流程：①选/画草图截面 ②打开拉伸（快捷键 X） ③选截面 ④选方向 ⑤输入距离 ⑥选布尔 ⑦确定",
                    "选择意图：相连曲线用得最多，点一条自动串联整个轮廓",
                    "截面开口 vs 闭合：开口截面拉伸成「片体」；闭合截面默认拉成「实体」",
                    "部件导航器：拉伸后会在特征树看到一个「拉伸」，可右键→编辑参数、编辑位置、删除、抑制",
                    "布尔运算（Boolean）：无、求和、求差、求交",
                    "求和注意：两个体必须有真实相交的体积，否则报错",
                    "实例：画一个矩形草图→拉成长方体→再在上面画圆草图→求差拉伸成孔",
                ],
            },
            {
                "title": "3.2 拉伸详解",
                "page": 14,
                "knowledge": [
                    "截面（Section）：可直接选已有草图，也可在拉伸对话框里即时「绘制截面」新建草图",
                    "方向（Direction）：默认垂直于草图平面；也可手动选边/基准轴作为方向矢量",
                    "限制（Limits）：①值 ②对称值 ③直至下一个 ④直至选定 ⑤贯通",
                    "直到延伸（Until Extended）：选择的参考面不够大时自动扩展再截停",
                    "拔模（Draft）：拉伸时给侧面加锥度；正数向内收，负数向外扩",
                    "拔模常见错误：锥度过大导致上底面面积归零，会报错；锥度通常≤15°安全",
                    "偏置（Offset，Day6详解）：在截面内/外加厚拉，可做薄壁管",
                    "编辑参数 vs 可回滚编辑：编辑参数只改对话框数值；可回滚编辑=回到特征刚创建时的完整流程",
                ],
            },
        ],
    },
    {
        "day": 6,
        "title": "拉伸进阶与旋转",
        "range": "3.3 起点终点 + 3.4 拉伸偏置 + 3.5 旋转倒角",
        "goal": "掌握拉伸的起点终点设置与偏置功能，学会旋转特征创建回转体并完成倒角。",
        "videos": [
            {
                "title": "3.3 起点终点",
                "page": 15,
                "knowledge": [
                    "起点（Start）与终点（End）：默认起点=0，终点=你输入的距离；起点也可以不是草图平面",
                    "起点控制方式同终点：值/对称值/直至下一个/直至选定/贯通；起终点独立控制",
                    "直至选定典型用例：把筋板、加强筋拉到刚好贴合一个曲面为止",
                    "贯通典型用例：在厚板上打通孔，无论板材多厚都能打穿",
                    "直至下一个 vs 直至选定：前者自动找下一个碰到的体，后者手动选一个对象当止面",
                    "方向反向：拉伸过程中点「反向」按钮可以把拉伸方向反过来",
                    "失败排查：直至选定的参考面不够大，报错「无法修剪」→ 换用直到延伸",
                    "实例：做阶梯轴→先画一个圆拉成短圆柱→再在其端面上画另一个大圆，拉成第二段→求和即可",
                ],
            },
            {
                "title": "3.4 拉伸偏置",
                "page": 16,
                "knowledge": [
                    "拉伸偏置（Offset）：在拉伸的同时，让截面再向内/向外偏一段厚度，生成薄壁实体",
                    "偏置模式：①无 ②单侧 ③两侧 ④对称",
                    "单侧偏置典型应用：圆形截面+单侧偏置→内/外管；方截面+单侧偏置→箱体侧壁",
                    "两侧偏置典型应用：两端厚度不一样的阶梯套筒",
                    "偏置厚度太大导致拐角自交，会报错「自相交截面」→减小偏置厚度或先画大截面再用抽壳",
                    "偏置 vs 抽壳：偏置是「在拉伸时顺便做壁厚」，抽壳是「先做成实心，再掏空」",
                    "偏置还能在原截面基础上生成薄壁+原实体布尔，形成加强肋板",
                    "练习：画直径60的圆→拉伸偏置，单侧向外偏 5，高度 100→得到外径70、内径60、高100的空心管",
                ],
            },
            {
                "title": "3.5 旋转倒角",
                "page": 17,
                "knowledge": [
                    "旋转（Revolve）= 把二维截面绕某根轴旋转一定角度，生成回转体",
                    "旋转三要素：①截面 ②轴（直线或基准轴）③旋转角度",
                    "轴选择规则：轴必须与截面共面，且不能穿过截面内部（穿过会自相交）",
                    "旋转角度：默认 0°~360° 生成整圈；也可只转一段",
                    "布尔运算：旋转也支持求和/求差/求交",
                    "倒斜角（Chamfer）：切去棱边的尖角；有「对称」「非对称」「偏置和角度」三种模式",
                    "边倒圆（Edge Blend）：选棱边→输入半径→确定；可同时选多条边批量倒",
                    "特征顺序很重要：先做主体，再倒大圆角，再倒角，最后打孔、切槽",
                ],
            },
        ],
    },
    {
        "day": 7,
        "title": "片体与孔特征",
        "range": "3.6 片体实体 + 3.7 孔工具 + 3.8 螺纹",
        "goal": "理解片体与实体的区别与转换，掌握孔特征的创建与定位，学会添加螺纹特征。",
        "videos": [
            {
                "title": "3.6 片体实体",
                "page": 18,
                "knowledge": [
                    "实体 vs 片体：实体有体积有厚度，片体是没有厚度的「面」",
                    "什么时候得到片体：①开口截面拉伸/旋转 ②曲面模块命令 ③缝合时公差不够",
                    "缝合（Sew）：把多个相邻的片体拼接到一起，闭合后自动变成实体",
                    "缝合公差：默认0.0254mm，面与面之间缝隙大于这个值就缝不上→加大公差",
                    "加厚（Thicken）：给单片体加厚度变成实体；向内/向外/两侧偏",
                    "修剪片体：用面、曲线、基准去剪掉片体不需要的部分",
                    "片体转实体 3 种方法：①缝合 ②加厚 ③补面",
                    "片体失败排查：边界检查（分析→检查几何体→片体边界）可以找出面组有没有破洞",
                ],
            },
            {
                "title": "3.7 孔工具",
                "page": 19,
                "knowledge": [
                    "孔（Hole）特征（快捷键 H）：比「画圆再拉伸求差」更灵活",
                    "孔类型：①常规孔 ②钻形孔 ③螺钉间隙孔 ④螺纹孔 ⑤孔系列",
                    "常规孔的形状：简单孔、沉头孔、埋头孔、锥形孔",
                    "孔尺寸参数：直径、深度（值/贯通体/直至选定/直至下一个）、顶锥角（一般118°钻头标准角）",
                    "沉头孔参数：沉头直径、沉头深度、孔直径、孔深度",
                    "孔定位方式：①绘制草图定位 ②线性定位 ③径向定位 ④同轴 ⑤点在点上",
                    "推荐定位方式：新学者先选「绘制草图的点」定位最直观",
                    "阵列孔：单个孔做好后用「阵列特征」阵列出多个（线性/圆形）",
                ],
            },
            {
                "title": "3.8 添加螺纹",
                "page": 20,
                "knowledge": [
                    "螺纹（Thread）命令：给圆柱面/孔内表面添加螺纹标记或螺纹几何形状",
                    "符号螺纹（Symbolic）：只在表面画出虚线螺纹标记；计算快、模型小，工程图里会自动正确标注",
                    "详细螺纹（Detailed）：真的切削出螺纹牙形；模型体积大、运算慢，仅用于渲染展示",
                    "符号螺纹参数：大径、小径、螺距、长度、旋转方向（右旋/左旋）、标注",
                    "读取标准：勾选「手动输入」关闭后，可读取 ISO/UNC/UNF 等标准螺纹表",
                    "起始条件：螺纹从哪里开始；可指定起始面、从指定距离处开始",
                    "左旋 vs 右旋：机械行业默认右旋（顺时针拧紧），特殊场合才用左旋",
                    "实例：法兰盘4个M10孔→先画4个直径8.5的钻孔→符号螺纹选每个孔的内表面→选M10标准→完成",
                ],
            },
        ],
    },
    {
        "day": 8,
        "title": "基准面与抽壳",
        "range": "3.9 建立基准面 + 3.10 抽壳工具",
        "goal": "掌握基准平面的多种创建方法，学会抽壳工具创建均匀/变壁厚壳体。",
        "videos": [
            {
                "title": "3.9 建立基准面",
                "page": 21,
                "knowledge": [
                    "基准平面（Datum Plane）：虚拟的参考平面，无限大，用作草图平面、定位面、镜像面等辅助",
                    "创建基准面常用 7 种方式：①自动判断 ②点和方向 ③在曲线上 ④按距离 ⑤成一角度 ⑥平分 ⑦相切",
                    "常用场景：「按距离」做阶梯零件；「成角度」做倾斜肋板；「相切」过圆柱切点建平面画凸台",
                    "基准轴（Datum Axis）：参考直线，常用于旋转特征轴、圆周阵列参考、方向矢量",
                    "基准坐标系（Datum CSYS）：同时生成 XY、YZ、XZ 三个基准平面+原点+三根轴",
                    "基准关联性：基准面由哪个对象建立，就自动跟着那个对象移动——这就是参数化",
                    "什么时候需要单独建基准？想让多个特征共用同一个参考面时就需要显式建一个",
                    "小技巧：新建基准后先点「显示结果」预览，确认平面位置对了再确定",
                ],
            },
            {
                "title": "3.10 抽壳工具",
                "page": 22,
                "knowledge": [
                    "抽壳（Shell）= 把实心实体挖空，只留一层壁；适合做箱体、外壳、容器",
                    "抽壳操作：打开抽壳→选择「要穿透的面」（会被挖开）→输入壁厚→确定",
                    "壁厚类型：①均匀壁厚 ②备选厚度（为个别面单独指定厚度）",
                    "抽壳方向：向内（默认，内部挖空，外形不变）、向外、对称",
                    "抽壳最小壁厚：太小（<0.1mm）容易失败；注塑一般0.8~2mm",
                    "抽壳特征顺序：抽壳前尽量先把所有主体特征做好再抽",
                    "抽壳失败常见原因：①有尖锐的内角→先倒大圆角 ②倒圆半径≥壁厚 ③有的面缝隙太大 ④特征顺序不对",
                    "实例：做一个塑料杯→先旋转做出实心锥状→抽壳选顶面挖开，壁厚1.5，向外→杯口再倒大圆角",
                ],
            },
        ],
    },
    {
        "day": 9,
        "title": "综合练习一",
        "range": "4.1 旋转抽壳练习 + 4.2 基准练习",
        "goal": "综合运用旋转、抽壳、基准面等命令完成实际零件建模，巩固前8天所学。",
        "videos": [
            {
                "title": "4.1 旋转抽壳练习",
                "page": 23,
                "knowledge": [
                    "练习目标：综合运用草图→旋转→抽壳→倒圆角→基准面→孔 完整流程，独立做出一个端盖/壳体类零件",
                    "标准建模思路：①读懂二维图纸 ②分析主特征 ③先做主形体 ④附加次要特征 ⑤细节处理 ⑥测量检查",
                    "绘制旋转截面技巧：先画对称中心基准轴（转参考线）→画截面半边轮廓→加约束→加尺寸→检查闭合",
                    "旋转后再抽壳的原则：先把实体所有外形做好→抽壳→最后孔/螺纹",
                    "常见出错：旋转截面有开口→得到片体抽不了壳；抽壳时穿透面没选到→全封闭壳找不到开口",
                    "调试方法：失败后看提示，「无法构造几何体」就是某处壁厚为负或自交",
                    "建模完成检查：测量最大外径/高度/壁厚/孔直径，对照图纸；用剖切命令 Ctrl+H 切一半看内部",
                ],
            },
            {
                "title": "4.2 基准练习",
                "page": 24,
                "knowledge": [
                    "练习目标：灵活运用基准平面、基准轴、基准 CSYS 解决复杂零件的定位与阵列",
                    "基准面练习案例：圆柱体表面开凸台→先做过圆柱轴线+指定角度的基准面→在基准面上画草图",
                    "基准面+阵列：圆周方向6处均匀分布凸台→先做第一个凸台的基准面→圆形阵列",
                    "基准轴练习：旋转特征轴找不到时→先做基准轴（两面相交线 / 圆柱中心线 / 两点连线）",
                    "CSYS 基准坐标系：装配时从其它零件导入，要求坐标对准时先建共同基准 CSYS",
                    "基准特征太多怎么办：Ctrl+B 隐藏 / Ctrl+Shift+B 显示，或者按图层分类管理",
                    "技巧：基准要「够用为准」，能直接用面/边的就不用新建基准",
                ],
            },
        ],
    },
    {
        "day": 10,
        "title": "综合实战总结",
        "range": "4.3 综合练习 + 全程回顾",
        "goal": "通过综合练习整合所有命令，完成一个完整零件的建模流程，回顾25节课程要点。",
        "videos": [
            {
                "title": "4.3 综合练习",
                "page": 25,
                "knowledge": [
                    "综合练习目标：整合25节所有命令，独立完成一个中等复杂度零件（法兰盘、轴承座、减速箱体类）",
                    "完整建模范式（法兰盘示例）：①新建文件 ②画草图阵列孔 ③拉伸主形体 ④求差生成轴孔 ⑤埋头孔 ⑥边倒圆角 ⑦螺纹 ⑧剖切检查 ⑨对象检查",
                    "部件导航器深度使用：右键特征→「编辑参数」、「可回滚编辑」、「抑制」、「重排在前面/后面」",
                    "图层管理：图层1=实体，图层21=草图，图层41=基准/轴，图层61=片体/曲面，图层81=工程图",
                    "对象显示（Ctrl+J）：给不同特征/实体上不同颜色+透明度",
                    "建模自检清单：草图全约束？特征顺序合理？壁厚一致？孔位正确？关键尺寸对上？",
                    "完成后输出：导出 STEP/IGES/X_T 通用格式；或直接进入装配/制图模块",
                ],
            },
            {
                "title": "全程回顾 · 1.1-1.5 基础操作",
                "page": 1,
                "knowledge": [
                    "回顾 1.1-1.5：①UG 新建/保存 ②界面构成 ③Ctrl+1 定制+保存角色 ④鼠标三键操作 ⑤右键菜单+组合键九宫格",
                    "基础操作是地基：后续命令不管多复杂，都要靠这5节的选对象/看视图/确认/取消来推进",
                    "高频操作自查：打开一个旧部件，能在10秒内旋转/平移/缩放视图、找到上次修改的特征、单独隐藏一个面",
                    "常见错误总结：①文件名用中文 ②单位选错（英寸） ③视图方向乱了按F8/Home恢复 ④快捷键冲突→Ctrl+1重置 ⑤选不到对象→检查选择条过滤器",
                ],
            },
            {
                "title": "全程回顾 · 2.1-2.7 草图模块",
                "page": 6,
                "knowledge": [
                    "回顾 2.1-2.7：①进入草图三种方式 ②直线/圆/圆弧绘制 ③阵列曲线+对称镜像/偏置/圆角 ④11种几何约束+尺寸约束 ⑤派生直线/投影曲线/相交曲线 ⑥显示草图约束/定向视图到草图 ⑦绘制顺序",
                    "草图是所有三维特征的「根」：草图不过关，后续特征再高级也白搭。90% 的建模报错根因在草图",
                    "草图能力自测：给你一张中等复杂的二维图，能在15分钟内画完并全约束吗？",
                    "后续进阶：先把草图练熟，再学曲面/装配/模具才稳；建议额外做 20~30 张草图练习题",
                ],
            },
        ],
    },
]


def esc(s):
    """转义HTML特殊字符"""
    return (s or "").replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def build_video_html(v, idx):
    """生成单节课的HTML内容"""
    page_url = f"{BASE_URL}?p={v['page']}"
    kp_items = "".join(f'<li style="margin:4px 0;line-height:1.7;">{esc(kp)}</li>' for kp in v["knowledge"])
    return f'''
    <div style="margin:18px 0 24px;border-left:4px solid #0078D4;padding-left:18px;">
      <h3 style="color:#0078D4;margin:0 0 6px;font-size:15px;">第 {idx} 课 · {esc(v["title"])}</h3>
      <p style="color:#666;font-size:12px;margin:0 0 10px;">B站分P：第 {v["page"]} P · <a href="{page_url}" style="color:#0078D4;">{page_url}</a></p>
      <div style="background:#f6f9fc;border:1px solid #dde7f0;border-radius:6px;padding:12px 18px;">
        <div style="color:#0078D4;font-weight:600;font-size:13px;margin-bottom:8px;">📘 知识点（{len(v["knowledge"])} 条）</div>
        <ol style="margin:0;padding-left:22px;color:#333;font-size:13px;">
          {kp_items}
        </ol>
      </div>
    </div>'''


def build_day_html(d):
    """生成一天的HTML内容"""
    videos_html = "".join(build_video_html(v, i + 1) for i, v in enumerate(d["videos"]))
    video_count = len(d["videos"])
    return f'''
    <div style="margin:32px 0 36px;">
      <h2 style="color:#fff;background:#0078D4;padding:12px 18px;border-radius:6px;font-size:18px;margin:0 0 6px;">
        DAY {d["day"]} · {esc(d["title"])}
      </h2>
      <p style="color:#666;font-size:12px;margin:0 0 14px;">对应课程：{esc(d["range"])} · 共 {video_count} 节课</p>
      <div style="background:#fff8e1;border-left:4px solid #ffa000;padding:10px 16px;margin:0 0 16px;border-radius:0 4px 4px 0;">
        <span style="color:#b25800;font-weight:600;font-size:13px;">🎯 学习目标：</span>
        <span style="color:#5d4500;font-size:13px;">{esc(d["goal"])}</span>
      </div>
      {videos_html}
    </div>'''


def build_toc_html():
    """生成目录表"""
    rows = ""
    for d in plan:
        video_count = len(d["videos"])
        kp_count = sum(len(v["knowledge"]) for v in d["videos"])
        ranges = "、".join(v["title"] for v in d["videos"])
        rows += f'''
        <tr>
          <td style="padding:8px 10px;border:1px solid #ccc;text-align:center;font-weight:600;color:#0078D4;">DAY {d["day"]}</td>
          <td style="padding:8px 10px;border:1px solid #ccc;">{esc(d["title"])}</td>
          <td style="padding:8px 10px;border:1px solid #ccc;text-align:center;">{esc(d["range"])}</td>
          <td style="padding:8px 10px;border:1px solid #ccc;text-align:center;">{video_count}</td>
          <td style="padding:8px 10px;border:1px solid #ccc;text-align:center;">{kp_count}</td>
        </tr>'''
    return f'''
    <h2 style="color:#0078D4;border-bottom:2px solid #0078D4;padding-bottom:6px;">📊 目录与课程分布</h2>
    <table style="border-collapse:collapse;width:100%;font-size:13px;margin:14px 0 24px;">
      <thead>
        <tr style="background:#0078D4;color:#fff;">
          <th style="padding:10px;border:1px solid #0078D4;">天数</th>
          <th style="padding:10px;border:1px solid #0078D4;">主题</th>
          <th style="padding:10px;border:1px solid #0078D4;">课程范围</th>
          <th style="padding:10px;border:1px solid #0078D4;">节数</th>
          <th style="padding:10px;border:1px solid #0078D4;">知识点数</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>'''


def build_appendix_html():
    """生成附录：常用快捷键 + 进阶方向"""
    shortcuts = [
        ("Ctrl+N", "新建文件"),
        ("Ctrl+S", "保存文件"),
        ("Ctrl+Shift+S", "全部保存"),
        ("Ctrl+1", "定制界面"),
        ("Ctrl+Q", "完成草图"),
        ("Ctrl+J", "对象显示（颜色/透明度）"),
        ("Ctrl+B / Ctrl+Shift+B", "隐藏 / 显示所有"),
        ("Ctrl+H", "剖切视图"),
        ("Ctrl+F", "拟合视图到最大"),
        ("Ctrl+Shift+F", "全屏模式"),
        ("Ctrl+Shift+O", "定向视图到对象"),
        ("X", "拉伸命令"),
        ("H", "孔命令"),
        ("F8", "视图摆正到最近平面"),
        ("Home", "恢复默认等轴测视图"),
        ("Top / Front / Right", "俯视 / 正视 / 右视图"),
    ]
    shortcut_rows = "".join(
        f'<tr><td style="padding:6px 10px;border:1px solid #ccc;font-family:Consolas,monospace;color:#c0392b;font-weight:600;">{k}</td><td style="padding:6px 10px;border:1px solid #ccc;">{esc(v)}</td></tr>'
        for k, v in shortcuts
    )

    advances = [
        ("曲面造型", "通过曲线组、扫掠曲面、桥接曲面、N边曲面、修剪与延伸，做产品外观/复杂塑料件"),
        ("装配设计", "自底向上/自顶向下装配、装配约束（对齐/接触/同心/角度）、爆炸图、装配顺序"),
        ("工程图", "投影视图、剖视图、局部放大图、尺寸标注、形位公差、表面粗糙度、图框模板"),
        ("钣金设计", "弯边、折弯、百叶窗、冲孔、展开与折叠，做钣金件"),
        ("模具设计", "分模面、型芯型腔、滑块、镶件、流道、冷却，注塑模具全流程"),
        ("CAM 加工", "2.5轴铣、3轴铣、车削、车铣复合、后处理、生成G代码"),
        ("同步建模", "直接修改非参数化模型，移动面、替换面、删除面、调整圆角大小"),
    ]
    advance_rows = "".join(
        f'<tr><td style="padding:6px 10px;border:1px solid #ccc;font-weight:600;color:#0078D4;">{esc(name)}</td><td style="padding:6px 10px;border:1px solid #ccc;">{esc(desc)}</td></tr>'
        for name, desc in advances
    )

    return f'''
    <h2 style="color:#0078D4;border-bottom:2px solid #0078D4;padding-bottom:6px;margin-top:40px;">⌨️ 附录一：常用快捷键速查</h2>
    <table style="border-collapse:collapse;width:100%;font-size:13px;margin:14px 0 24px;">
      <thead><tr style="background:#f0f0f0;">
        <th style="padding:8px 10px;border:1px solid #ccc;width:30%;">快捷键</th>
        <th style="padding:8px 10px;border:1px solid #ccc;">功能</th>
      </tr></thead>
      <tbody>{shortcut_rows}</tbody>
    </table>

    <h2 style="color:#0078D4;border-bottom:2px solid #0078D4;padding-bottom:6px;margin-top:32px;">🚀 附录二：后续进阶方向</h2>
    <table style="border-collapse:collapse;width:100%;font-size:13px;margin:14px 0 24px;">
      <thead><tr style="background:#f0f0f0;">
        <th style="padding:8px 10px;border:1px solid #ccc;width:20%;">方向</th>
        <th style="padding:8px 10px;border:1px solid #ccc;">主要内容</th>
      </tr></thead>
      <tbody>{advance_rows}</tbody>
    </table>'''


def build_full_html():
    """组装完整Word文档HTML"""
    today = datetime.datetime.now().strftime("%Y-%m-%d")
    total_kp = sum(len(v["knowledge"]) for d in plan for v in d["videos"])
    total_videos = sum(len(d["videos"]) for d in plan)

    # 封面
    cover = f'''
    <div style="text-align:center;padding:60px 20px 40px;border-bottom:3px double #0078D4;">
      <div style="font-size:14px;color:#666;letter-spacing:6px;margin-bottom:14px;">UG NX 12.0</div>
      <h1 style="color:#0078D4;font-size:32px;margin:0 0 14px;">25 节课知识点汇总</h1>
      <div style="color:#333;font-size:16px;margin-bottom:8px;">基于 B站《UG12.0从入门到精通 25节课》教程</div>
      <div style="color:#666;font-size:13px;margin-bottom:24px;">
        教程作者：{BASE_AUTHOR} · 教程地址：<a href="{BASE_URL}" style="color:#0078D4;">{BASE_URL}</a>
      </div>
      <div style="display:inline-block;background:#f6f9fc;border:1px solid #dde7f0;border-radius:6px;padding:14px 28px;font-size:13px;color:#333;">
        共 <b style="color:#0078D4;">10</b> 天 · <b style="color:#0078D4;">{total_videos}</b> 节课 · <b style="color:#0078D4;">{total_kp}</b> 条知识点<br>
        生成日期：{today}
      </div>
    </div>

    <div style="background:#eaf4ff;border-left:4px solid #0078D4;padding:14px 18px;margin:24px 0;border-radius:0 4px 4px 0;">
      <div style="color:#0078D4;font-weight:600;font-size:14px;margin-bottom:6px;">📖 使用说明</div>
      <div style="color:#333;font-size:13px;line-height:1.8;">
        本文档按 10 天学习计划整理，每天对应 B 站教程 BV1SYJc6MEWJ 的 2-3 个分P，每节课配有 7-9 条核心知识点。<br>
        建议学习方式：①先看本文档预习当天知识点 ②打开B站视频对照学习 ③回到打卡页面输入笔记完成打卡 ④学完用「导出笔记」生成个人学习记录。
      </div>
    </div>
    '''

    # 目录
    toc = build_toc_html()

    # 每天
    days = "".join(build_day_html(d) for d in plan)

    # 附录
    appendix = build_appendix_html()

    # 页脚
    footer = f'''
    <div style="margin-top:40px;padding-top:18px;border-top:1px solid #ccc;text-align:center;color:#999;font-size:11px;line-height:1.8;">
      本文档由 UG NX 12.0 自学打卡日历自动生成 · 基础教程：BV1SYJc6MEWJ《UG12.0从入门到精通 25节课》<br>
      生成时间：{datetime.datetime.now().strftime("%Y-%m-%d %H:%M")} · 共 {total_kp} 条知识点
    </div>'''

    full = f"""<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">
<head>
<meta charset="utf-8">
<title>UG NX 12.0 25节课知识点汇总</title>
<!--[if gte mso 9]>
<xml>
<w:WordDocument>
<w:View>Print</w:View>
<w:Zoom>100</w:Zoom>
<w:DoNotOptimizeForBrowser/>
</w:WordDocument>
</xml>
<![endif]-->
<style>
@page Section1 {{
  size: A4;
  margin: 2cm 2.5cm 2cm 2.5cm;
}}
div.Section1 {{
  page: Section1;
}}
body {{
  font-family: "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  font-size: 13px;
  color: #333;
  line-height: 1.7;
}}
h1, h2, h3 {{
  font-family: "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}}
table {{
  border-collapse: collapse;
}}
a {{
  color: #0078D4;
  text-decoration: none;
}}
</style>
</head>
<body>
<div class="Section1">
{cover}
{toc}
{days}
{appendix}
{footer}
</div>
</body>
</html>"""
    return full


def main():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    out_path = os.path.join(base_dir, OUT_FILE)

    html = build_full_html()

    # 写入文件（带 BOM 头确保中文不乱码）
    with open(out_path, "w", encoding="utf-8-sig") as f:
        f.write(html)

    size_kb = os.path.getsize(out_path) / 1024
    total_kp = sum(len(v["knowledge"]) for d in plan for v in d["videos"])
    total_videos = sum(len(d["videos"]) for d in plan)

    print("=" * 50)
    print("  UG NX 12.0 25节课知识点汇总 - Word文档生成器")
    print("=" * 50)
    print()
    print(f"文件名：{OUT_FILE}")
    print(f"大小：{size_kb:.1f} KB")
    print(f"位置：{out_path}")
    print()
    print(f"内容统计：")
    print(f"  · 10 天学习计划")
    print(f"  · {total_videos} 节课")
    print(f"  · {total_kp} 条详细知识点")
    print(f"  · 含目录表、附录（快捷键 + 进阶方向）")
    print()
    print("可用 Microsoft Word / WPS 直接打开编辑。")
    print("=" * 50)


if __name__ == "__main__":
    main()
