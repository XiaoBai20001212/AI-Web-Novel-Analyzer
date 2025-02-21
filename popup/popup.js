let configuredSection;
let notConfiguredSection;

// 初始化页面元素
document.addEventListener('DOMContentLoaded', async () => {
    configuredSection = document.getElementById('configured');
    notConfiguredSection = document.getElementById('not-configured');
    
    // 检查API配置状态
    const settings = await chrome.storage.sync.get([
        'apiEndpoint',
        'apiKey',
        'temperature',
        'topP',
        'maxTokens',
        'maxInputTokens'
    ]);

    if (settings.apiEndpoint && settings.apiKey) {
        showConfiguredUI(settings);
    } else {
        showNotConfiguredUI();
    }

    // 绑定事件监听器
    bindEventListeners();
});

// 显示已配置界面
function showConfiguredUI(settings) {
    notConfiguredSection.style.display = 'none';
    configuredSection.style.display = 'block';

    // 设置滑块和输入框的值
    const elements = {
        temperature: document.getElementById('temperature'),
        topP: document.getElementById('topP'),
        maxTokens: document.getElementById('maxTokens'),
        maxInputTokens: document.getElementById('maxInputTokens')
    };

    elements.temperature.value = settings.temperature || 0.7;
    elements.topP.value = settings.topP || 1.0;
    elements.maxTokens.value = settings.maxTokens || 8192;
    elements.maxInputTokens.value = settings.maxInputTokens || 8192;

    // 更新显示的值
    updateDisplayValues();
}

// 显示未配置界面
function showNotConfiguredUI() {
    configuredSection.style.display = 'none';
    notConfiguredSection.style.display = 'block';
}

// 更新显示的值
function updateDisplayValues() {
    document.getElementById('temperatureValue').textContent = 
        document.getElementById('temperature').value;
    document.getElementById('topPValue').textContent = 
        document.getElementById('topP').value;
}

// 绑定事件监听器
function bindEventListeners() {
    // 滑块值更新事件
    ['temperature', 'topP'].forEach(id => {
        const element = document.getElementById(id);
        element.addEventListener('input', updateDisplayValues);
    });

    // 保存设置
    document.getElementById('saveSettings').addEventListener('click', async () => {
        const settings = {
            temperature: parseFloat(document.getElementById('temperature').value),
            topP: parseFloat(document.getElementById('topP').value),
            maxTokens: parseInt(document.getElementById('maxTokens').value),
            maxInputTokens: parseInt(document.getElementById('maxInputTokens').value)
        };

        await chrome.storage.sync.set(settings);
        window.close();
    });

    // 打开选项页面
    ['goToOptions', 'openOptions'].forEach(id => {
        document.getElementById(id)?.addEventListener('click', () => {
            chrome.runtime.openOptionsPage();
        });
    });
}
