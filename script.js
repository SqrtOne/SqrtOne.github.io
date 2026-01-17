document.addEventListener('DOMContentLoaded', function() {
    const yearElement = document.getElementById('nowYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});

// 主题切换函数
const toggleTheme = () => {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    // 切换主题属性
    html.setAttribute('data-theme', newTheme);

    // 保存到本地存储
    localStorage.setItem('theme', newTheme);

    // 可选：触发自定义事件供其他组件监听
    document.dispatchEvent(new CustomEvent('themeChange', {
        detail: { theme: newTheme }
    }));
};

// 初始化主题
const initTheme = () => {
    // 读取存储的主题或根据系统偏好
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const theme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);

    // 监听系统主题变化（仅当用户未手动设置过）
    if (!savedTheme) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
            document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
        });
    }
};

// 绑定切换按钮
document.getElementById('themeToggle')?.addEventListener('click', toggleTheme);

// 页面加载时初始化
if (!FORCE_LIGHT_THEME) {
    window.addEventListener('DOMContentLoaded', initTheme);
}