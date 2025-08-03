// Modern Gen Z Animations and Interactions
class GenZAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.initScrollAnimations();
        this.initParallaxEffects();
        this.initMicroInteractions();
        this.initMorphingShapes();
        this.initGlowEffects();
        this.initTextAnimations();
    }

    // تأثيرات الحركة عند التمرير
    initScrollAnimations() {
        // Intersection Observer للعناصر
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                }
            });
        }, observerOptions);

        // مراقبة العناصر المختلفة
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });

        // إضافة كلاس للعناصر التي تحتاج animation
        document.querySelectorAll('.card-hover, .department-card, .news-card').forEach(el => {
            el.classList.add('animate-on-scroll');
        });
    }

    animateElement(element) {
        const animationType = element.dataset.animation || 'fadeInUp';
        
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
        element.classList.add(animationType);
    }

    // تأثيرات Parallax عصرية
    initParallaxEffects() {
        if (window.innerWidth > 768) { // فقط على الشاشات الكبيرة
            window.addEventListener('scroll', this.handleParallax.bind(this));
        }
    }

    handleParallax() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        // تأثير Parallax للخلفيات
        document.querySelectorAll('.parallax-bg').forEach(bg => {
            bg.style.transform = `translateY(${rate}px)`;
        });

        // تأثير floating للأيقونات
        document.querySelectorAll('.floating-icon').forEach(icon => {
            const rate = Math.sin(scrolled * 0.01) * 10;
            icon.style.transform = `translateY(${rate}px) rotate(${scrolled * 0.02}deg)`;
        });
    }

    // Micro-interactions عصرية
    initMicroInteractions() {
        // Button hover effects
        document.querySelectorAll('button, .btn').forEach(btn => {
            btn.addEventListener('mouseenter', this.buttonHoverIn.bind(this));
            btn.addEventListener('mouseleave', this.buttonHoverOut.bind(this));
            btn.addEventListener('click', this.buttonClick.bind(this));
        });

        // Card tilt effect
        document.querySelectorAll('.card-hover').forEach(card => {
            card.addEventListener('mousemove', this.cardTilt.bind(this));
            card.addEventListener('mouseleave', this.cardReset.bind(this));
        });
    }

    buttonHoverIn(e) {
        const btn = e.target;
        btn.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        btn.style.transform = 'translateY(-2px) scale(1.02)';
        btn.style.boxShadow = '0 10px 25px rgba(59, 130, 246, 0.4)';
        
        // إضافة ripple effect
        this.createRipple(e);
    }

    buttonHoverOut(e) {
        const btn = e.target;
        btn.style.transform = 'translateY(0) scale(1)';
        btn.style.boxShadow = 'none';
    }

    buttonClick(e) {
        const btn = e.target;
        btn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            btn.style.transform = 'scale(1)';
        }, 150);
    }

    createRipple(e) {
        const button = e.currentTarget;
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        const ripple = document.createElement('span');
        ripple.className = 'ripple-effect';
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple 0.6s linear;
            left: ${x}px;
            top: ${y}px;
            width: ${size}px;
            height: ${size}px;
            pointer-events: none;
        `;
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        ripple.addEventListener('animationend', () => {
            ripple.remove();
        });
    }

    cardTilt(e) {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = -(x - centerX) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    }

    cardReset(e) {
        const card = e.currentTarget;
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    }

    // أشكال متحركة
    initMorphingShapes() {
        this.createFloatingShapes();
        this.animateGradients();
    }

    createFloatingShapes() {
        const container = document.querySelector('.hero-gradient');
        if (!container) return;

        for (let i = 0; i < 5; i++) {
            const shape = document.createElement('div');
            shape.className = 'floating-shape';
            shape.style.cssText = `
                position: absolute;
                width: ${Math.random() * 100 + 50}px;
                height: ${Math.random() * 100 + 50}px;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 50%;
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                animation: float ${Math.random() * 3 + 2}s ease-in-out infinite;
                animation-delay: ${Math.random() * 2}s;
                backdrop-filter: blur(10px);
            `;
            container.appendChild(shape);
        }
    }

    animateGradients() {
        const gradients = document.querySelectorAll('.gradient-bg, .hero-gradient');
        gradients.forEach(gradient => {
            gradient.style.backgroundSize = '400% 400%';
            gradient.style.animation = 'gradientShift 8s ease infinite';
        });
    }

    // تأثيرات الوهج والنيون
    initGlowEffects() {
        // إضافة تأثير glow للعناصر المهمة
        document.querySelectorAll('.stats-counter').forEach(counter => {
            counter.addEventListener('mouseenter', function() {
                this.style.textShadow = '0 0 20px rgba(59, 130, 246, 0.8)';
                this.style.transition = 'text-shadow 0.3s ease';
            });
            
            counter.addEventListener('mouseleave', function() {
                this.style.textShadow = 'none';
            });
        });

        // Neon border effects
        document.querySelectorAll('.department-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.boxShadow = '0 0 30px rgba(59, 130, 246, 0.5)';
                this.style.borderColor = 'rgba(59, 130, 246, 0.8)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.boxShadow = 'none';
                this.style.borderColor = 'transparent';
            });
        });
    }

    // تأثيرات النصوص المتحركة
    initTextAnimations() {
        this.typewriterEffect();
        this.glitchEffect();
        this.wavyText();
    }

    typewriterEffect() {
        const typeElements = document.querySelectorAll('.typewriter');
        typeElements.forEach(element => {
            const text = element.textContent;
            element.textContent = '';
            element.style.borderRight = '2px solid #3b82f6';
            element.style.animation = 'blink 1s infinite';
            
            let i = 0;
            const typeInterval = setInterval(() => {
                element.textContent += text.charAt(i);
                i++;
                if (i >= text.length) {
                    clearInterval(typeInterval);
                    setTimeout(() => {
                        element.style.borderRight = 'none';
                        element.style.animation = 'none';
                    }, 1000);
                }
            }, 100);
        });
    }

    glitchEffect() {
        document.querySelectorAll('.glitch').forEach(element => {
            element.addEventListener('mouseenter', function() {
                this.style.animation = 'glitch 0.3s ease-in-out';
            });
            
            element.addEventListener('animationend', function() {
                this.style.animation = 'none';
            });
        });
    }

    wavyText() {
        document.querySelectorAll('.wavy-text').forEach(element => {
            const text = element.textContent;
            element.innerHTML = '';
            
            [...text].forEach((char, i) => {
                const span = document.createElement('span');
                span.textContent = char === ' ' ? '\u00A0' : char;
                span.style.display = 'inline-block';
                span.style.animation = `wave 2s ease-in-out infinite ${i * 0.1}s`;
                element.appendChild(span);
            });
        });
    }
}

// إضافة CSS animations
const genZStyles = document.createElement('style');
genZStyles.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-20px) rotate(180deg); }
    }

    @keyframes gradientShift {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }

    @keyframes glitch {
        0% { transform: translate(0); }
        20% { transform: translate(-2px, 2px); }
        40% { transform: translate(-2px, -2px); }
        60% { transform: translate(2px, 2px); }
        80% { transform: translate(2px, -2px); }
        100% { transform: translate(0); }
    }

    @keyframes wave {
        0%, 40%, 100% { transform: translateY(0); }
        20% { transform: translateY(-10px); }
    }

    @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes zoomIn {
        from {
            opacity: 0;
            transform: scale(0.8);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }

    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    /* تأثيرات scroll reveal */
    .animate-on-scroll {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .animate-on-scroll.fadeInUp {
        animation: fadeInUp 0.6s ease forwards;
    }

    .animate-on-scroll.zoomIn {
        animation: zoomIn 0.6s ease forwards;
    }

    .animate-on-scroll.slideInRight {
        animation: slideInRight 0.6s ease forwards;
    }

    /* تأثيرات Glassmorphism عصرية */
    .glass-effect {
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        box-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);
    }

    /* تأثيرات النيون */
    .neon-glow {
        box-shadow: 
            0 0 5px #3b82f6,
            0 0 10px #3b82f6,
            0 0 15px #3b82f6,
            0 0 20px #3b82f6;
    }

    /* Morphing buttons */
    .morph-btn {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        overflow: hidden;
        position: relative;
    }

    .morph-btn:hover {
        border-radius: 25px;
        transform: scale(1.05);
    }

    /* Liquid loading effect */
    .liquid-loader {
        position: relative;
        overflow: hidden;
    }

    .liquid-loader::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
        transition: left 0.5s;
    }

    .liquid-loader:hover::before {
        left: 100%;
    }
`;

document.head.appendChild(genZStyles);

// تهيئة الأنيميشن عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    window.genZAnimations = new GenZAnimations();
});