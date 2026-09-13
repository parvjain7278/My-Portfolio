/**
 * Parv Jain - Modern Portfolio Script
 * Pure Vanilla JavaScript (ES6+)
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initCanvasBackground();
  initTypewriter();
  initNavbar();
  initPhotoSwitcher();
  initProjectFilters();
  initModals();
  initResumeSwitcher();
  initDocViewer();
  initResumeUploader();
  initCardGlow();
  initCopyButtons();
  initContactForm();
  initBackToTop();
  updateCopyrightYear();
});

/* --------------------------------------------------------------------------
   1. Theme Management (Dark / Light Mode)
   -------------------------------------------------------------------------- */
function initTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('pj_theme') || 'dark';

  document.documentElement.setAttribute('data-theme', savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('pj_theme', newTheme);
      showToast(`Switched to ${newTheme} mode`);
    });
  }
}

/* --------------------------------------------------------------------------
   2. Subtle Interactive Particle Canvas Background
   -------------------------------------------------------------------------- */
function initCanvasBackground() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particleCount = Math.min(Math.floor((width * height) / 22000), 55);
  const particles = [];

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 1.8 + 0.8,
      alpha: Math.random() * 0.4 + 0.2
    });
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const particleColor = isDark ? 'rgba(56, 189, 248, ' : 'rgba(2, 132, 199, ';
    const lineColor = isDark ? 'rgba(99, 102, 241, ' : 'rgba(79, 70, 229, ';

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = particleColor + p.alpha + ')';
      ctx.fill();

      // Connect nearby particles
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 110) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = lineColor + (0.12 * (1 - dist / 110)) + ')';
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}

/* --------------------------------------------------------------------------
   3. Typewriter Subtitle Animation
   -------------------------------------------------------------------------- */
function initTypewriter() {
  const typewriterElem = document.getElementById('typewriter');
  if (!typewriterElem) return;

  const roles = [
    'IoT & Cybersecurity Specialist',
    'Front-End Web Developer',
    'B.Tech Student (IoT & Blockchain)',
    'Problem Solver & C++ Programmer',
    'TCS Ninja Select Candidate'
  ];

  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typingSpeed = 90;

  function typeStep() {
    const currentRole = roles[roleIdx];

    if (isDeleting) {
      typewriterElem.textContent = currentRole.substring(0, charIdx - 1);
      charIdx--;
      typingSpeed = 45;
    } else {
      typewriterElem.textContent = currentRole.substring(0, charIdx + 1);
      charIdx++;
      typingSpeed = 90;
    }

    if (!isDeleting && charIdx === currentRole.length) {
      // Pause at full word
      typingSpeed = 1800;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      typingSpeed = 400;
    }

    setTimeout(typeStep, typingSpeed);
  }

  setTimeout(typeStep, 600);
}

/* --------------------------------------------------------------------------
   4. Navbar Behavior, Mobile Menu & Scroll Spy
   -------------------------------------------------------------------------- */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  // Scrolled header background
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Scroll spy for active section highlight
    let currentSectionId = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentSectionId = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });

  // Mobile Menu Toggle
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', !isExpanded);
      menuToggle.classList.toggle('active');
      navMenu.classList.toggle('open');
    });

    // Close menu when clicking link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('open');
      });
    });
  }
}

/* --------------------------------------------------------------------------
   5. Projects Filtering
   -------------------------------------------------------------------------- */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   5b. Photo Switcher & Lightbox Trigger
   -------------------------------------------------------------------------- */
