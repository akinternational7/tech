// ===== MOBILE MENU TOGGLE =====
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger icon
            const spans = this.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const spans = hamburger.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }
});

// ===== SMOOTH SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// ===== CONTACT FORM HANDLING =====
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form values
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            company: document.getElementById('company').value,
            service: document.getElementById('service').value,
            budget: document.getElementById('budget').value,
            message: document.getElementById('message').value
        };

        // Basic validation
        if (!formData.name || !formData.email || !formData.message) {
            showMessage('Please fill in all required fields.', 'error');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            showMessage('Please enter a valid email address.', 'error');
            return;
        }

        // Simulate form submission
        // In production, you would send this data to your server
        console.log('Form submitted:', formData);

        // Show success message
        showMessage('Thank you for your message! We will get back to you within 24 hours.', 'success');

        // Reset form
        contactForm.reset();

        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    });
}

function showMessage(message, type) {
    if (formMessage) {
        formMessage.textContent = message;
        formMessage.className = 'form-message ' + type;
        formMessage.style.display = 'block';
    }
}

// ===== SCROLL ANIMATIONS =====
// Add animation class when elements come into view
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements with animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll(
        '.feature-card, .service-card, .stat-item, .team-member, .value-item, .process-step, .faq-item, .choose-item, .service-detail-card'
    );
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
});

// ===== NAVBAR SCROLL EFFECT (ORIGINAL) =====
let lastScrollPosition = 0;
const navbarElement = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        navbarElement.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        navbarElement.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
    }

    lastScrollPosition = currentScroll;
});

// ===== ANIMATED COUNTER FOR STATS =====
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + '+';
        }
    }, 16);
}

// Observe stats section and animate when visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                const number = parseInt(text.replace(/\D/g, ''));
                stat.textContent = '0+';
                animateCounter(stat, number);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// ===== FORM INPUT ANIMATIONS =====
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea, .form-group select');

formInputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });

    input.addEventListener('blur', function() {
        if (!this.value) {
            this.parentElement.classList.remove('focused');
        }
    });
});

