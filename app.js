// Smooth Scrolling for Navigation Links
const navLinks = document.querySelectorAll('.nav-link');
const heroLinks = document.querySelectorAll('.hero-cta a[href^="#"]');
const footerLinks = document.querySelectorAll('.footer-link[href^="#"]');

function smoothScroll(e) {
  const href = e.currentTarget.getAttribute('href');
  if (href.startsWith('#')) {
    e.preventDefault();
    const targetId = href.substring(1);
    const targetSection = document.getElementById(targetId);
    
    if (targetSection) {
      const navHeight = document.querySelector('.navbar').offsetHeight;
      const targetPosition = targetSection.offsetTop - navHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
      
      // Close mobile menu if open
      const navMenu = document.getElementById('navMenu');
      if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
      }
    }
  }
}

navLinks.forEach(link => link.addEventListener('click', smoothScroll));
heroLinks.forEach(link => link.addEventListener('click', smoothScroll));
footerLinks.forEach(link => link.addEventListener('click', smoothScroll));

// Mobile Menu Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
    navMenu.classList.remove('active');
  }
});

// Active Navigation Highlighting on Scroll
const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
  const scrollY = window.pageYOffset;
  
  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute('id');
    const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
    
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLinks.forEach(link => link.classList.remove('active'));
      if (navLink) {
        navLink.classList.add('active');
      }
    }
  });
}

window.addEventListener('scroll', highlightNavigation);

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Scroll Animation for Sections
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Add fade-in class to elements
const animatedElements = document.querySelectorAll('.section');
animatedElements.forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// Project Card Detail Toggle
const projectButtons = document.querySelectorAll('.project-btn');

projectButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    const projectCard = e.target.closest('.project-card');
    const highlights = projectCard.querySelector('.project-highlights');
    
    if (highlights.style.display === 'none' || !highlights.style.display) {
      highlights.style.display = 'block';
      button.textContent = 'Hide Details';
    } else {
      highlights.style.display = 'none';
      button.textContent = 'View Details';
    }
  });
});

// Contact Form Handling - Google Sheets Integration (Silent Submission)
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Create FormData object
    const formData = new FormData();
    formData.append('entry.1533545076', name);      
    formData.append('entry.1015710991', email);     
    formData.append('entry.1592601976', message);    

    // Submit to Google Forms silently (no new tab)
    fetch('https://docs.google.com/forms/d/e/1FAIpQLSe74ciV0ycnYy4d29oiLcMmzafP4lUUwSn4HSa9W6AxTjby_Q/formResponse', {
        method: 'POST',
        body: formData,
        mode: 'no-cors'
    })
    .then(() => {
        // Show success message
        alert(`Thank you for reaching out, ${name}! Your message has been sent successfully. I'll get back to you soon.`);
        
        // Reset form
        contactForm.reset();
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('There was an error sending your message. Please try again.');
    });
});



// Initialize page
document.addEventListener('DOMContentLoaded', () => {
  // Add initial active state to first nav link
  if (navLinks.length > 0) {
    highlightNavigation();
  }
});