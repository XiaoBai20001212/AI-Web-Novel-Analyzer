// 存储设置项
let settings = {
    apiEndpoint: '',
    apiKey: '',
    selectedModel: '',
    shortcut: 'Alt+Q'
};

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    loadSettings();
    initializeEventListeners();
});


// 加载保存的设置
function loadSettings() {
    chrome.storage.sync.get([
        'apiEndpoint',
        'apiKey',
        'selectedModel',
        'shortcut'
    ], (result) => {
        settings = { ...settings, ...result };

        // 填充表单
        document.getElementById('apiEndpoint').value = settings.apiEndpoint || '';
        document.getElementById('apiKey').value = settings.apiKey || '';
        document.getElementById('currentShortcut').textContent = settings.shortcut || 'Alt+Q';

       if (settings.selectedModel) {
            const modelSelect = document.getElementById('model');
            modelSelect.innerHTML = `<option value="${settings.selectedModel}">${settings.selectedModel}</option>`;
            // Display selected model name
            document.getElementById('currentModelName').textContent = `当前模型: ${settings.selectedModel}`;
        }
    });
}

// 初始化事件监听
function initializeEventListeners() {
    // 保存设置按钮
    document.getElementById('saveSettings').addEventListener('click', saveSettings);

    // 测试连接按钮
    document.getElementById('testConnection').addEventListener('click', testConnection);

    // 检测模型按钮
    document.getElementById('detectModels').addEventListener('click', detectAvailableModels);

    // 修改快捷键按钮
    document.getElementById('changeShortcut').addEventListener('click', startShortcutCapture);

    // 切换密码可见性
    document.querySelector('.toggle-password').addEventListener('click', togglePasswordVisibility);

    // 关闭状态消息
    document.querySelector('.close-status').addEventListener('click', () => {
        document.getElementById('status').classList.remove('show');
    });
}

// 保存设置
async function saveSettings() {
    const newSettings = {
        apiEndpoint: document.getElementById('apiEndpoint').value,
        apiKey: document.getElementById('apiKey').value,
        selectedModel: document.getElementById('model').value,
        shortcut: document.getElementById('currentShortcut').textContent
    };

    try {
        await chrome.storage.sync.set(newSettings);
        showStatus('设置已保存', 'success');
    } catch (error) {
        showStatus('保存设置失败: ' + error.message, 'error');
    }
}

// 测试API连接
async function testConnection() {
    const endpoint = document.getElementById('apiEndpoint').value;
    const apiKey = document.getElementById('apiKey').value;

    if (!endpoint || !apiKey) {
        showStatus('请先填写API地址和密钥', 'error');
        return;
    }

    try {
        const response = await fetch(`${endpoint}/models`, {
            headers: {
                'Authorization': `Bearer ${apiKey}`
            }
        });

        if (response.ok) {
            showStatus('连接测试成功', 'success');
        } else {
            throw new Error('API响应错误');
        }
    } catch (error) {
        showStatus('连接测试失败: ' + error.message, 'error');
    }
}

// 检测可用模型
async function detectAvailableModels() {
    const endpoint = document.getElementById('apiEndpoint').value;
    const apiKey = document.getElementById('apiKey').value;

    if (!endpoint || !apiKey) {
        showStatus('请先填写API地址和密钥', 'error');
        return;
    }

    try {
        const response = await fetch(`${endpoint}/models`, {
            headers: {
                'Authorization': `Bearer ${apiKey}`
            }
        });

        if (!response.ok) throw new Error('获取模型列表失败');

        const data = await response.json();
        const modelSelect = document.getElementById('model');
        modelSelect.innerHTML = data.data
            .map(model => `<option value="${model.id}">${model.id}</option>`)
            .join('');

        showStatus('已更新可用模型列表', 'success');
    } catch (error) {
        showStatus('获取模型列表失败: ' + error.message, 'error');
    }
}

// 开始捕获快捷键
function startShortcutCapture() {
    const shortcutDisplay = document.getElementById('currentShortcut');
    const originalText = shortcutDisplay.textContent;
    shortcutDisplay.textContent = '请按下新的快捷键...';
    shortcutDisplay.style.color = 'var(--primary-color)';

    const captureHandler = (e) => {
        e.preventDefault();
        const keys = [];
        if (e.ctrlKey) keys.push('Ctrl');
        if (e.altKey) keys.push('Alt');
        if (e.shiftKey) keys.push('Shift');
        if (e.key.toUpperCase() !== 'CONTROL' && 
            e.key.toUpperCase() !== 'ALT' && 
            e.key.toUpperCase() !== 'SHIFT') {
            keys.push(e.key.toUpperCase());
        }

        if (keys.length > 0) {
            const newShortcut = keys.join('+');
            shortcutDisplay.textContent = newShortcut;
            shortcutDisplay.style.color = '';
            document.removeEventListener('keydown', captureHandler);
            
            // 更新快捷键设置
            chrome.commands.update({
                name: 'toggle-analysis',
                shortcut: newShortcut
            });
        }
    };

    document.addEventListener('keydown', captureHandler);
}

// 切换密码可见性
function togglePasswordVisibility() {
    const passwordInput = document.getElementById('apiKey');
    const eyeIcon = document.querySelector('.eye-icon');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eyeIcon.textContent = '👁️';
    } else {
        passwordInput.type = 'password';
        eyeIcon.textContent = '👁️‍🗨️';
    }
}

// 显示状态消息
function showStatus(message, type = 'success') {
    const statusElement = document.getElementById('status');
    const statusText = statusElement.querySelector('.status-text');
    
    statusElement.className = 'status-message';
    statusElement.classList.add(type);
    statusElement.classList.add('show');
    statusText.textContent = message;
    
    // 3秒后自动隐藏
    setTimeout(() => {
        statusElement.classList.remove('show');
    }, 3000);
}