function initPhotoSwitcher() {
  const switchBtns = document.querySelectorAll('.photo-switch-btn');
  const mainImg = document.getElementById('main-profile-img');
  const profileCard = document.getElementById('profile-card');
  const photoModal = document.getElementById('photo-lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxSubtitle = document.getElementById('lightbox-subtitle');

  switchBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      switchBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const src = btn.getAttribute('data-src');
      const pos = btn.getAttribute('data-pos') || 'center center';
      const caption = btn.getAttribute('data-caption') || 'Parv Jain';
      const isNcc = src.includes('profile.jpg') || src.includes('profile_ncc');

      if (mainImg) {
        mainImg.style.opacity = '0.3';
        setTimeout(() => {
          mainImg.src = src;
          mainImg.style.objectPosition = pos;
          mainImg.style.opacity = '1';
        }, 150);
      }

      if (lightboxImg) lightboxImg.src = src;
      if (lightboxTitle) lightboxTitle.textContent = isNcc ? 'Parv Jain - NCC Senior Cadet' : 'Parv Jain - Professional Portrait';
      if (lightboxSubtitle) lightboxSubtitle.textContent = caption;

      showToast(`Viewing ${btn.textContent.trim()}`);
    });
  });

  if (profileCard && photoModal) {
    profileCard.addEventListener('click', () => {
      photoModal.classList.add('active');
      photoModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
  }
}

/* --------------------------------------------------------------------------
   6. Modals (Project Detail, Resume Preview & Photo Lightbox)
   -------------------------------------------------------------------------- */
function initModals() {
  const modalTriggers = document.querySelectorAll('.modal-trigger');
  const openResumeBtn = document.getElementById('open-resume-btn');
  const printResumeBtn = document.getElementById('print-resume-btn');
  const resumeModal = document.getElementById('resume-modal');

  // Trigger project modals
  modalTriggers.forEach(btn => {
    btn.addEventListener('click', () => {
      const modalId = btn.getAttribute('data-modal');
      const targetModal = document.getElementById(modalId);
      if (targetModal) openModal(targetModal);
    });
  });

  // Trigger Resume Modal
  if (openResumeBtn && resumeModal) {
    openResumeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(resumeModal);
    });
  }

  if (printResumeBtn && resumeModal) {
    printResumeBtn.addEventListener('click', () => {
      openModal(resumeModal);
    });
  }

  // Close Modals
  const allModals = document.querySelectorAll('.modal');
  allModals.forEach(modal => {
    const closeBtn = modal.querySelector('.modal-close');
    const backdrop = modal.querySelector('.modal-backdrop');

    if (closeBtn) {
      closeBtn.addEventListener('click', () => closeModal(modal));
    }
    if (backdrop) {
      backdrop.addEventListener('click', () => closeModal(modal));
    }
  });

  // Close on ESC key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      allModals.forEach(modal => {
        if (modal.classList.contains('active')) {
          closeModal(modal);
        }
      });
    }
  });

  function openModal(modal) {
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(modal) {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    // Stop videos or audio inside modals when closed
    const iframes = modal.querySelectorAll('iframe');
    iframes.forEach(iframe => {
      const currentSrc = iframe.src;
      iframe.src = '';
      if (!modal.id.includes('cert-viewer')) {
        iframe.src = currentSrc;
      }
    });
  }
}

/* --------------------------------------------------------------------------
   7. Copy to Clipboard Handlers
   -------------------------------------------------------------------------- */
function initCopyButtons() {
  const copyButtons = document.querySelectorAll('.copy-btn');

  copyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast(`Copied to clipboard: ${textToCopy}`);
      }).catch(() => {
        // Fallback
        const tempInput = document.createElement('input');
        tempInput.value = textToCopy;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        showToast(`Copied to clipboard: ${textToCopy}`);
      });
    });
  });
}

/* --------------------------------------------------------------------------
   8. Contact Form Client-Side Handling
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const subjectInput = document.getElementById('subject');
  const messageInput = document.getElementById('message');

  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const subjectError = document.getElementById('subject-error');
  const messageError = document.getElementById('message-error');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    // Reset error messages
    nameError.textContent = '';
    emailError.textContent = '';
    subjectError.textContent = '';
    messageError.textContent = '';

    // Validate Name
    if (!nameInput.value.trim()) {
      nameError.textContent = 'Please provide your full name.';
      isValid = false;
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
      emailError.textContent = 'Please enter a valid email address.';
      isValid = false;
    }

    // Validate Subject
    if (!subjectInput.value.trim()) {
      subjectError.textContent = 'Please enter a subject.';
      isValid = false;
    }

    // Validate Message
    if (!messageInput.value.trim()) {
      messageError.textContent = 'Please write your message.';
      isValid = false;
    }

    if (isValid) {
      const senderName = nameInput.value.trim();
      // Simulate successful dispatch
      showToast(`Thank you, ${senderName}! Your message has been prepared.`);
      form.reset();
    }
  });
}

/* --------------------------------------------------------------------------
   9. Scroll To Top Button
   -------------------------------------------------------------------------- */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* --------------------------------------------------------------------------
   10. Toast Notification Helper
   -------------------------------------------------------------------------- */
