// Script to handle smooth scrolling, animations and theme toggle
document.addEventListener('DOMContentLoaded', () => {
    
    const body = document.body;
    const navLinks = document.querySelectorAll('nav a');
  
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
  
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
  
        if (targetSection) {
          window.scrollTo({
            top: targetSection.offsetTop - 80, // Offset for header height
            behavior: 'smooth'
          });
        }
      });
    });
  
  
  
    const projectCards = document.querySelectorAll('.project-card');
  
    if (projectCards.length) {
      const projectsObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.style.opacity = '1';
              entry.target.style.transform = 'translateY(0)';
            }, index * 150);
  
            projectsObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });
  
      projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.5s ease';
        projectsObserver.observe(card);
      });
    }
  
    const techIcons = document.querySelectorAll('.tech-icon');
  
    if (techIcons.length) {
      const techIconsObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.style.opacity = '1';
              entry.target.style.transform = 'translateY(0)';
            }, index * 100);
  
            techIconsObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });
  
      techIcons.forEach(icon => {
        icon.style.opacity = '0';
        icon.style.transform = 'translateY(20px)';
        icon.style.transition = 'all 0.5s ease';
        techIconsObserver.observe(icon);
      });
    }
  
    const contactItems = document.querySelectorAll('.contact-item');
  
    if (contactItems.length) {
      const contactObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.style.opacity = '1';
              entry.target.style.transform = 'translateY(0)';
            }, index * 150);
  
            contactObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });
  
      contactItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'all 0.5s ease';
        contactObserver.observe(item);
      });
    }
  
    const sections = document.querySelectorAll('section');
  
    function setActiveLink() {
      let current = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 100) {
          current = section.getAttribute('id');
        }
      });
  
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });
    }
  
    setActiveLink();
  
    window.addEventListener('scroll', setActiveLink);
  
    const heroContent = document.querySelector('.hero-content');
  
    window.addEventListener('scroll', () => {
      if (heroContent) {
        const scrollValue = window.scrollY;
        if (scrollValue < window.innerHeight) {
          heroContent.style.transform = `translateY(${scrollValue * 0.1}px)`;
        }
      }
    });
  
    const socialLinks = document.querySelectorAll('.social-link');
  
    socialLinks.forEach((link, index) => {
      link.style.opacity = '0';
      link.style.transform = 'translateY(10px)';
  
      setTimeout(() => {
        link.style.transition = 'all 0.3s ease';
        link.style.opacity = '1';
        link.style.transform = 'translateY(0)';
      }, 300 + (index * 100));
    });
  });
  