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
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(contactForm);

        // Basic validation
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');

        if (!name || !email || !message) {
            showMessage('Please fill in all required fields.', 'error');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showMessage('Please enter a valid email address.', 'error');
            return;
        }

        // Show loading state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;

        try {
            // Submit form to Web3Forms
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                // Show success message
                showMessage('Thank you for your message! We will get back to you within 24 hours.', 'success');
                
                // Reset form
                contactForm.reset();
            } else {
                throw new Error(data.message || 'Something went wrong');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            showMessage('Sorry, there was an error sending your message. Please try again or email us directly at info@akint.co.in', 'error');
        } finally {
            // Restore button state
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;

            // Hide message after 8 seconds
            setTimeout(() => {
                if (formMessage) {
                    formMessage.style.display = 'none';
                }
            }, 8000);
        }
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

// ===== NAVBAR SCROLL EFFECT =====
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
    }

    lastScroll = currentScroll;
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
console.log('%c🚀 Welcome to AKI Tech! ', 'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; font-size: 20px; padding: 10px; border-radius: 5px;');
console.log('%cWebsite built with ❤️ by AKI Tech Development Team', 'color: #2563eb; font-size: 14px;');

// ===== CUSTOM CURSOR TRAIL EFFECT =====
document.addEventListener('DOMContentLoaded', function() {
    // Create cursor elements
    const cursorDot = document.createElement('div');
    const cursorOutline = document.createElement('div');
    
    cursorDot.className = 'cursor-dot';
    cursorOutline.className = 'cursor-outline';
    
    document.body.appendChild(cursorDot);
    document.body.appendChild(cursorOutline);
    
    let mouseX = 0, mouseY = 0;
    let outlineX = 0, outlineY = 0;
    
    // Track mouse position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
    });
    
    // Smooth follow effect for outline
    function animateCursor() {
        outlineX += (mouseX - outlineX) * 0.15;
        outlineY += (mouseY - outlineY) * 0.15;
        
        cursorOutline.style.left = outlineX + 'px';
        cursorOutline.style.top = outlineY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    animateCursor();
    
    // Add hover effect on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .btn, input, textarea, select');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorDot.style.transform = 'translate(-50%, -50%) scale(2)';
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });
    
    // Hide default cursor on desktop
    if (window.innerWidth > 768) {
        document.body.style.cursor = 'none';
        document.querySelectorAll('a, button, .btn, input, textarea, select').forEach(el => {
            el.style.cursor = 'none';
        });
    }
});

