// 创建右键菜单
chrome.runtime.onInstalled.addListener(() => {
    // 创建右键菜单
    chrome.contextMenus.create({
        id: 'analyzeText',
        title: '分析选中文本',
        contexts: ['selection']
    });

    // 重置tokens相关设置
    chrome.storage.sync.remove(['maxTokens', 'maxInputTokens'], () => {
        // 设置新的默认值
        chrome.storage.sync.set({
            maxTokens: 8192,
            maxInputTokens: 8192
        });
    });
});

// 处理右键菜单点击
chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === 'analyzeText') {
        chrome.tabs.sendMessage(tab.id, { action: 'toggle-analysis' });
    }
});

// 处理快捷键命令
chrome.commands.onCommand.addListener((command) => {
    if (command === 'toggle-analysis') {
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            if (tabs[0]) {
                chrome.tabs.sendMessage(tabs[0].id, { action: 'toggle-analysis' });
            }
        });
    }
});

// AI分析处理函数
import prompt from '../utils/prompt.js';

async function analyzeText(text, settings) {
    // 默认设置
    const defaultSettings = {
        temperature: 0.7,
        max_tokens: 8192,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
    };

    try {
        const response = await fetch(`${settings.apiEndpoint}/chat/completions`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${settings.apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: settings.selectedModel,
                messages: [
                    {
                        role: "system",
                        content: prompt
                    },
                    {
                        role: "user",
                        content: text
                    }
                ],
                ...defaultSettings,  // 使用默认设置
                max_tokens: 8192  // 强制设置最大tokens
            })
        });

        if (!response.ok) {
            throw new Error('API请求失败');
        }

        const data = await response.json();
        const analysis = data.choices[0].message.content;

        // 直接返回完整的分析结果
        return {
            success: true,
            data: analysis
        };
    } catch (error) {
        return {
            success: false,
            error: error.message
        };
    }
}

// 响应content script的分析请求
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'analyzeText') {
        chrome.storage.sync.get([
            'apiEndpoint',
            'apiKey',
            'selectedModel'
        ], async (settings) => {
            const result = await analyzeText(request.text, settings);
            sendResponse(result);
        });
        return true; // 保持消息通道打开
    }
});
