document.addEventListener('DOMContentLoaded', function() {
    const yearElement = document.getElementById('nowYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});

// 最简单直接的解决方案
document.addEventListener('DOMContentLoaded', function() {
    const cdnBase = 'https://ql-file.netlify.app';

    document.querySelectorAll('img').forEach(img => {
        const src = img.src; // 使用img.src属性获取解析后的完整路径

        // 如果已经是完整URL或data URL，跳过
        if (src.startsWith('http') || src.startsWith('data:') || src.startsWith('blob:')) {
            return;
        }

        // 使用当前页面的origin作为基础（更准确处理相对路径）
        const isRelative = !src.startsWith('/');
        const basePath = isRelative ? window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/') + 1) : '';

        // 构建CDN路径
        const cdnSrc = cdnBase + basePath + (isRelative ? src : src);

        // 预加载检查
        const testImg = new Image();
        testImg.onload = () => {
            if (img.src !== cdnSrc) { // 防止重复替换
                img.src = cdnSrc;
            }
        };
        testImg.src = cdnSrc;
    });
});