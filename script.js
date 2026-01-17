document.addEventListener('DOMContentLoaded', function() {
    const yearElement = document.getElementById('nowYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});

// 主题切换函数
document.addEventListener('DOMContentLoaded', function() {
    const yearElement = document.getElementById('nowYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // 初始化主题
    initTheme();

    // 加载 giscus
    loadGiscus();
});

// 主题切换函数
const toggleTheme = () => {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    // 更新 giscus 主题
    updateGiscusTheme(newTheme);
};

// 初始化主题
const initTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const theme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);

    // 监听系统主题变化
    if (!savedTheme) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
            const newTheme = e.matches ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
            updateGiscusTheme(newTheme);
        });
    }
};

// 动态加载 giscus
function loadGiscus() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const giscusTheme = currentTheme === 'dark' ? 'dark_dimmed' : 'light_tritanopia';

    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.setAttribute('data-repo', 'SqrtOne/SqrtOne.github.io');
    script.setAttribute('data-repo-id', 'R_kgDOQsHyeg');
    script.setAttribute('data-category', 'Announcements');
    script.setAttribute('data-category-id', 'DIC_kwDOQsHyes4C0CZ-');
    script.setAttribute('data-mapping', 'pathname');
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'top');
    script.setAttribute('data-theme', giscusTheme); // 动态设置主题
    script.setAttribute('data-lang', 'zh-CN');
    script.setAttribute('crossorigin', 'anonymous');
    script.async = true;

    const container = document.getElementById('#giscus');
    if (container) {
        container.appendChild(script);
    }
}

// 更新 giscus 主题
function updateGiscusTheme(theme) {
    const giscusTheme = theme === 'dark' ? 'dark_dimmed' : 'light_tritanopia';
    const iframe = document.querySelector('iframe.giscus-frame');

    if (iframe && iframe.contentWindow) {
        iframe.contentWindow.postMessage({
            giscus: {
                setConfig: {
                    theme: giscusTheme
                }
            }
        }, 'https://giscus.app');
    }
}

// 绑定切换按钮
document.getElementById('themeToggle')?.addEventListener('click', toggleTheme);

// 监听 giscus 消息（用于初始化时的主题设置）
window.addEventListener('message', function(event) {
    if (event.origin !== 'https://giscus.app') return;

    if (event.data?.giscus?.signaling) {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme) {
            setTimeout(() => updateGiscusTheme(currentTheme), 100);
        }
    }
});