let toastTimeout;
function showToast(message) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-message');
  if (!toast || !toastMsg) return;

  toastMsg.textContent = message;
  toast.classList.add('show');

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

/* --------------------------------------------------------------------------
   11. Year in Footer
   -------------------------------------------------------------------------- */
function updateCopyrightYear() {
  const yearElem = document.getElementById('current-year');
  if (yearElem) {
    yearElem.textContent = new Date().getFullYear();
  }
}

/* --------------------------------------------------------------------------
   12. Dynamic Resume Uploader (In-Browser Client-Side Storage & Preview)
   -------------------------------------------------------------------------- */
function initResumeUploader() {
  const toggleBtn = document.getElementById('toggle-resume-upload-btn');
  const drawer = document.getElementById('resume-upload-drawer');
  const dropzone = document.getElementById('resume-dropzone');
  const fileInput = document.getElementById('resume-file-input');
  const triggerBrowseBtn = document.getElementById('trigger-browse-btn');
  const previewContainer = document.getElementById('resume-preview-container');
  const downloadBtn = document.getElementById('download-resume-btn');
  const resetBtn = document.getElementById('reset-resume-btn');
  const actionsBar = document.getElementById('upload-actions-bar');

  // Load custom resume from localStorage if available
  const savedResume = localStorage.getItem('pj_custom_resume');
  if (savedResume) {
    try {
      const data = JSON.parse(savedResume);
      renderCustomResume(data.url, data.name, data.type);
    } catch (e) {
      console.error('Failed to parse saved resume', e);
    }
  }

  if (toggleBtn && drawer) {
    toggleBtn.addEventListener('click', () => {
      drawer.classList.toggle('open');
      toggleBtn.classList.toggle('active');
    });
  }

  if (triggerBrowseBtn && fileInput) {
    triggerBrowseBtn.addEventListener('click', () => fileInput.click());
  }

  if (dropzone && fileInput) {
    dropzone.addEventListener('click', (e) => {
      if (e.target !== triggerBrowseBtn) {
        fileInput.click();
      }
    });

    ['dragenter', 'dragover'].forEach(eventName => {
      dropzone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropzone.classList.add('dragover');
      });
    });

    ['dragleave', 'drop'].forEach(eventName => {
      dropzone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropzone.classList.remove('dragover');
      });
    });

    dropzone.addEventListener('drop', (e) => {
      const files = e.dataTransfer.files;
      if (files && files.length > 0) {
        handleResumeFile(files[0]);
      }
    });

    fileInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files.length > 0) {
        handleResumeFile(e.target.files[0]);
      }
    });
  }

  function handleResumeFile(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const fileDataUrl = event.target.result;
      const isPdf = file.type === 'application/pdf' || file.name.endsWith('.pdf');
      
      const payload = {
        url: fileDataUrl,
        name: file.name,
        type: isPdf ? 'pdf' : 'image'
      };

      try {
        localStorage.setItem('pj_custom_resume', JSON.stringify(payload));
      } catch (err) {
        console.warn('Storage limit reached, previewing without caching full payload', err);
      }

      renderCustomResume(fileDataUrl, file.name, payload.type);
      showToast(`Resume "${file.name}" uploaded successfully!`);
    };
    reader.readAsDataURL(file);
  }

  function renderCustomResume(url, filename, type) {
    if (!previewContainer) return;
    if (type === 'pdf') {
      previewContainer.innerHTML = `<iframe src="${url}" class="resume-preview-iframe" style="width:100%; height:75vh; border:none; border-radius:8px;"></iframe>`;
    } else {
      previewContainer.innerHTML = `<img src="${url}" alt="${filename}" class="resume-preview-img" style="width:100%; height:auto; display:block;" />`;
    }

    if (downloadBtn) {
      downloadBtn.href = url;
      downloadBtn.download = filename || 'Parv_Jain_Resume';
    }

    if (actionsBar) {
      actionsBar.style.display = 'flex';
    }
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      localStorage.removeItem('pj_custom_resume');
      if (previewContainer) {
        previewContainer.innerHTML = `<img src="assets/resume_preview.png" alt="Parv Jain Resume" class="resume-preview-img" id="main-resume-preview" />`;
      }
      if (downloadBtn) {
        downloadBtn.href = 'assets/resume_preview.png';
        downloadBtn.download = 'Parv_Jain_Resume.png';
      }
      if (actionsBar) {
        actionsBar.style.display = 'none';
      }
      showToast('Reverted to original resume file');
    });
  }
}

