// Mobile Navigation
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () => {
    // Toggle Navigation
    nav.classList.toggle('active');

    // Animate Links
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `fadeIn 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });

    // Burger Animation
    burger.classList.toggle('toggle');
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Initialize EmailJS with your public key
emailjs.init("IiF_xw10eSUpzSl_W");

// Form Submission with EmailJS
const form = document.getElementById('contact-form');
const submitButton = form.querySelector('.submit-btn');

async function sendEmail(formData) {
    // EmailJS template parameters
    const templateParams = {
        to_email: "fishu6120@gmail.com",
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        reply_to: formData.email
    };

    try {
        // Send email using EmailJS
        const response = await emailjs.send(
            'service_portfolio', 
            'template_contact', 
            templateParams
        );
        return { success: true };
    } catch (error) {
        console.error('Email Error:', error);
        return { success: false, error: error };
    }
}

// Create message elements for feedback
const messageDiv = document.createElement('div');
messageDiv.classList.add('form-message');
form.appendChild(messageDiv);

// Handle form submission
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Show loading state
    submitButton.classList.add('loading');
    submitButton.disabled = true;
    
    // Get form data
    const formData = {
        name: form.querySelector('#name').value,
        email: form.querySelector('#email').value,
        message: form.querySelector('#message').value
    };

    // Validate form data
    if (!formData.name || !formData.email || !formData.message) {
        messageDiv.textContent = 'Please fill in all fields';
        messageDiv.className = 'form-message error';
        submitButton.classList.remove('loading');
        submitButton.disabled = false;
        return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        messageDiv.textContent = 'Please enter a valid email address';
        messageDiv.className = 'form-message error';
        submitButton.classList.remove('loading');
        submitButton.disabled = false;
        return;
    }

    // Send email
    const result = await sendEmail(formData);
    
    if (result.success) {
        // Show success message
        messageDiv.textContent = 'Message sent successfully! I will get back to you soon.';
        messageDiv.className = 'form-message success';
        form.reset();
    } else {
        // Show error message
        messageDiv.textContent = 'Failed to send message. Please try again or contact directly via email.';
        messageDiv.className = 'form-message error';
    }

    // Reset button state
    submitButton.classList.remove('loading');
    submitButton.disabled = false;
});

// Clear message when starting a new form input
form.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('focus', () => {
        messageDiv.style.display = 'none';
    });
});

// Scroll Animation
const sections = document.querySelectorAll('section');
window.addEventListener('scroll', () => {
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= (sectionTop - sectionHeight / 2)) {
            section.style.animation = 'fadeIn 1s ease forwards';
        }
    });
});

// Image Slider
const slides = document.querySelectorAll('.slide');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const dotsContainer = document.querySelector('.slider-dots');
let currentSlide = 0;

// Create dots
slides.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.dot');

function updateSlides() {
    slides.forEach((slide, index) => {
        slide.classList.remove('active');
        dots[index].classList.remove('active');
    });
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlides();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateSlides();
}

function goToSlide(index) {
    currentSlide = index;
    updateSlides();
}

// Add event listeners
prevButton.addEventListener('click', prevSlide);
nextButton.addEventListener('click', nextSlide);

// Auto slide
setInterval(nextSlide, 5000);

// Initialize first slide
updateSlides();

// Project Slider
const projectSlides = document.querySelectorAll('.project-slide');
const projectSlider = document.querySelector('.project-slider');
const prevProjectButton = document.querySelector('.prev-project');
const nextProjectButton = document.querySelector('.next-project');
const projectDotsContainer = document.querySelector('.project-slider-dots');
let currentProjectSlide = 0;
let startX;
let scrollLeft;
let isDown;

// Create project dots
projectSlides.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('project-dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToProjectSlide(index));
    projectDotsContainer.appendChild(dot);
});

const projectDots = document.querySelectorAll('.project-dot');

function updateProjectSlides() {
    const slideWidth = projectSlides[0].offsetWidth;
    projectSlider.style.transform = `translateX(-${currentProjectSlide * slideWidth}px)`;
    
    projectSlides.forEach((slide, index) => {
        slide.classList.remove('active');
        projectDots[index].classList.remove('active');
    });
    
    projectSlides[currentProjectSlide].classList.add('active');
    projectDots[currentProjectSlide].classList.add('active');
}

function nextProjectSlide() {
    currentProjectSlide = (currentProjectSlide + 1) % projectSlides.length;
    updateProjectSlides();
}

function prevProjectSlide() {
    currentProjectSlide = (currentProjectSlide - 1 + projectSlides.length) % projectSlides.length;
    updateProjectSlides();
}

function goToProjectSlide(index) {
    currentProjectSlide = index;
    updateProjectSlides();
}

// Mouse events for drag scrolling
projectSlider.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - projectSlider.offsetLeft;
    scrollLeft = projectSlider.scrollLeft;
});

projectSlider.addEventListener('mouseleave', () => {
    isDown = false;
});

projectSlider.addEventListener('mouseup', () => {
    isDown = false;
});

projectSlider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - projectSlider.offsetLeft;
    const walk = (x - startX) * 2;
    projectSlider.scrollLeft = scrollLeft - walk;
});

// Add event listeners for project slider
prevProjectButton.addEventListener('click', prevProjectSlide);
nextProjectButton.addEventListener('click', nextProjectSlide);

// Initialize project slider
updateProjectSlides();

// Auto slide projects
setInterval(nextProjectSlide, 6000);

// Resize handler
window.addEventListener('resize', updateProjectSlides);

// Fullscreen Image View Functionality
const projectCards = document.querySelectorAll('.project-card');
const fullscreenView = document.querySelector('.project-fullscreen');
const fullscreenImage = fullscreenView.querySelector('img');
const closeButton = document.querySelector('.close-fullscreen');

// Open fullscreen view when clicking the project card
projectCards.forEach(card => {
    card.addEventListener('click', (e) => {
        // Don't trigger if clicking on project link
        if (!e.target.closest('.project-link')) {
            const imgSrc = card.querySelector('.project-image img').src;
            fullscreenImage.src = imgSrc;
            fullscreenView.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling when fullscreen is active
        }
    });
});

// Close fullscreen view
closeButton.addEventListener('click', () => {
    fullscreenView.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
});

// Close on clicking outside the image
fullscreenView.addEventListener('click', (e) => {
    if (e.target === fullscreenView) {
        fullscreenView.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Close on ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && fullscreenView.classList.contains('active')) {
        fullscreenView.classList.remove('active');
        document.body.style.overflow = '';
    }
});
