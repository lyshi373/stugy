/* ==========================================================================
 * 学习打卡中心 · 软件模块：数字化入门
 * --------------------------------------------------------------------------
 * 本文件只存放《数字化入门》这一个软件的学习内容与配置。
 * 修改/增加学习内容只需编辑本文件，主程序（index.html / template.html）会自动加载。
 * 每个视频都已配置对应的 B站 BV 号（bvid 字段），点击后直接在页面内嵌播放，无需手动搜索。
 * 修改内容后建议把 planVersion 递增（如 v2 -> v3），浏览器会自动用新内容替换
 * 旧的学习计划（已打卡记录与笔记不会受影响）。
 * ========================================================================== */
(function(){
  const module = {
    id: "digital-basics",
    name: "数字化入门",
    desc: "AI协作与Agent制作·10天速成",
    color: "#7c3aed",
    days: 10,
    type: "builtin",
    iconLetter: "数",
    planVersion: "20260813-v2", // 修改本文件内容后请递增此版本号

    // 内嵌打卡引擎配置（type=builtin 时使用）
    engine: {
      viewId: "view-digital",
      domPrefix: "dg",
      storageKey: "checkin_digital-basics",
      contentKey: "checkin_digital-basics_content",
      daysKey: "checkin_digital-basics_days",
      planVerKey: "checkin_digital-basics_plan_version",
      headerDesc: "AI协作与Agent制作 · 每天学习 + 笔记打卡，10天学完全部内容",
      baseBvid: "",            // 每个视频已单独配置 bvid（下方 embeddedPlan 中），此处合集留空即可
      tutorial: null,
      extraResources: []
    },

    /* 内嵌打卡计划（知识点汇总页数据会自动由此生成） */
    embeddedPlan: [
  {
    day: 1,
    title: "AI大模型基础与ChatGPT入门",
    desc: "了解AI大模型，注册ChatGPT，掌握基本对话技巧",
    goal: "完成ChatGPT注册，了解大语言模型基本原理，掌握基本对话技巧，能独立完成一次专业邮件撰写。",
    points: [
      "什么是大语言模型（LLM）：训练数据、参数规模、生成原理",
      "ChatGPT注册流程与界面介绍（网页版/App版）",
      "基本对话技巧：清晰表达、上下文连贯、追问与修正",
      "AI的能力边界：擅长什么（文本生成/总结/翻译）vs 不擅长什么（实时信息/精确计算）",
      "实战：用ChatGPT写一封专业商务邮件"
    ],
    videos: [
      {title: "ChatGPT零基础入门教程 - 什么是大语言模型", bvid: "BV1U84y167i3", page: 1, knowledge: [
        "大语言模型（LLM）本质：基于Transformer架构的文本生成模型",
        "训练过程：预训练（学习语言规律）→ 微调（对齐人类意图）→ RLHF（人类反馈强化学习）",
        "参数规模：GPT-3有1750亿参数，GPT-4参数量未公开但更大",
        "Token概念：AI处理文本的基本单位，1个英文单词≈1.3个token，1个汉字≈1.5-2个token",
        "上下文窗口：GPT-4支持128K上下文（约10万字），但越长越容易丢失中间信息",
        "温度参数（Temperature）：控制输出随机性，0=确定性最高，1=创造性最强",
        "ChatGPT vs GPT API：ChatGPT是产品，GPT API是开发者接口",
        "免费vs付费：免费版用GPT-3.5/有限GPT-4，Plus版无限制GPT-4"
      ]},
      {title: "AI工具使用指南 - 从注册到第一次对话", bvid: "BV1sWcdeZEMN", page: 1, knowledge: [
        "ChatGPT注册方式：邮箱注册/Google账号/Microsoft账号",
        "界面布局：左侧对话历史、中间对话区、底部输入框、顶部设置",
        "新建对话（New Chat）vs 继续对话：新话题用新对话，相关话题继续",
        "输入框技巧：Shift+Enter换行，Enter发送",
        "对话历史管理：重命名、删除、搜索历史对话",
        "设置选项：自定义指令、数据控制、主题切换",
        "移动端App：iOS/Android均可下载，支持语音输入",
        "网络要求：部分地区需要特殊网络环境才能访问"
      ]}
    ]
  },
  {
    day: 2,
    title: "Prompt工程基础",
    desc: "掌握Prompt设计原则，让AI输出更精准",
    goal: "掌握Prompt的典型构成和设计技巧，能编写高质量的提示词，完成会议纪要整理实战。",
    points: [
      "Prompt的典型构成：角色+任务+上下文+输出格式",
      "清晰表达需求的技巧：具体、明确、避免歧义",
      "常见错误与避坑指南：模糊指令、信息不足、期望过高",
      "Few-shot示例提示法：给AI看例子再让它做",
      "实战：用AI整理会议纪要"
    ],
    videos: [
      {title: "Prompt提示词工程入门 - 让AI听懂人话", bvid: "BV1hjA5zUE9r", page: 1, knowledge: [
        "Prompt本质：给AI的任务说明书，越详细输出越准确",
        "四大要素：①角色设定（你是XX专家）②任务描述（请完成XX）③上下文信息（背景资料）④输出格式（表格/列表/段落）",
        "角色设定技巧：给AI明确身份，如「你是一位资深产品经理」",
        "任务描述原则：用动词开头，明确动作，如「请总结」「请分析」「请改写」",
        "上下文提供：给足背景信息，AI不知道你没说的内容",
        "输出格式指定：「请用表格形式」「请分点列出」「请用JSON格式」",
        "常见错误：太模糊（「帮我写点东西」）、信息不足（没给背景）、期望过高（让AI做它做不到的事）",
        "迭代优化：第一次输出不满意→指出问题→让AI重新生成"
      ]},
      {title: "ChatGPT高级提示词技巧", bvid: "BV1J3wvzSEFj", page: 1, knowledge: [
        "Few-shot提示：给2-3个示例，AI模仿格式输出，如「例1...例2...现在请处理第3个」",
        "Zero-shot提示：不给示例直接下指令，适合简单任务",
        "Chain of Thought（思维链）：让AI「请一步步思考」，提高复杂问题准确率",
        "分隔符使用：用```、---、###等分隔不同部分，避免混淆",
        "负向提示：明确告诉AI「不要做什么」，如「不要使用专业术语」",
        "模板化Prompt：把常用Prompt存为模板，替换变量即可复用",
        "系统提示vs用户提示：系统提示设定行为准则，用户提示是具体任务",
        "实战案例：会议纪要整理Prompt模板"
      ]}
    ]
  },
  {
    day: 3,
    title: "ChatGPT高级功能",
    desc: "掌握Canvas/代码解释器/文件上传等高级功能",
    goal: "掌握ChatGPT的Canvas、代码解释器、文件上传等高级功能，能用AI分析Excel数据并生成图表。",
    points: [
      "Canvas功能：实时编辑代码/文档，所见即所得",
      "代码解释器（Code Interpreter）：执行Python代码、数据分析",
      "文件上传：支持PDF/Excel/图片等多种格式",
      "自定义指令（Custom Instructions）：设定AI的默认行为",
      "实战：用AI分析Excel数据并生成图表"
    ],
    videos: [
      {title: "ChatGPT Canvas功能教程 - 写作编码效率倍增", bvid: "BV1r5ykYzEEF", page: 1, knowledge: [
        "Canvas是什么：ChatGPT的实时编辑面板，可直接修改代码/文档",
        "Canvas触发：让AI「用Canvas编辑」或自动出现在代码/写作任务中",
        "Canvas优势：不用复制粘贴，直接在右侧面板修改，AI实时同步",
        "代码编辑：高亮显示、语法检查、一键运行",
        "文档编辑：实时预览格式修改效果",
        "版本对比：修改前后差异高亮显示",
        "适用场景：长文档写作、代码调试、格式调整",
        "注意事项：Canvas目前仅支持部分模型和Plus用户"
      ]},
      {title: "ChatGPT代码解释器使用教程", bvid: "BV1kP411z7yt", page: 1, knowledge: [
        "代码解释器是什么：ChatGPT内置的Python执行环境",
        "功能：执行代码、数据分析、文件生成、图表绘制",
        "上传文件：支持CSV/Excel/PDF/图片等，最大512MB",
        "数据分析流程：上传→AI自动分析→生成报告/图表→下载结果",
        "代码可见性：可展开查看AI写的Python代码，学习编程思路",
        "文件输出：AI可生成Excel/PDF/图片等文件供下载",
        "沙盒环境：代码在隔离环境运行，不影响你的电脑",
        "实战案例：上传销售数据→AI分析趋势→生成柱状图→导出Excel报告"
      ]}
    ]
  },
  {
    day: 4,
    title: "AI辅助编程入门",
    desc: "用ChatGPT辅助编写简单Python程序",
    goal: "掌握用自然语言描述编程需求的技巧，能用ChatGPT辅助编写和调试Python程序。",
    points: [
      "Python基础语法：变量/循环/函数",
      "如何用自然语言描述编程需求",
      "代码调试与错误修复",
      "代码解释与优化建议",
      "实战：用AI写一个计算器程序"
    ],
    videos: [
      {title: "零基础学Python - 用ChatGPT辅助编程", bvid: "BV1h9Tv6BEDy", page: 1, knowledge: [
        "Python为什么适合AI辅助：语法简洁、生态丰富、AI训练数据多",
        "变量：存储数据的容器，如 name = \"张三\"，age = 25",
        "数据类型：字符串(str)、整数(int)、浮点数(float)、列表(list)、字典(dict)",
        "条件判断：if/elif/else，如 if age >= 18: print(\"成年\")",
        "循环：for循环（遍历）、while循环（条件），如 for i in range(5): print(i)",
        "函数：def 函数名(参数):，封装可复用代码块",
        "如何向AI描述需求：说清楚输入是什么、输出要什么、中间要做什么",
        "代码运行环境：本地Python/在线编辑器（Replit/Google Colab）"
      ]},
      {title: "AI编程入门：让ChatGPT帮你写代码", bvid: "BV1VUDAYvE6a", page: 1, knowledge: [
        "描述需求的技巧：①目标明确 ②举例说明 ③给出约束",
        "好例子：「请写一个Python函数，输入两个数字，返回它们的和。如果输入不是数字，返回错误提示」",
        "坏例子：「帮我写个代码」（太模糊）",
        "代码调试：把错误信息完整复制给AI，AI会告诉你哪里错了",
        "常见错误类型：SyntaxError（语法错误）、TypeError（类型错误）、NameError（变量未定义）",
        "代码解释：让AI「请逐行解释这段代码」，帮助理解",
        "代码优化：让AI「请优化这段代码，使其更简洁/更高效」",
        "实战：计算器程序完整开发流程（需求→代码→测试→优化）"
      ]}
    ]
  },
  {
    day: 5,
    title: "Codex代码生成实战",
    desc: "掌握ChatGPT Codex的代码生成能力",
    goal: "掌握Codex的工作原理和代码生成技巧，能用AI完成网页爬虫等中等复杂度编程任务。",
    points: [
      "Codex的工作原理",
      "如何描述编程任务（输入/输出/约束）",
      "多方案生成与选择最优解",
      "代码重构与优化",
      "实战：用AI写一个网页爬虫"
    ],
    videos: [
      {title: "OpenAI Codex 代码生成教程", bvid: "BV1VJVZ6XEzg", page: 1, knowledge: [
        "Codex是什么：OpenAI专门训练的代码生成模型，基于GPT但针对代码优化",
        "Codex训练数据：GitHub上的公开代码，支持12+编程语言",
        "Codex vs GPT：Codex更擅长代码，GPT更擅长对话，现在已整合到GPT-4中",
        "代码生成流程：描述需求→AI生成代码→人工审查→测试运行→反馈修正",
        "需求描述模板：①功能目标 ②输入格式 ③输出格式 ④边界条件 ⑤性能要求",
        "多语言支持：Python/JavaScript/Java/C++/Go/Ruby/PHP/SQL等",
        "代码风格：可指定PEP8/Google Style等编码规范",
        "局限性：复杂业务逻辑可能出错，必须人工审查"
      ]},
      {title: "ChatGPT编程实战 - 从需求到代码", bvid: "BV1K7FWzFEjk", page: 1, knowledge: [
        "多方案生成：让AI「请给出3种不同的实现方式」，对比选择最优",
        "方案对比维度：代码简洁度、执行效率、可读性、扩展性",
        "代码重构：让AI「请用面向对象方式重构」「请添加注释」「请提取为函数」",
        "单元测试：让AI「请为这段代码写单元测试」",
        "网页爬虫基础：requests库获取网页、BeautifulSoup解析HTML",
        "爬虫伦理：遵守robots.txt、控制请求频率、不爬取隐私数据",
        "实战完整流程：需求分析→AI生成代码→本地测试→错误修复→功能完善",
        "调试技巧：print()打印中间结果、用AI解释报错信息、逐步缩小问题范围"
      ]}
    ]
  },
  {
    day: 6,
    title: "AI辅助开发工具链",
    desc: "掌握AI编程IDE（Cursor/Copilot）的使用",
    goal: "掌握Cursor编辑器和GitHub Copilot的使用，能用AI辅助工具完成Todo List应用开发。",
    points: [
      "Cursor编辑器安装与配置",
      "代码自动补全与生成",
      "对话式编程（Chat with Codebase）",
      "代码审查与重构建议",
      "实战：用Cursor开发一个Todo List应用"
    ],
    videos: [
      {title: "Cursor AI编辑器教程 - 比Copilot更强大", bvid: "BV13hoXYQEss", page: 1, knowledge: [
        "Cursor是什么：基于VS Code的AI编辑器，深度集成GPT-4",
        "安装：官网下载（cursor.sh），支持Windows/Mac/Linux",
        "与VS Code区别：内置AI、支持代码库索引、对话式编程",
        "代码补全：Tab键接受AI建议，比Copilot更智能",
        "Cmd+K：选中代码后按Cmd+K，让AI修改/解释/优化",
        "Chat with Codebase：AI能理解整个项目上下文，不只是当前文件",
        "代码库索引：Cursor会索引你的项目，回答时参考全局代码",
        "配置：设置API Key、选择模型、配置代码风格"
      ]},
      {title: "GitHub Copilot 使用教程", bvid: "BV1MNRgYXEhc", page: 1, knowledge: [
        "Copilot是什么：GitHub和OpenAI合作的AI编程助手",
        "安装：VS Code扩展市场搜索「GitHub Copilot」安装",
        "代码补全：灰色文字显示建议，Tab接受，Esc拒绝",
        "Copilot Chat：侧边栏对话，可问代码问题、让AI写代码",
        "Copilot Workspace：自然语言描述需求，AI生成完整代码",
        "免费vs付费：学生免费，个人版$10/月，企业版$19/月",
        "Cursor vs Copilot：Cursor更深度集成AI，Copilot更轻量",
        "实战：用Cursor从零开发Todo List应用（需求→设计→编码→测试）"
      ]}
    ]
  },
  {
    day: 7,
    title: "什么是Agent - 项目组成详解",
    desc: "理解Agent概念，掌握Agent项目的核心组成",
    goal: "理解Agent的定义和核心特征，掌握Agent项目的四大核心组件，能拆解客服Agent的完整架构。",
    points: [
      "Agent的定义与核心特征",
      "Agent vs 普通对话的区别",
      "Agent项目四大核心组件：大脑/记忆/工具/规划器",
      "ReAct框架（Reasoning + Acting）",
      "案例拆解：客服Agent的完整架构"
    ],
    videos: [
      {title: "AI Agent 是什么？3分钟看懂智能体", bvid: "BV1r1ud6HEd1", page: 1, knowledge: [
        "Agent定义：能自主感知环境、做出决策、执行动作的智能系统",
        "Agent vs 普通对话：普通对话=你问我答；Agent=能主动调用工具、执行任务、记住上下文",
        "Agent核心特征：①自主性 ②工具使用 ③记忆能力 ④规划能力",
        "Agent的典型应用：客服机器人、数据分析助手、自动化办公、代码生成",
        "Agent不是万能的：复杂决策仍需人工介入",
        "Agent开发趋势：从单工具到多工具、从单Agent到多Agent协作",
        "ReAct框架：Reasoning（推理）+ Acting（行动）交替进行",
        "Agent开发门槛：现在用LangChain等框架，非程序员也能搭建简单Agent"
      ]},
      {title: "Agent项目架构详解 - 从概念到实现", bvid: "BV1ndQEBEEtZ", page: 1, knowledge: [
        "Agent四大核心组件：①大脑（LLM）②记忆系统 ③工具集 ④规划器",
        "大脑（LLM）：负责理解意图、推理决策、生成回复，通常用GPT-4/Claude",
        "记忆系统：短期记忆（当前对话历史）/长期记忆（向量数据库存储历史知识）",
        "工具集：API调用（天气/搜索/邮件）、代码执行、文件操作、数据库查询",
        "规划器：任务分解（把大任务拆成小步骤）、条件判断（如果A则B否则C）、循环执行",
        "Agent工作流程：接收任务→规划步骤→调用工具→整合结果→输出回复",
        "案例：客服Agent架构→用户提问→检索知识库→调用订单API→生成回复",
        "开发框架：LangChain（Python/JS）、AutoGen（多Agent）、CrewAI（团队协作）"
      ]}
    ]
  },
  {
    day: 8,
    title: "Agent开发实战 - 搭建基础框架",
    desc: "用Python + LangChain搭建Agent基础框架",
    goal: "掌握LangChain框架的基本使用，能用Python搭建一个具有工具调用能力的天气查询Agent。",
    points: [
      "LangChain框架简介与安装",
      "Agent核心代码结构",
      "添加工具（搜索API/计算器/文件读写）",
      "对话记忆实现",
      "实战：制作一个天气查询Agent"
    ],
    videos: [
      {title: "用Python实现AI Agent教程", bvid: "BV1wJQ1BZEWQ", page: 1, knowledge: [
        "LangChain是什么：最流行的Agent开发框架，支持Python和JavaScript",
        "安装：pip install langchain langchain-openai",
        "核心概念：Chain（链）、Agent（智能体）、Tool（工具）、Memory（记忆）",
        "最小Agent代码：5行代码就能跑起来（导入→配置LLM→定义工具→创建Agent→运行）",
        "OpenAI API配置：需要API Key，按token计费",
        "替代方案：如果没API Key，可用ChatGPT网页版手动模拟Agent流程",
        "Agent类型：Zero-shot ReAct、Conversational、Plan-and-Execute",
        "调试技巧：打印Agent的思考过程（Thought→Action→Observation）"
      ]},
      {title: "LangChain入门 - 构建AI应用", bvid: "BV1j4EczbEGw", page: 1, knowledge: [
        "Tool定义：用@tool装饰器或Tool类定义，指定名称、描述、执行函数",
        "内置工具：DuckDuckGo搜索、计算器、Python REPL、文件读写",
        "自定义工具：任何Python函数都能包装成Agent工具",
        "Memory类型：ConversationBufferMemory（完整历史）、ConversationSummaryMemory（摘要）",
        "Prompt模板：用PromptTemplate定义Agent的系统提示词",
        "AgentExecutor：运行Agent的核心类，接收输入、返回输出",
        "天气查询Agent完整代码：定义天气API工具→创建Agent→测试查询",
        "常见错误：API Key无效、工具描述不清、循环调用"
      ]}
    ]
  },
  {
    day: 9,
    title: "Agent进阶 - 多步工作流与知识库",
    desc: "开发具有多步工作流和知识库的Agent",
    goal: "掌握多步任务分解和知识库RAG技术，能制作一个自动化办公Agent。",
    points: [
      "多步任务分解与执行流程",
      "条件分支与循环逻辑",
      "向量数据库（ChromaDB/Pinecone）简介",
      "知识库RAG（检索增强生成）",
      "实战：制作一个自动化办公Agent（能查文档+发邮件）"
    ],
    videos: [
      {title: "AI Agent 进阶教程 - 多步工作流", bvid: "BV1Zf4jzcEp9", page: 1, knowledge: [
        "多步工作流：把复杂任务拆成多个子任务，按顺序执行",
        "条件分支：根据上一步结果决定下一步动作（if-else逻辑）",
        "循环执行：重复执行某步骤直到满足条件（while逻辑）",
        "错误处理：某步失败时的重试机制和降级策略",
        "工作流可视化：用流程图设计Agent执行路径",
        "LangChain Expression Language (LCEL)：声明式工作流语法",
        "并行执行：多个独立任务可同时执行提升效率",
        "实战案例：邮件处理Agent→读取邮件→分类→回复/转发/归档"
      ]},
      {title: "给Agent添加知识库与记忆", bvid: "BV1obuu62EbU", page: 1, knowledge: [
        "RAG是什么：Retrieval-Augmented Generation（检索增强生成）",
        "RAG流程：用户提问→检索相关知识→拼接Prompt→LLM生成回答",
        "向量数据库：ChromaDB（本地）、Pinecone（云端）、FAISS（Facebook开源）",
        "文本分块（Chunking）：把长文档切成小块，每块500-1000字",
        "Embedding：把文本转换为向量，用于相似度搜索",
        "知识库构建：上传PDF/Word/Markdown→分块→Embedding→存入向量库",
        "检索策略：相似度搜索、MMR（最大边际相关性）、混合搜索",
        "实战：给客服Agent添加产品手册知识库"
      ]}
    ]
  },
  {
    day: 10,
    title: "综合项目实战 - 完整Agent开发",
    desc: "完成一个完整的Agent项目",
    goal: "完成一个完整的Agent项目，掌握从需求分析到部署的完整流程。",
    points: [
      "项目需求分析与架构设计",
      "完整开发流程（需求→设计→编码→测试）",
      "Agent调试与优化技巧",
      "部署方案（本地运行/云端部署）",
      "综合实战：完成一个完整Agent项目并发布"
    ],
    videos: [
      {title: "AI Agent 完整项目实战 - 从0到1", bvid: "BV1NPuq6BEAU", page: 1, knowledge: [
        "项目选择：选一个你熟悉的场景（如个人助手、数据分析、内容创作）",
        "需求分析：明确Agent要解决什么问题、输入输出是什么",
        "架构设计：画流程图，确定需要哪些工具、什么记忆、怎么规划",
        "分步开发：先做核心功能，再加次要功能，最后优化体验",
        "测试用例：准备10个典型问题，验证Agent回答准确性",
        "常见陷阱：工具调用失败、记忆丢失、无限循环、幻觉输出",
        "优化技巧：改进Prompt、添加工具、调整温度参数、增加重试逻辑",
        "项目示例：研究助手Agent（搜索论文→总结→生成报告）"
      ]},
      {title: "如何部署和分享你的Agent", bvid: "BV1Pwgr6JEBr", page: 1, knowledge: [
        "本地运行：Python脚本直接运行，适合个人使用",
        "云端部署：Render/Railway/Vercel，适合Web服务",
        "API封装：用Fast",
        "交互界面：用Streamlit或Gradio快速搭建可视化页面，方便演示与使用",
        "发布分享：把Agent项目上传GitHub、部署到云平台后分享链接给同事",
        "上线检查：部署后测试API响应、错误日志与资源占用，确保稳定运行",
        "注意事项：云端部署注意环境变量与密钥安全，不要把API Key写死在代码里"
      ]}
    ]
  }
    ]
  };
  window.LearningModules = window.LearningModules || {};
  window.LearningModules[module.id] = module;
})();
