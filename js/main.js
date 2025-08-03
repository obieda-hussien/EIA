/**
 * Main JavaScript file for EIA Website
 * Enhanced with modern Gen Z animations and interactions
 */

// Animation utilities
class AnimationManager {
    constructor() {
        this.init();
    }

    init() {
        this.initScrollAnimations();
        this.initHoverEffects();
        this.initParallaxEffects();
        this.initTypewriterEffect();
        this.initParticleSystem();
        this.initGlitchEffects();
    }

    // Modern scroll-triggered animations
    initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add multiple animation classes for Gen Z aesthetic
                    entry.target.classList.add('animate-in');
                    
                    // Staggered animations for children
                    const children = entry.target.querySelectorAll('.stagger-child');
                    children.forEach((child, index) => {
                        setTimeout(() => {
                            child.classList.add('animate-in');
                        }, index * 100);
                    });
                }
            });
        }, observerOptions);

        // Observe all animatable elements
        document.querySelectorAll('.animate-on-scroll, .card-hover, .department-card, .news-card').forEach(el => {
            observer.observe(el);
        });
    }

    // Enhanced hover effects with modern micro-interactions
    initHoverEffects() {
        // Magnetic effect for buttons
        document.querySelectorAll('.btn-primary, .magnetic').forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                btn.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) scale(1.02)`;
            });

            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translate(0, 0) scale(1)';
            });
        });

        // Morphing effects for cards
        document.querySelectorAll('.morph-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.borderRadius = '25px';
                card.style.transform = 'translateY(-10px) rotateX(5deg)';
            });

            card.addEventListener('mouseleave', () => {
                card.style.borderRadius = '20px';
                card.style.transform = 'translateY(0) rotateX(0)';
            });
        });
    }

    // Parallax scrolling effects
    initParallaxEffects() {
        let ticking = false;

        const updateParallax = () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.parallax');
            
            parallaxElements.forEach(element => {
                const speed = element.dataset.speed || 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });

            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        });
    }

    // Typewriter effect for hero text
    initTypewriterEffect() {
        const typewriterElements = document.querySelectorAll('.typewriter');
        
        typewriterElements.forEach(element => {
            const text = element.textContent;
            element.textContent = '';
            element.style.borderLeft = '3px solid #3b82f6';
            
            let i = 0;
            const typeWriter = () => {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 100);
                } else {
                    // Remove cursor after typing
                    setTimeout(() => {
                        element.style.borderLeft = 'none';
                    }, 1000);
                }
            };
            
            // Start typing when element comes into view
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !element.dataset.typed) {
                        setTimeout(typeWriter, 500);
                        element.dataset.typed = 'true';
                    }
                });
            });
            
            observer.observe(element);
        });
    }

    // Particle system for hero section
    initParticleSystem() {
        const canvas = document.createElement('canvas');
        canvas.id = 'particles-canvas';
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '1';

        const heroSection = document.querySelector('.hero-gradient');
        if (heroSection) {
            heroSection.style.position = 'relative';
            heroSection.appendChild(canvas);

            const ctx = canvas.getContext('2d');
            const particles = [];

            const resizeCanvas = () => {
                canvas.width = heroSection.offsetWidth;
                canvas.height = heroSection.offsetHeight;
            };

            window.addEventListener('resize', resizeCanvas);
            resizeCanvas();

            // Particle class
            class Particle {
                constructor() {
                    this.x = Math.random() * canvas.width;
                    this.y = Math.random() * canvas.height;
                    this.vx = (Math.random() - 0.5) * 0.5;
                    this.vy = (Math.random() - 0.5) * 0.5;
                    this.radius = Math.random() * 2 + 1;
                    this.opacity = Math.random() * 0.5 + 0.2;
                }

                update() {
                    this.x += this.vx;
                    this.y += this.vy;

                    if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                    if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
                }

                draw() {
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
                    ctx.fill();
                }
            }

            // Create particles
            for (let i = 0; i < 50; i++) {
                particles.push(new Particle());
            }

            // Animation loop
            const animate = () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                
                particles.forEach(particle => {
                    particle.update();
                    particle.draw();
                });

                requestAnimationFrame(animate);
            };

            animate();
        }
    }

    // Glitch effects for modern aesthetic
    initGlitchEffects() {
        const glitchElements = document.querySelectorAll('.glitch-effect');
        
        glitchElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.style.animation = 'glitch 0.3s ease-in-out';
                
                setTimeout(() => {
                    element.style.animation = '';
                }, 300);
            });
        });
    }
}

// Counter animation for statistics
class CounterAnimation {
    static animate(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        const suffix = element.textContent.replace(/[0-9]/g, '');
        
        const count = () => {
            start += increment;
            if (start < target) {
                element.textContent = Math.ceil(start) + suffix;
                requestAnimationFrame(count);
            } else {
                element.textContent = target + suffix;
            }
        };
        
        count();
    }

    static init() {
        const counters = document.querySelectorAll('.stats-counter');
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.dataset.animated) {
                    const text = entry.target.textContent;
                    const target = parseInt(text.replace(/\D/g, ''));
                    
                    if (target) {
                        CounterAnimation.animate(entry.target, target);
                        entry.target.dataset.animated = 'true';
                    }
                }
            });
        });
        
        counters.forEach(counter => counterObserver.observe(counter));
    }
}

// Smooth page transitions
class PageTransitions {
    constructor() {
        this.init();
    }

    init() {
        // Add loading animation
        this.createPageLoader();
        
        // Initialize section transitions
        this.initSectionTransitions();
    }

    createPageLoader() {
        const loader = document.createElement('div');
        loader.id = 'page-loader';
        loader.innerHTML = `
            <div class="loader-content">
                <div class="loader-icon">
                    <i class="fas fa-graduation-cap"></i>
                </div>
                <div class="loader-text">المعهد المصري</div>
                <div class="loader-progress">
                    <div class="progress-bar"></div>
                </div>
            </div>
        `;
        
        document.body.appendChild(loader);

        // Hide loader after page load
        window.addEventListener('load', () => {
            setTimeout(() => {
                loader.classList.add('fade-out');
                setTimeout(() => {
                    loader.remove();
                }, 500);
            }, 1000);
        });
    }

    initSectionTransitions() {
        // Add smooth transitions between sections
        const originalShowSection = window.showSection;
        
        window.showSection = (sectionId) => {
            // Add exit animation to current section
            const currentSection = document.querySelector('.section-active');
            if (currentSection) {
                currentSection.classList.add('section-exit');
                
                setTimeout(() => {
                    originalShowSection(sectionId);
                    
                    // Add entrance animation to new section
                    const newSection = document.getElementById(sectionId);
                    if (newSection) {
                        newSection.classList.add('section-enter');
                        
                        setTimeout(() => {
                            newSection.classList.remove('section-enter');
                            if (currentSection) {
                                currentSection.classList.remove('section-exit');
                            }
                        }, 300);
                    }
                }, 150);
            } else {
                originalShowSection(sectionId);
            }
        };
    }
}

// Initialize all animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AnimationManager();
    CounterAnimation.init();
    new PageTransitions();
    
    // Add CSS classes for staggered animations
    document.querySelectorAll('.department-card, .news-card, .timeline-item').forEach((el, index) => {
        el.classList.add('stagger-child');
        el.style.setProperty('--stagger-delay', `${index * 0.1}s`);
    });
});

// Export for use in other files
window.AnimationManager = AnimationManager;
window.CounterAnimation = CounterAnimation;
window.PageTransitions = PageTransitions;