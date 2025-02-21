# AI Web Novel Analyzer 中文网文AI写作成分检测工具

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
![Version](https://img.shields.io/badge/version-1.0.0-brightgreen)

一个专业的浏览器扩展，用于检测和分析中文网络小说中可能存在的 AI 生成内容。通过多维度分析，为读者提供内容的真实性参考。

## ✨ 主要特性

- 🔍 **多维度分析**: 从语言风格、修辞手法、情节结构等多个角度进行全面检测
- 🎯 **精确评估**: 为每个维度提供详细的分析说明和概率评分
- 🚀 **便捷操作**: 支持右键菜单和快捷键（Alt+Q）快速启动分析
- ⚙️ **高度自定义**: 可调整 API 设置和分析参数，满足不同需求
- 💫 **优雅界面**: 简洁直观的交互设计和动画效果

## 📖 目录结构

```
AI-Web-Novel-Analyzer/
├── assets/                 # 静态资源文件
│   ├── icon16.png         # 扩展图标（16x16）
│   ├── icon48.png         # 扩展图标（48x48）
│   └── icon128.png        # 扩展图标（128x128）
├── background/            # 后台脚本
│   └── background.js      # 处理 API 请求和扩展事件
├── content/              # 内容脚本
│   ├── content.js       # 处理页面交互和结果显示
│   └── sidebar.css      # 侧边栏样式
├── options/             # 设置页面
│   ├── options.html     # 设置页面 HTML
│   ├── options.js       # 设置页面逻辑
│   └── options.css      # 设置页面样式
├── popup/               # 弹出窗口
│   ├── popup.html      # 弹出窗口 HTML
│   ├── popup.js        # 弹出窗口逻辑
│   └── popup.css       # 弹出窗口样式
├── utils/              # 工具函数
│   ├── api-service.js  # API 服务封装
│   └── prompt.js       # 分析提示词模板
├── manifest.json       # 扩展清单文件
└── README.md          # 项目说明文档
```

## 🛠️ 核心功能说明

### 内容分析维度

1. **语言风格与语气**
   - 检测机械化、公式化表达
   - 分析情感自然度和个性化程度

2. **修辞手法分析**
   - 评估比喻、拟人等修辞的自然度
   - 检查是否存在生硬或过度堆砌现象

3. **情节结构评估**
   - 分析情节推进的合理性
   - 检测逻辑连贯性和过渡自然度

4. **内容深度分析**
   - 评价细节描写的丰富程度
   - 判断内容实质性和信息密度

5. **人物塑造检测**
   - 分析人物性格的立体度
   - 评估对话的真实性和个性化程度

### 文件功能说明

- **background.js**: 处理 API 请求、维护扩展状态、管理右键菜单和快捷键
- **content.js**: 注入页面的脚本，处理用户选择和分析结果展示
- **sidebar.css**: 定义分析结果侧边栏的样式和动画效果
- **prompt.js**: 包含详细的分析提示词，指导 AI 进行多维度分析
- **api-service.js**: 封装 API 调用相关功能
- **options/**: 提供扩展配置界面，包括 API 设置和模型选择
- **popup/**: 提供快捷参数调整功能，如温度和采样概率等

## 🚀 使用方法

1. **安装扩展**
   - 下载本项目代码
   - 打开 Chrome 扩展管理页面 `chrome://extensions/`
   - 启用开发者模式
   - 点击"加载已解压的扩展"，选择项目文件夹

2. **配置 API**
   - 点击扩展图标，进入设置页面
   - 填写 API 地址和密钥
   - 选择合适的分析模型

3. **使用分析功能**
   - 选择要分析的文本
   - 右键选择"分析选中文本"或使用快捷键 Alt+Q
   - 在右侧边栏查看分析结果

## ⚙️ 开发说明

### API 支持
- 支持 OpenAI API 接口格式
- 推荐模型: Gemini-2.0-Flash（已经过测试）
- 其他兼容模型: GPT-3.5 及更高版本
- API 需要支持至少 8192 tokens 的输入和输出

### 模型测试记录
使用 Gemini-2.0-Flash API 进行了大量的检测效果测试和优化，确保了分析结果的准确性和实用性。

### 本地开发
1. 克隆仓库
```bash
git clone https://github.com/yourusername/AI-Web-Novel-Analyzer.git
```

2. 修改代码后重新加载扩展
- 在扩展管理页面点击刷新按钮
- 或重启浏览器

### 注意事项
- API 密钥请妥善保管，避免泄露
- 建议使用私有部署的 API 服务
- 分析结果仅供参考，需要结合具体场景判断

## 📄 许可证

本项目遵循 MIT 许可证。详情请参阅 [LICENSE](LICENSE) 文件。

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request。在贡献代码前，请确保：

1. 代码风格符合项目规范
2. 新功能有充分的测试
3. 提交信息清晰明了
4. 更新相关文档

## 👥 制作团队

### 项目管理
- 作者: 小白

### 核心开发
- 主程序员: Claude-3.5-Sonnet
- 架构设计: DeepSeek-R1 
- 技术顾问: Gemini-2.0-Flash-Thinking-Exp
- 开发支持: ChatGPT O3-Mini

### AI 模型支持
- 检测引擎: Gemini-2.0-Flash
- 代码助手: GitHub Copilot
- 开发工具: Cline
- 图标生成: ChatGPT-4o + DALL·E 3

## 📊 版本历史

- v1.0.0 (2025-02-21)
  - 首次发布
  - 实现基础分析功能
  - 支持快捷键和右键菜单
  - 添加自定义 API 设置

---

如有问题或建议，欢迎提出 Issue 或 PR。感谢您的关注！