// ===== BACK TO TOP BUTTON =====
// Create back to top button
const backToTopButton = document.createElement('button');
backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTopButton.classList.add('back-to-top');
backToTopButton.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: none;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    z-index: 999;
`;

document.body.appendChild(backToTopButton);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.style.display = 'flex';
    } else {
        backToTopButton.style.display = 'none';
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

backToTopButton.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-5px)';
    this.style.boxShadow = '0 10px 15px rgba(0, 0, 0, 0.2)';
});

backToTopButton.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0)';
    this.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
});

// ===== LOADING ANIMATION =====
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.3s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ===== ACTIVE LINK HIGHLIGHT =====
const currentLocation = location.pathname.split('/').pop() || 'index.html';
const navLinks = document.querySelectorAll('.nav-menu a');

navLinks.forEach(link => {
    if (link.getAttribute('href') === currentLocation) {
        link.classList.add('active');
    }
});

// ===== SERVICE CARD HOVER EFFECT =====
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ===== CONSOLE MESSAGE =====
console.log('%c🚀 Welcome to AkTech! ', 'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; font-size: 20px; padding: 10px; border-radius: 5px;');
console.log('%cWebsite built with ❤️ by AkTech Development Team', 'color: #2563eb; font-size: 14px;');

// ===== SCROLL PROGRESS BAR =====
window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    
    let progressBar = document.querySelector('.scroll-progress');
    if (!progressBar) {
        progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        document.body.appendChild(progressBar);
    }
    progressBar.style.width = scrolled + '%';
});

// ===== ENHANCED NAVBAR SCROLL EFFECT =====
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ===== PARALLAX EFFECT FOR HERO =====
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrolled = window.pageYOffset;
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ===== SMOOTH REVEAL ANIMATIONS =====
const revealElements = document.querySelectorAll('.feature-card, .service-card, .stat-item, .value-card, .team-member, .process-step, .module-card, .product-card-extra');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.animation = `reveal 0.8s ease forwards`;
                entry.target.style.opacity = '1';
            }, index * 100);
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => {
    el.style.opacity = '0';
    revealObserver.observe(el);
});

// ===== MAGNETIC BUTTON EFFECT =====
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        button.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translate(0, 0)';
    });
});

// ===== CURSOR TRAIL EFFECT =====
let cursorDot, cursorOutline;

document.addEventListener('DOMContentLoaded', () => {
    // Create cursor elements
    cursorDot = document.createElement('div');
    cursorDot.style.cssText = `
        width: 8px;
        height: 8px;
        background: linear-gradient(135deg, #6366f1, #8b5cf6);
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 10000;
        transition: transform 0.1s ease;
    `;
    
    cursorOutline = document.createElement('div');
    cursorOutline.style.cssText = `
        width: 40px;
        height: 40px;
        border: 2px solid rgba(99, 102, 241, 0.3);
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 10000;
        transition: all 0.15s ease;
    `;
    
    document.body.appendChild(cursorDot);
    document.body.appendChild(cursorOutline);
});

document.addEventListener('mousemove', (e) => {
    if (cursorDot && cursorOutline) {
        cursorDot.style.left = e.clientX + 'px';
        cursorDot.style.top = e.clientY + 'px';
        
        setTimeout(() => {
            cursorOutline.style.left = (e.clientX - 20) + 'px';
            cursorOutline.style.top = (e.clientY - 20) + 'px';
        }, 50);
    }
});

// Scale cursor on hover over interactive elements
document.addEventListener('mouseover', (e) => {
    if (e.target.matches('a, button, .btn, input, textarea, select')) {
        if (cursorDot) cursorDot.style.transform = 'scale(1.5)';
        if (cursorOutline) cursorOutline.style.transform = 'scale(1.5)';
    }
});

document.addEventListener('mouseout', (e) => {
    if (e.target.matches('a, button, .btn, input, textarea, select')) {
        if (cursorDot) cursorDot.style.transform = 'scale(1)';
        if (cursorOutline) cursorOutline.style.transform = 'scale(1)';
    }
});

// ===== ANIMATED PARTICLES FOR HERO =====
function createParticles() {
    const hero = document.querySelector('.hero');
    const pageHeader = document.querySelector('.page-header');
    
    [hero, pageHeader].forEach(section => {
        if (section) {
            const particleCount = 20;
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.style.cssText = `
                    position: absolute;
                    width: ${Math.random() * 4 + 2}px;
                    height: ${Math.random() * 4 + 2}px;
                    background: rgba(255, 255, 255, ${Math.random() * 0.5 + 0.3});
                    border-radius: 50%;
                    left: ${Math.random() * 100}%;
                    top: ${Math.random() * 100}%;
                    animation: floatParticle ${Math.random() * 10 + 15}s linear infinite;
                    animation-delay: ${Math.random() * 5}s;
                    pointer-events: none;
                    z-index: 0;
                `;
                section.appendChild(particle);
            }
        }
    });
}

// Add particle animation
const style = document.createElement('style');
style.textContent = `
    @keyframes floatParticle {
        0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Create particles when page loads
if (window.innerWidth > 768) {
    setTimeout(createParticles, 500);
}

// ===== DYNAMIC GRADIENT SHIFT =====
let hue = 0;
function animateGradients() {
    hue += 0.5;
    if (hue >= 360) hue = 0;
    
    const elements = document.querySelectorAll('.hero, .page-header, .stats, .cta');
    elements.forEach(el => {
        if (el) {
            el.style.filter = `hue-rotate(${hue * 0.1}deg)`;
        }
    });
    
    requestAnimationFrame(animateGradients);
}

// Start gradient animation
if (window.innerWidth > 768) {
    animateGradients();
}

// ===== GLOWING ORBS EFFECT =====
function createGlowingOrbs() {
    const sections = document.querySelectorAll('.features, .services');
    
    sections.forEach(section => {
        const orbCount = 3;
        for (let i = 0; i < orbCount; i++) {
            const orb = document.createElement('div');
            orb.style.cssText = `
                position: absolute;
                width: ${Math.random() * 300 + 200}px;
                height: ${Math.random() * 300 + 200}px;
                background: radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%);
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: orbFloat ${Math.random() * 20 + 15}s ease-in-out infinite;
                animation-delay: ${Math.random() * 5}s;
                pointer-events: none;
                z-index: 0;
            `;
            section.appendChild(orb);
        }
    });
}

const orbStyle = document.createElement('style');
orbStyle.textContent = `
    @keyframes orbFloat {
        0%, 100% {
            transform: translate(0, 0) scale(1);
        }
        33% {
            transform: translate(50px, -50px) scale(1.1);
        }
        66% {
            transform: translate(-30px, 30px) scale(0.9);
        }
    }
`;
document.head.appendChild(orbStyle);

// Create orbs
if (window.innerWidth > 768) {
    setTimeout(createGlowingOrbs, 1000);
}