// ===== CURRENCY CONVERSION SYSTEM =====
(function() {
    // Exchange rates relative to INR (base currency)
    const exchangeRates = {
        INR: 1,
        USD: 0.012,    // 1 INR = 0.012 USD
        EUR: 0.011,    // 1 INR = 0.011 EUR
        GBP: 0.0095,   // 1 INR = 0.0095 GBP
        AUD: 0.018,    // 1 INR = 0.018 AUD
        CAD: 0.016,    // 1 INR = 0.016 CAD
        SGD: 0.016,    // 1 INR = 0.016 SGD
        AED: 0.044,    // 1 INR = 0.044 AED
        SAR: 0.045,    // 1 INR = 0.045 SAR
        JPY: 1.79      // 1 INR = 1.79 JPY
    };

    // Currency symbols
    const currencySymbols = {
        INR: '₹',
        USD: '$',
        EUR: '€',
        GBP: '£',
        AUD: '$',
        CAD: '$',
        SGD: '$',
        AED: 'د.إ',
        SAR: '﷼',
        JPY: '¥'
    };

    // Country to currency mapping
    const countryToCurrency = {
        IN: 'INR',
        US: 'USD',
        GB: 'GBP',
        EU: 'EUR',
        AU: 'AUD',
        CA: 'CAD',
        SG: 'SGD',
        AE: 'AED',
        SA: 'SAR',
        JP: 'JPY'
    };

    let currentCurrency = 'INR';
    let detectedCurrency = 'INR';

    // Detect user's country and set currency
    async function detectUserCurrency() {
        try {
            const response = await fetch('https://ipapi.co/json/');
            const data = await response.json();
            const countryCode = data.country_code;
            
            // Map country to currency
            detectedCurrency = countryToCurrency[countryCode] || 'INR';
            
            // Check if user has saved preference
            const savedCurrency = localStorage.getItem('preferredCurrency');
            if (savedCurrency) {
                currentCurrency = savedCurrency;
            } else {
                currentCurrency = detectedCurrency;
                localStorage.setItem('preferredCurrency', currentCurrency);
            }
        } catch (error) {
            console.log('Could not detect location, using INR');
            currentCurrency = localStorage.getItem('preferredCurrency') || 'INR';
        }

        // Update dropdowns and prices
        updateCurrencySelectors();
        convertAllPrices();
    }

    // Update both currency dropdowns
    function updateCurrencySelectors() {
        const navSelector = document.getElementById('currencySelect');
        const footerSelector = document.getElementById('currencySelectFooter');

        if (navSelector) navSelector.value = currentCurrency;
        if (footerSelector) footerSelector.value = currentCurrency;
    }

    // Convert price from INR to target currency
    function convertPrice(inrPrice, targetCurrency) {
        const rate = exchangeRates[targetCurrency];
        const convertedPrice = inrPrice * rate;
        
        // Format based on currency
        let formattedPrice;
        if (targetCurrency === 'JPY') {
            formattedPrice = Math.round(convertedPrice).toLocaleString();
        } else {
            formattedPrice = convertedPrice.toFixed(2);
        }
        
        return {
            symbol: currencySymbols[targetCurrency],
            amount: formattedPrice,
            currency: targetCurrency
        };
    }

    // Find and convert all prices on the page
    function convertAllPrices() {
        // Find elements with price data
        const priceElements = document.querySelectorAll('[data-price-inr]');
        
        priceElements.forEach(element => {
            const inrPrice = parseFloat(element.getAttribute('data-price-inr'));
            const converted = convertPrice(inrPrice, currentCurrency);
            
            // Update the element's content
            if (element.classList.contains('currency')) {
                element.textContent = converted.symbol;
            } else if (element.classList.contains('amount')) {
                element.textContent = converted.amount;
            } else {
                // Full price display
                element.innerHTML = `${converted.symbol}${converted.amount}`;
            }
        });

        // Also update any text nodes containing ₹750
        updatePriceInText();
    }

    // Update prices in text content (for elements without data attributes)
    function updatePriceInText() {
        const converted = convertPrice(750, currentCurrency);
        
        // Update hero price tags
        const heroPrice = document.querySelector('.hero-price strong');
        if (heroPrice) {
            heroPrice.textContent = `${converted.symbol}${converted.amount}/month`;
        }

        // Update price tags
        const priceTags = document.querySelectorAll('.price-tag strong');
        priceTags.forEach(tag => {
            tag.textContent = `${converted.symbol}${converted.amount}/month`;
        });

        // Update pricing card amounts
        const priceAmounts = document.querySelectorAll('.price .amount');
        priceAmounts.forEach(amount => {
            const inrValue = parseFloat(amount.getAttribute('data-price-inr')) || 750;
            const converted = convertPrice(inrValue, currentCurrency);
            amount.textContent = converted.amount;
        });

        // Update currency symbols in pricing
        const currencySpans = document.querySelectorAll('.price .currency');
        currencySpans.forEach(span => {
            span.textContent = currencySymbols[currentCurrency];
        });
    }

    // Handle currency change
    function handleCurrencyChange(event) {
        const newCurrency = event.target.value;
        currentCurrency = newCurrency;
        
        // Save preference
        localStorage.setItem('preferredCurrency', newCurrency);
        
        // Sync both dropdowns
        updateCurrencySelectors();
        
        // Convert all prices
        convertAllPrices();
    }

    // Initialize currency system
    function initCurrency() {
        // Add event listeners to both selectors
        const navSelector = document.getElementById('currencySelect');
        const footerSelector = document.getElementById('currencySelectFooter');

        if (navSelector) {
            navSelector.addEventListener('change', handleCurrencyChange);
        }

        if (footerSelector) {
            footerSelector.addEventListener('change', handleCurrencyChange);
        }

        // Add data-price-inr to pricing elements if not present
        addPriceAttributes();

        // Detect user currency and convert
        detectUserCurrency();
    }

    // Add data-price-inr attributes to pricing elements
    function addPriceAttributes() {
        // Find all price amounts and add INR base value
        const priceElements = document.querySelectorAll('.price .amount');
        priceElements.forEach(element => {
            if (!element.hasAttribute('data-price-inr')) {
                element.setAttribute('data-price-inr', '750');
            }
        });
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCurrency);
    } else {
        initCurrency();
    }
})();

