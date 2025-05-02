document.addEventListener('DOMContentLoaded', function() {
    // 配置参数
    const config = {
        particleCount: window.innerWidth < 768 ? 30 : 80, // 移动端减少粒子数量
        colors: ['rgba(255, 255, 255, 0.7)', 'rgba(200, 200, 255, 0.5)'], // 粒子颜色
        sizeRange: [1, 4], // 粒子大小范围（px）
        speedRange: [10, 30], // 动画时长范围（秒）
        movementRadius: 150 // 粒子移动半径（px）
    };

    // 创建粒子
    for (let i = 0; i < config.particleCount; i++) {
        createParticle(config);
    }

    // 窗口大小变化时重新调整
    window.addEventListener('resize', function() {
        document.querySelectorAll('.particle').forEach(particle => {
            particle.remove();
        });
        const newCount = window.innerWidth < 768 ? 30 : 80;
        for (let i = 0; i < newCount; i++) {
            createParticle(config);
        }
    });

    function createParticle(config) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        // 随机大小
        const size = Math.random() * (config.sizeRange[1] - config.sizeRange[0]) + config.sizeRange[0];
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        // 随机位置（初始位置）
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.top = `${Math.random() * 100}vh`;

        // 随机颜色
        const color = config.colors[Math.floor(Math.random() * config.colors.length)];
        particle.style.backgroundColor = color;

        // 随机动画
        const duration = Math.random() * (config.speedRange[1] - config.speedRange[0]) + config.speedRange[0];
        const angle = Math.random() * 360;
        const distance = Math.random() * config.movementRadius;

        // 动态生成动画
        const animationName = `float-${Math.floor(Math.random() * 1000)}`;
        const keyframes = `
            @keyframes ${animationName} {
                0% { 
                    transform: translate(0, 0) rotate(0deg); 
                    opacity: ${Math.random() * 0.5 + 0.3};
                }
                50% { 
                    transform: translate(${Math.cos(angle * Math.PI / 180) * distance}px, 
                                      ${Math.sin(angle * Math.PI / 180) * distance}px) 
                           rotate(180deg); 
                    opacity: ${Math.random() * 0.5 + 0.5};
                }
                100% { 
                    transform: translate(0, 0) rotate(360deg); 
                    opacity: ${Math.random() * 0.5 + 0.3};
                }
            }
        `;

        // 插入动画样式
        const style = document.createElement('style');
        style.textContent = keyframes;
        document.head.appendChild(style);

        // 应用动画
        particle.style.animation = `${animationName} ${duration}s ease-in-out infinite`;
        particle.style.animationDelay = `${Math.random() * 5}s`;

        document.body.appendChild(particle);
    }
});