/* --------------------------------------------------------------------------
   13. Interactive Card Mouse Glow
   -------------------------------------------------------------------------- */
function initCardGlow() {
  const cards = document.querySelectorAll('.glass-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

/* --------------------------------------------------------------------------
   14. Resume View Switcher (Clean Digital CV vs Scanned Document)
   -------------------------------------------------------------------------- */
function initResumeSwitcher() {
  const btnClean = document.getElementById('btn-mode-clean');
  const btnScan = document.getElementById('btn-mode-scan');
  const cleanSheet = document.getElementById('clean-resume-sheet');
  const scanSheet = document.getElementById('scan-resume-sheet');
  const toggleUploadBtn = document.getElementById('toggle-resume-upload-btn');
  const uploadDrawer = document.getElementById('resume-upload-drawer');

  if (btnClean && btnScan && cleanSheet && scanSheet) {
    btnClean.addEventListener('click', () => {
      btnClean.classList.add('active');
      btnScan.classList.remove('active');
      cleanSheet.style.display = 'block';
      scanSheet.style.display = 'none';
      showToast('Viewing Clean Digital CV');
    });

    btnScan.addEventListener('click', () => {
      btnScan.classList.add('active');
      btnClean.classList.remove('active');
      cleanSheet.style.display = 'none';
      scanSheet.style.display = 'block';
      showToast('Viewing Scanned Document & Uploader');
    });
  }

  // If user clicks "Upload Custom", auto-switch to scan sheet if not visible
  if (toggleUploadBtn && btnScan) {
    toggleUploadBtn.addEventListener('click', () => {
      if (cleanSheet && cleanSheet.style.display !== 'none') {
        btnScan.click();
      }
      if (uploadDrawer && !uploadDrawer.classList.contains('open')) {
        uploadDrawer.classList.add('open');
      }
    });
  }
}

/* --------------------------------------------------------------------------
   15. Document & Certificate Viewer Modal Handler
   -------------------------------------------------------------------------- */
function initDocViewer() {
  const viewBtns = document.querySelectorAll('.cert-view-btn, .marksheet-view-btn, .doc-view-btn');
  const modal = document.getElementById('cert-viewer-modal');
  const iframe = document.getElementById('cert-pdf-iframe');
  const titleElem = document.getElementById('cert-viewer-title');
  const subtitleElem = document.getElementById('cert-viewer-subtitle');
  const downloadLink = document.getElementById('cert-download-link');
  const openTabLink = document.getElementById('cert-open-tab-link');
  const credlyLink = document.getElementById('cert-credly-link');

  if (!modal) return;

  viewBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const docUrl = btn.getAttribute('data-pdf') || btn.getAttribute('data-doc') || '';
      const title = btn.getAttribute('data-title') || 'Official Document';
      const org = btn.getAttribute('data-org') || 'Verified Credential';
      const credly = btn.getAttribute('data-credly') || '';

      if (titleElem) titleElem.textContent = title;
      if (subtitleElem) subtitleElem.textContent = org;
      if (iframe) iframe.src = docUrl;

      if (downloadLink) {
        downloadLink.href = docUrl;
        const filename = docUrl.split('/').pop() || 'document.pdf';
        downloadLink.setAttribute('download', filename);
      }

      if (openTabLink) {
        openTabLink.href = docUrl;
      }

      if (credlyLink) {
        if (credly) {
          credlyLink.href = credly;
          credlyLink.style.display = 'inline-flex';
        } else {
          credlyLink.style.display = 'none';
        }
      }

      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      showToast(`Opening ${title}`);
    });
  });
}



