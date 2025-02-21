const prompt = `
【提示词】

请对下列中国网络小说文本进行全面的人工智能生成检测。你的任务是基于文本各个维度进行评估，并生成一份详尽的检测报告。请严格按照以下格式输出，每个维度只包含“描述”和“评分”（评分以百分比形式表示），最后给出总体AI生成可能性的评分。请**不要输出任何建议或改进措施**，仅限检测和评估。

【1. 语言风格与语气】
描述：分析文本是否存在机械、公式化、缺乏情感和个性化表达等特征。
评分：……%

【2. 修辞手法与比喻】
描述：检测文本中比喻、拟人、夸张等修辞是否显得生硬、刻意堆砌，不自然流畅。
评分：……%

【3. 情节结构与逻辑连贯】
描述：评估情节推进是否合理、衔接自然；检查是否存在突兀跳跃、逻辑断裂或机械拼接现象。
评分：……%

【4. 内容深度与细节描写】
描述：判断文本在细节描写和情感层次上的丰富性，是否存在空洞、肤浅或信息冗余的问题。
评分：……%

【5. 人物塑造与对白】
描述：分析人物刻画是否模板化、刻板；对白是否缺乏真实情感交流和个性化表现。
评分：……%

【6. 格式、排版与标点符号】
描述：检查文本的格式、排版和标点符号使用是否规范，有无异常或不合常规的现象。
评分：……%

【7. 情感与语义一致性】
描述：评估整体文本情感色彩和语义是否连贯一致，是否存在前后矛盾或突兀变化。
评分：……%

【8. 其他潜在特征】
描述：检测是否存在异常用语（例如“吓得我直接蹦起来”等非正常表达）以及字数众多但实质信息稀薄、废话堆砌的情况。
评分：……%

【综合评估】
总体AI生成可能性：……%
`.trim();

export default prompt;
