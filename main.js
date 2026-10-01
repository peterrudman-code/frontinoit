document.addEventListener('DOMContentLoaded', () => {
  // --- Header Scroll Effect ---
  const header = document.getElementById('site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // --- Mobile Navigation Menu Toggle ---
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', isOpen);
      
      // Close icon or Hamburger icon toggle (optional visual enhancement)
      if (isOpen) {
        menuToggle.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;
      } else {
        menuToggle.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="12" x2="20" y2="12"></line><line x1="4" y1="6" x2="20" y2="6"></line><line x1="4" y1="18" x2="20" y2="18"></line></svg>`;
      }
    });

    // Close menu when clicking a nav link
    const navLinks = navMenu.querySelectorAll('.nav-link, .btn');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="12" x2="20" y2="12"></line><line x1="4" y1="6" x2="20" y2="6"></line><line x1="4" y1="18" x2="20" y2="18"></line></svg>`;
      });
    });

    // Close menu when pressing Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.focus();
        menuToggle.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="12" x2="20" y2="12"></line><line x1="4" y1="6" x2="20" y2="6"></line><line x1="4" y1="18" x2="20" y2="18"></line></svg>`;
      }
    });
  }

  // --- Scroll Entrance Animations (Intersection Observer) ---
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Unobserve once shown to prevent repeats on scroll up/down
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  reveals.forEach(reveal => {
    revealObserver.observe(reveal);
  });

  // --- Form Validation Helpers ---
  function showFeedback(el, text, type) {
    el.textContent = text;
    el.className = 'form-feedback'; // reset
    
    if (type === 'success') {
      el.classList.add('success');
      el.style.display = 'block';
      el.style.backgroundColor = 'rgba(252, 163, 17, 0.1)';
      el.style.color = '#FCA311';
      el.style.border = '1px solid rgba(252, 163, 17, 0.2)';
    } else if (type === 'error') {
      el.style.display = 'block';
      el.style.backgroundColor = 'rgba(255, 77, 77, 0.1)';
      el.style.color = '#ff4d4d';
      el.style.border = '1px solid rgba(255, 77, 77, 0.2)';
    } else if (type === 'pending') {
      el.style.display = 'block';
      el.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
      el.style.color = '#ffffff';
      el.style.border = '1px solid rgba(255, 255, 255, 0.1)';
    }
  }

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.toLowerCase());
  }

  // --- Contact Discovery Form ---
  const discoveryForm = document.getElementById('discovery-form');
  if (discoveryForm) {
    const fb = discoveryForm.querySelector('#form-feedback') || document.getElementById('form-feedback');
    discoveryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = discoveryForm.querySelector('#form-name').value.trim();
      const email = discoveryForm.querySelector('#form-email').value.trim();
      const company = discoveryForm.querySelector('#form-company').value.trim();
      const message = discoveryForm.querySelector('#form-message').value.trim();
      
      if (!name || !email || !company || !message) {
        showFeedback(fb, 'Please fill out all fields.', 'error');
        return;
      }
      
      if (!validateEmail(email)) {
        showFeedback(fb, 'Please enter a valid work email address.', 'error');
        return;
      }

      showFeedback(fb, 'Sending message...', 'pending');
      
      setTimeout(() => {
        showFeedback(fb, 'Thank you! Your discovery request has been received. One of our senior architects will reach out shortly.', 'success');
        discoveryForm.reset();
      }, 1200);
    });
  }

  // --- Readiness Assessment Form ---
  const readinessForm = document.getElementById('readiness-form');
  if (readinessForm) {
    const fb = readinessForm.querySelector('#form-feedback') || document.getElementById('form-feedback');
    readinessForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = readinessForm.querySelector('#form-name').value.trim();
      const email = readinessForm.querySelector('#form-email').value.trim();
      const company = readinessForm.querySelector('#form-company').value.trim();
      const system = readinessForm.querySelector('#form-system').value;
      const timeline = readinessForm.querySelector('#form-timeline').value;
      const challenge = readinessForm.querySelector('#form-challenge').value.trim();
      
      if (!name || !email || !company || !system || !timeline || !challenge) {
        showFeedback(fb, 'Please fill out all fields.', 'error');
        return;
      }
      
      if (!validateEmail(email)) {
        showFeedback(fb, 'Please enter a valid work email address.', 'error');
        return;
      }

      showFeedback(fb, 'Sending assessment request...', 'pending');
      
      setTimeout(() => {
        showFeedback(fb, 'Thank you! Your readiness assessment request has been received. Our team will contact you to schedule the kickoff.', 'success');
        readinessForm.reset();
      }, 1200);
    });
  }

  // --- GROW Fast Workshop Form ---
  const workshopForm = document.getElementById('workshop-form');
  if (workshopForm) {
    const fb = workshopForm.querySelector('#form-feedback') || document.getElementById('form-feedback');
    workshopForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = workshopForm.querySelector('#form-name').value.trim();
      const email = workshopForm.querySelector('#form-email').value.trim();
      const company = workshopForm.querySelector('#form-company').value.trim();
      const role = workshopForm.querySelector('#form-role').value.trim();
      const date = workshopForm.querySelector('#form-date').value;
      const packageSelected = workshopForm.querySelector('#form-package').value;
      
      if (!name || !email || !company || !role || !date || !packageSelected) {
        showFeedback(fb, 'Please fill out all fields.', 'error');
        return;
      }
      
      if (!validateEmail(email)) {
        showFeedback(fb, 'Please enter a valid work email address.', 'error');
        return;
      }

      showFeedback(fb, 'Booking workshop...', 'pending');
      
      setTimeout(() => {
        showFeedback(fb, 'Thank you! Your workshop booking has been received. Our team will contact you to confirm the date and share the agenda.', 'success');
        workshopForm.reset();
      }, 1200);
    });
  }

  // --- BTP Use Case Form ---
  const btpForm = document.getElementById('btp-form');
  if (btpForm) {
    const fb = btpForm.querySelector('#form-feedback') || document.getElementById('form-feedback');
    btpForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = btpForm.querySelector('#form-name').value.trim();
      const email = btpForm.querySelector('#form-email').value.trim();
      const company = btpForm.querySelector('#form-company').value.trim();
      const system = btpForm.querySelector('#form-system').value;
      const usecase = btpForm.querySelector('#form-usecase').value.trim();
      const outcome = btpForm.querySelector('#form-outcome').value.trim();
      
      if (!name || !email || !company || !system || !usecase || !outcome) {
        showFeedback(fb, 'Please fill out all fields.', 'error');
        return;
      }
      
      if (!validateEmail(email)) {
        showFeedback(fb, 'Please enter a valid work email address.', 'error');
        return;
      }

      showFeedback(fb, 'Sending BTP consultation request...', 'pending');
      
      setTimeout(() => {
        showFeedback(fb, 'Thank you! Your BTP use case submission has been received. A senior BTP architect will reach out to schedule a technical alignment call.', 'success');
        btpForm.reset();
      }, 1200);
    });
  }

  // --- Partner Collaboration Form ---
  const partnerForm = document.getElementById('partner-form');
  if (partnerForm) {
    const fb = partnerForm.querySelector('#form-feedback') || document.getElementById('form-feedback');
    partnerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = partnerForm.querySelector('#form-name').value.trim();
      const email = partnerForm.querySelector('#form-email').value.trim();
      const company = partnerForm.querySelector('#form-company').value.trim();
      const partnerType = partnerForm.querySelector('#form-partner-type').value;
      const projectNeeds = partnerForm.querySelector('#form-project-needs').value;
      const profiles = partnerForm.querySelector('#form-profiles').value;
      const message = partnerForm.querySelector('#form-message').value.trim();
      
      if (!name || !email || !company || !partnerType || !projectNeeds || !profiles || !message) {
        showFeedback(fb, 'Please fill out all fields.', 'error');
        return;
      }
      
      if (!validateEmail(email)) {
        showFeedback(fb, 'Please enter a valid work email address.', 'error');
        return;
      }

      showFeedback(fb, 'Sending partner inquiry...', 'pending');
      
      setTimeout(() => {
        showFeedback(fb, 'Thank you! Your partner collaboration inquiry has been received. A senior delivery lead will reach out to discuss project alignment and capacity.', 'success');
        partnerForm.reset();
      }, 1200);
    });
  }

  // --- Clean Core Assessment Form ---
  const cleancoreFormSubmit = document.getElementById('cleancore-form-submit');
  if (cleancoreFormSubmit) {
    const fb = cleancoreFormSubmit.querySelector('#form-feedback') || document.getElementById('form-feedback');
    cleancoreFormSubmit.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = cleancoreFormSubmit.querySelector('#form-name').value.trim();
      const email = cleancoreFormSubmit.querySelector('#form-email').value.trim();
      const company = cleancoreFormSubmit.querySelector('#form-company').value.trim();
      const system = cleancoreFormSubmit.querySelector('#form-system').value;
      const volume = cleancoreFormSubmit.querySelector('#form-volume').value;
      const goal = cleancoreFormSubmit.querySelector('#form-goal').value.trim();
      if (!name || !email || !company || !system || !volume || !goal) {
        showFeedback(fb, 'Please fill out all required fields.', 'error');
        return;
      }
      if (!validateEmail(email)) {
        showFeedback(fb, 'Please enter a valid work email address.', 'error');
        return;
      }
      showFeedback(fb, 'Submitting your request...', 'pending');
      setTimeout(() => {
        showFeedback(fb, 'Thank you! Your assessment request has been received. A senior architect will confirm the scope and next steps within one business day.', 'success');
        cleancoreFormSubmit.reset();
      }, 1200);
    });
  }

  // --- BTP Integration Sprint Form ---
  const sprintFormSubmit = document.getElementById('sprint-form-submit');
  if (sprintFormSubmit) {
    const fb = sprintFormSubmit.querySelector('#form-feedback') || document.getElementById('form-feedback');
    sprintFormSubmit.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = sprintFormSubmit.querySelector('#form-name').value.trim();
      const email = sprintFormSubmit.querySelector('#form-email').value.trim();
      const company = sprintFormSubmit.querySelector('#form-company').value.trim();
      const system = sprintFormSubmit.querySelector('#form-system').value;
      const usecase = sprintFormSubmit.querySelector('#form-usecase').value.trim();
      const outcome = sprintFormSubmit.querySelector('#form-outcome').value.trim();
      if (!name || !email || !company || !system || !usecase || !outcome) {
        showFeedback(fb, 'Please fill out all required fields.', 'error');
        return;
      }
      if (!validateEmail(email)) {
        showFeedback(fb, 'Please enter a valid work email address.', 'error');
        return;
      }
      showFeedback(fb, 'Submitting your request...', 'pending');
      setTimeout(() => {
        showFeedback(fb, 'Thank you! Your sprint request has been received. We will review your scenario and respond within one business day.', 'success');
        sprintFormSubmit.reset();
      }, 1200);
    });
  }

  // --- Assessment Landing Form ---
  const assessmentFormSubmit = document.getElementById('assessment-form-submit');
  if (assessmentFormSubmit) {
    const fb = assessmentFormSubmit.querySelector('#form-feedback') || document.getElementById('form-feedback');
    assessmentFormSubmit.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = assessmentFormSubmit.querySelector('#form-name').value.trim();
      const email = assessmentFormSubmit.querySelector('#form-email').value.trim();
      const company = assessmentFormSubmit.querySelector('#form-company').value.trim();
      const system = assessmentFormSubmit.querySelector('#form-system').value;
      const timeline = assessmentFormSubmit.querySelector('#form-timeline').value;
      const challenge = assessmentFormSubmit.querySelector('#form-challenge').value.trim();
      if (!name || !email || !company || !system || !timeline || !challenge) {
        showFeedback(fb, 'Please fill out all required fields.', 'error');
        return;
      }
      if (!validateEmail(email)) {
        showFeedback(fb, 'Please enter a valid work email address.', 'error');
        return;
      }
      showFeedback(fb, 'Submitting your request...', 'pending');
      setTimeout(() => {
        showFeedback(fb, 'Thank you! Your assessment request has been received. A senior architect will confirm scope and next steps within one business day.', 'success');
        assessmentFormSubmit.reset();
      }, 1200);
    });
  }

  // --- Contact Main Form ---
  const contactMainForm = document.getElementById('contact-main-form');
  if (contactMainForm) {
    const fb = contactMainForm.querySelector('#form-feedback') || document.getElementById('form-feedback');
    contactMainForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = contactMainForm.querySelector('#form-name').value.trim();
      const email = contactMainForm.querySelector('#form-email').value.trim();
      const company = contactMainForm.querySelector('#form-company').value.trim();
      const inquiry = contactMainForm.querySelector('#form-inquiry').value;
      const message = contactMainForm.querySelector('#form-message').value.trim();

      if (!name || !email || !company || !inquiry || !message) {
        showFeedback(fb, 'Please fill out all required fields.', 'error');
        return;
      }

      if (!validateEmail(email)) {
        showFeedback(fb, 'Please enter a valid work email address.', 'error');
        return;
      }

      showFeedback(fb, 'Sending your message...', 'pending');

      setTimeout(() => {
        showFeedback(fb, 'Thank you! Your message has been received. A senior architect will respond within one business day.', 'success');
        contactMainForm.reset();
      }, 1200);
    });
  }

  // --- Enterprise AI for SAP Form ---
  const enterpriseAiFormSubmit = document.getElementById('enterprise-ai-form-submit');
  if (enterpriseAiFormSubmit) {
    const fb = enterpriseAiFormSubmit.querySelector('#form-feedback') || document.getElementById('form-feedback');
    enterpriseAiFormSubmit.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = enterpriseAiFormSubmit.querySelector('#form-name').value.trim();
      const email = enterpriseAiFormSubmit.querySelector('#form-email').value.trim();
      const company = enterpriseAiFormSubmit.querySelector('#form-company').value.trim();
      const sapSystem = enterpriseAiFormSubmit.querySelector('#form-sap-system').value;
      const processArea = enterpriseAiFormSubmit.querySelector('#form-process-area').value;
      const situation = enterpriseAiFormSubmit.querySelector('#form-situation').value.trim();
      if (!name || !email || !company || !sapSystem || !processArea || !situation) {
        showFeedback(fb, 'Please fill out all required fields.', 'error');
        return;
      }
      if (!validateEmail(email)) {
        showFeedback(fb, 'Please enter a valid work email address.', 'error');
        return;
      }
      showFeedback(fb, 'Submitting your request...', 'pending');
      setTimeout(() => {
        showFeedback(fb, 'Thank you! Your request has been received. A senior SAP AI architect will contact you within one business day to discuss use case discovery and scoping.', 'success');
        enterpriseAiFormSubmit.reset();
      }, 1200);
    });
  }

  // --- BTP Managed Services Form ---
  const managedServicesFormSubmit = document.getElementById('managed-services-form-submit');
  if (managedServicesFormSubmit) {
    const fb = managedServicesFormSubmit.querySelector('#form-feedback') || document.getElementById('form-feedback');
    managedServicesFormSubmit.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = managedServicesFormSubmit.querySelector('#form-name').value.trim();
      const email = managedServicesFormSubmit.querySelector('#form-email').value.trim();
      const company = managedServicesFormSubmit.querySelector('#form-company').value.trim();
      const btpComponents = managedServicesFormSubmit.querySelector('#form-btp-components').value;
      const integrations = managedServicesFormSubmit.querySelector('#form-integrations').value;
      const situation = managedServicesFormSubmit.querySelector('#form-situation').value.trim();
      if (!name || !email || !company || !btpComponents || !integrations || !situation) {
        showFeedback(fb, 'Please fill out all required fields.', 'error');
        return;
      }
      if (!validateEmail(email)) {
        showFeedback(fb, 'Please enter a valid work email address.', 'error');
        return;
      }
      showFeedback(fb, 'Submitting your request...', 'pending');
      setTimeout(() => {
        showFeedback(fb, 'Thank you! Your managed services request has been received. A senior BTP architect will contact you within one business day to discuss coverage and onboarding.', 'success');
        managedServicesFormSubmit.reset();
      }, 1200);
    });
  }

  // --- GROW Fast Workshop Form ---
  const workshopFormSubmit = document.getElementById('workshop-form-submit');
  if (workshopFormSubmit) {
    const fb = workshopFormSubmit.querySelector('#form-feedback') || document.getElementById('form-feedback');
    workshopFormSubmit.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = workshopFormSubmit.querySelector('#form-name').value.trim();
      const email = workshopFormSubmit.querySelector('#form-email').value.trim();
      const company = workshopFormSubmit.querySelector('#form-company').value.trim();
      const currentSystem = workshopFormSubmit.querySelector('#form-current-system').value;
      const targetGolive = workshopFormSubmit.querySelector('#form-target-golive').value;
      const situation = workshopFormSubmit.querySelector('#form-situation').value.trim();
      if (!name || !email || !company || !currentSystem || !targetGolive || !situation) {
        showFeedback(fb, 'Please fill out all required fields.', 'error');
        return;
      }
      if (!validateEmail(email)) {
        showFeedback(fb, 'Please enter a valid work email address.', 'error');
        return;
      }
      showFeedback(fb, 'Submitting your request...', 'pending');
      setTimeout(() => {
        showFeedback(fb, 'Thank you! Your workshop request has been received. A senior architect will contact you within one business day to discuss scope and logistics.', 'success');
        workshopFormSubmit.reset();
      }, 1200);
    });
  }

  // --- Hypercare 360 Form ---
  const hypercareFormSubmit = document.getElementById('hypercare-form-submit');
  if (hypercareFormSubmit) {
    const fb = hypercareFormSubmit.querySelector('#form-feedback') || document.getElementById('form-feedback');
    hypercareFormSubmit.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = hypercareFormSubmit.querySelector('#form-name').value.trim();
      const email = hypercareFormSubmit.querySelector('#form-email').value.trim();
      const company = hypercareFormSubmit.querySelector('#form-company').value.trim();
      const golive = hypercareFormSubmit.querySelector('#form-golive').value;
      const pkg = hypercareFormSubmit.querySelector('#form-package').value;
      const situation = hypercareFormSubmit.querySelector('#form-situation').value.trim();
      if (!name || !email || !company || !golive || !pkg || !situation) {
        showFeedback(fb, 'Please fill out all required fields.', 'error');
        return;
      }
      if (!validateEmail(email)) {
        showFeedback(fb, 'Please enter a valid work email address.', 'error');
        return;
      }
      showFeedback(fb, 'Submitting your request...', 'pending');
      setTimeout(() => {
        showFeedback(fb, 'Thank you! Your Hypercare 360 request has been received. A senior architect will contact you within one business day to confirm scope and coverage model.', 'success');
        hypercareFormSubmit.reset();
      }, 1200);
    });
  }

  // --- About Contact Form ---
  const aboutContactForm = document.getElementById('about-contact-form');
  if (aboutContactForm) {
    const fb = aboutContactForm.querySelector('#form-feedback') || document.getElementById('form-feedback');
    aboutContactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = aboutContactForm.querySelector('#form-name').value.trim();
      const email = aboutContactForm.querySelector('#form-email').value.trim();
      const company = aboutContactForm.querySelector('#form-company').value.trim();
      const message = aboutContactForm.querySelector('#form-message').value.trim();

      if (!name || !email || !company || !message) {
        showFeedback(fb, 'Please fill out all fields.', 'error');
        return;
      }

      if (!validateEmail(email)) {
        showFeedback(fb, 'Please enter a valid work email address.', 'error');
        return;
      }

      showFeedback(fb, 'Sending your message...', 'pending');

      setTimeout(() => {
        showFeedback(fb, 'Thank you! Your message has been received. A senior architect will be in touch shortly.', 'success');
        aboutContactForm.reset();
      }, 1200);
    });
  }
});


// ============================================================
// DYNAMIC EFFECTS
// ============================================================

// --- 1. Reading Progress Bar ---
(function () {
  const bar = document.createElement('div');
  bar.id = 'reading-progress';
  document.body.prepend(bar);
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const total = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (total > 0 ? (scrolled / total) * 100 : 0) + '%';
  }, { passive: true });
})();

// --- 2. Page Fade Transition ---
(function () {
  document.body.classList.add('page-ready');
  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.endsWith('.html') && !href.startsWith('http') && !href.startsWith('//')) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        document.body.classList.add('page-exit');
        setTimeout(() => { window.location.href = href; }, 280);
      });
    }
  });
})();

// --- 3. Active Nav Link (current page highlight) ---
(function () {
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    if (link.getAttribute('href') === current) {
      link.classList.add('nav-active');
    }
  });
})();

// --- 4. Counter Animation (elements with data-count attribute) ---
(function () {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      const prefix = el.dataset.prefix || '';
      const decimals = (el.dataset.count.includes('.')) ? el.dataset.count.split('.')[1].length : 0;
      const duration = 1600;
      const startTime = performance.now();
      function tick(now) {
        const p = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        const val = (eased * target).toFixed(decimals);
        el.textContent = prefix + val + suffix;
        if (p < 1) requestAnimationFrame(tick);
        else el.textContent = prefix + target.toFixed(decimals) + suffix;
      }
      requestAnimationFrame(tick);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(c => observer.observe(c));
})();

// --- 5. Progress Bar Animation (elements with data-progress attribute) ---
(function () {
  const bars = document.querySelectorAll('.progress-bar[data-progress]');
  if (!bars.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const bar = entry.target;
      const target = parseInt(bar.dataset.progress, 10);
      bar.style.width = target + '%';
      observer.unobserve(bar);
    });
  }, { threshold: 0.4 });
  bars.forEach(b => observer.observe(b));
})();

// --- 6. Typing Effect on Landing Hero H1 ---
(function () {
  const h1 = document.querySelector('.landing-hero h1');
  if (!h1) return;
  const fullText = h1.textContent.trim();
  h1.textContent = '';
  h1.style.borderRight = '2px solid var(--color-orange)';
  let i = 0;
  function type() {
    if (i < fullText.length) {
      h1.textContent += fullText[i++];
      setTimeout(type, i < 10 ? 60 : 28);
    } else {
      setTimeout(() => { h1.style.borderRight = 'none'; }, 500);
    }
  }
  setTimeout(type, 600);
})();

// --- Motion: staggered lists, grids, title underlines and counters ---
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const STEP = 0.18; // seconds between list items
  const onVisible = (el, cb, threshold = 0.25) => {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          cb(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold, rootMargin: '0px 0px -40px 0px' });
    io.observe(el);
  };

  // Once a .reveal element has finished appearing, drop the reveal classes so
  // hover effects (card lift) work and transition delays no longer apply.
  document.querySelectorAll('.reveal').forEach(el => {
    el.addEventListener('transitionend', function done(e) {
      if (e.target !== el || e.propertyName !== 'opacity' || !el.classList.contains('active')) return;
      el.removeEventListener('transitionend', done);
      el.style.transitionDelay = '';
      el.classList.add('revealed');
      el.classList.remove('reveal', 'active');
    });
  });

  // Lists whose items appear one by one
  const lists = document.querySelectorAll('.pain-list, .benefit-list, .vdh-feature-modules, .trust-strip .container, .hero-actions');
  lists.forEach(list => {
    list.classList.add('stagger-list');
    [...list.children].forEach((item, i) => item.style.setProperty('--i', i));
  });

  // Challenge → Outcome (desktop): outcome block and its items follow the challenge items
  const paired = new Set();
  if (window.matchMedia('(min-width: 1025px)').matches) {
    document.querySelectorAll('.problem-impact-grid').forEach(grid => {
      const pain = grid.querySelector('.pain-list');
      const benefit = grid.querySelector('.benefit-list');
      const impact = grid.querySelector('.impact-block');
      if (!pain || !benefit || !impact) return;
      const impactDelay = 0.35 + pain.children.length * STEP + 0.3;
      grid.classList.add('paired');
      impact.style.transitionDelay = impactDelay + 's';
      pain.style.setProperty('--base', '0.35s');
      benefit.style.setProperty('--base', (impactDelay + 0.45) + 's');
      paired.add(pain);
      paired.add(benefit);
      onVisible(grid, () => {
        pain.classList.add('is-in');
        benefit.classList.add('is-in');
      }, 0.2);
    });
  }
  lists.forEach(list => {
    if (!paired.has(list)) onVisible(list, l => l.classList.add('is-in'));
  });

  // Cards in the same grid appear in sequence instead of all at once
  document.querySelectorAll('.services-grid, .use-cases-grid, .methodology-flow, .info-cards, .team-grid').forEach(grid => {
    [...grid.children].filter(c => c.classList.contains('reveal')).forEach((card, i) => {
      card.style.transitionDelay = ((i % 4) * 0.12) + 's';
    });
  });

  // Orange underline under section titles draws in
  document.querySelectorAll('h2.accent-title').forEach(title => {
    title.classList.add('underline-anim');
    onVisible(title, t => t.classList.add('drawn'), 0.6);
  });

  // Result figures count up ("85% Faster Approvals")
  document.querySelectorAll('.outcome-stat').forEach(stat => {
    const m = stat.textContent.trim().match(/^(\d+(?:\.\d+)?)(.*)$/);
    if (!m) return;
    const target = parseFloat(m[1]);
    const decimals = (m[1].split('.')[1] || '').length;
    const rest = m[2];
    stat.textContent = (0).toFixed(decimals) + rest;
    onVisible(stat, () => {
      const start = performance.now();
      const dur = 1400;
      const tick = now => {
        const p = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        stat.textContent = (target * eased).toFixed(decimals) + rest;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, 0.6);
  });
})();

// --- Mobile forms: the info block stays in place and the form slides over it ---
(function () {
  const pairs = [];
  document.querySelectorAll('.contact-form-container').forEach(form => {
    const grid = form.parentElement;
    const info = [...grid.children].find(el => el !== form && (el.classList.contains('contact-info') || el.classList.contains('contact-sidebar')));
    if (info && grid.firstElementChild === info) pairs.push({ info, form });
  });
  if (!pairs.length) return;

  const mobile = window.matchMedia('(max-width: 1024px)');
  const header = document.getElementById('site-header');

  const layout = () => {
    pairs.forEach(({ info, form }) => {
      if (!mobile.matches) {
        info.classList.remove('stack-under');
        form.classList.remove('stack-over');
        info.style.top = '';
        return;
      }
      // Stick only once the whole block has been seen: if it is taller than the
      // screen, it scrolls until its bottom edge is visible, then stays.
      const headerH = header ? header.offsetHeight : 80;
      const top = Math.min(headerH + 16, window.innerHeight - info.offsetHeight - 16);
      info.style.top = top + 'px';
      info.classList.add('stack-under');
      form.classList.add('stack-over');
    });
  };
  layout();
  window.addEventListener('resize', layout);
  window.addEventListener('load', layout);
})();
