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

// Contact Form Handling
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;
  
  // Since this is a UI-only form, just show an alert
  alert(`Thank you for your message, ${name}! This is a demo form. In a real application, your message would be sent.`);
  
  // Reset form
  contactForm.reset();
});

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
  // Add initial active state to first nav link
  if (navLinks.length > 0) {
    highlightNavigation();
  }
});