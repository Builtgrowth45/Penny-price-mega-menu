// Sticky Header
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 100) {
        header.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
    } else {
        header.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
    }
});

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for Fade-in Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Add to Cart Functionality (Demo)
document.querySelectorAll('.btn-primary.btn-small').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Get cart count
        const cartCount = document.querySelector('.cart-count');
        let count = parseInt(cartCount.textContent);
        count++;
        cartCount.textContent = count;
        
        // Visual feedback
        this.textContent = 'Added! ✓';
        this.style.background = '#4CAF50';
        
        setTimeout(() => {
            this.textContent = 'Add to Cart';
            this.style.background = '';
        }, 2000);
    });
});

// Newsletter Form
document.querySelector('.newsletter-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('input[type="email"]').value;
    
    if (email) {
        alert(`Thank you for subscribing! We'll send wellness tips to ${email}`);
        this.reset();
    }
});

// Product Carousel Auto-scroll (Optional)
let carouselIndex = 0;
const carousel = document.querySelector('.product-carousel');

function autoScrollCarousel() {
    if (window.innerWidth > 768 && carousel) {
        carouselIndex++;
        if (carouselIndex > carousel.children.length - 5) {
            carouselIndex = 0;
        }
        carousel.style.transform = `translateX(-${carouselIndex * 20}%)`;
    }
}

// Auto-scroll every 5 seconds (optional feature)
// setInterval(autoScrollCarousel, 5000);

// Lazy Loading Images
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// Track Analytics Events (Google Analytics 4)
function trackEvent(eventName, eventParams) {
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, eventParams);
    }
    console.log('Event tracked:', eventName, eventParams);
}

// Track CTA clicks
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function() {
        trackEvent('cta_click', {
            button_text: this.textContent.trim(),
            button_location: this.closest('section')?.className || 'unknown'
        });
    });
});

// Track scroll depth
let scrollDepths = [25, 50, 75, 100];
let trackedDepths = [];

window.addEventListener('scroll', () => {
    const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    
    scrollDepths.forEach(depth => {
        if (scrollPercent >= depth && !trackedDepths.includes(depth)) {
            trackedDepths.push(depth);
            trackEvent('scroll_depth', {
                depth_percentage: depth
            });
        }
    });
});

// Track product views
document.querySelectorAll('.product-card').forEach(card => {
    const productObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const productName = entry.target.querySelector('h3').textContent;
                trackEvent('product_view', {
                    product_name: productName
                });
                productObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    productObserver.observe(card);
});

console.log('Penny Price Aromatherapy - Homepage loaded successfully!');
