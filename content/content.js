let sidebar = null;
let isOpen = false;

// 创建侧边栏
function createSidebar() {
    sidebar = document.createElement('div');
    sidebar.id = 'ai-analyzer-sidebar';
    sidebar.innerHTML = `
        <div class="sidebar-header">
            <h2>AI 分析结果</h2>
            <button class="close-btn">×</button>
        </div>
        <div class="sidebar-content">
            <div class="loading-spinner" style="display: none;">
                <div class="spinner"></div>
                <div class="loading-text">分析中...</div>
            </div>
            <div class="result-container"></div>
        </div>
    `;
    
    document.body.appendChild(sidebar);
    
    // 绑定关闭按钮事件
    sidebar.querySelector('.close-btn').addEventListener('click', toggleSidebar);
}

// 切换侧边栏显示状态
function toggleSidebar() {
    if (!sidebar) createSidebar();
    isOpen = !isOpen;
    sidebar.classList.toggle('visible', isOpen);
    
    // 添加动画效果
    if (isOpen) {
        setTimeout(() => {
            document.querySelectorAll('.result-section').forEach((section, index) => {
                setTimeout(() => {
                    section.classList.add('animate');
                }, index * 100);
            });
        }, 300);
    }
}

// 获取选中的文本
function getSelectedText() {
    return window.getSelection().toString().trim();
}

// 显示分析结果
function showResult(result) {
    const container = sidebar.querySelector('.result-container');
    const loadingSpinner = sidebar.querySelector('.loading-spinner');
    
    loadingSpinner.style.display = 'none';
    
    // 创建DocumentFragment提升性能
    const fragment = document.createDocumentFragment();
    
    // 直接显示完整分析报告
    const lines = result.split('\n');
    let currentSection = null;
    
    lines.forEach(line => {
        if (line.startsWith('【') || line === '') {
            if (currentSection) {
                fragment.appendChild(currentSection);
            }
            if (line === '') return;
            
            currentSection = document.createElement('div');
            currentSection.className = 'result-section';
            
            const title = document.createElement('h3');
            title.textContent = line.replace(/【|】/g, '');
            currentSection.appendChild(title);
            
        } else if (currentSection && line.trim()) {
            const content = document.createElement('p');
            content.textContent = line.trim();
            currentSection.appendChild(content);
        }
    });
    
    if (currentSection) {
        fragment.appendChild(currentSection);
    }
    
    // 清空容器并添加新内容
    container.innerHTML = '';
    container.appendChild(fragment);
    
    // 确保内容可见
    requestAnimationFrame(() => {
        container.querySelectorAll('.result-section').forEach((section, index) => {
            setTimeout(() => {
                section.classList.add('animate');
            }, index * 150);
        });
    });
}

// 开始分析
async function startAnalysis() {
    const selectedText = getSelectedText();
    if (!selectedText) {
        alert('请先选择要分析的文本');
        return;
    }

    if (!sidebar) createSidebar();
    if (!isOpen) toggleSidebar();

    const loadingSpinner = sidebar.querySelector('.loading-spinner');
    loadingSpinner.style.display = 'block';
    sidebar.querySelector('.result-container').innerHTML = '';

    // 发送消息给background脚本进行分析
    chrome.runtime.sendMessage({
        action: 'analyzeText',
        text: selectedText
    }, response => {
        if (response.success) {
            showResult(response.data);
        } else {
            loadingSpinner.style.display = 'none';
            sidebar.querySelector('.result-container').innerHTML = `
                <div class="error-message">分析失败：${response.error}</div>
            `;
        }
    });
}

// 监听快捷键
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'toggle-analysis') {
        if (isOpen) {
            toggleSidebar();
        } else {
            startAnalysis();
        }
    }
});

// 添加右键菜单事件监听
document.addEventListener('contextmenu', function(event) {
    const selectedText = getSelectedText();
    if (selectedText) {
        chrome.runtime.sendMessage({
            action: 'showContextMenu'
        });
    }
});
