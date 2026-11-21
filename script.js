// ===== Mobile menu =====
(function () {
  const toggle = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  if (!toggle || !mobileNav) return;
  toggle.addEventListener('click', function () {
    const open = toggle.classList.toggle('open');
    mobileNav.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });
  mobileNav.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      toggle.classList.remove('open');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
})();

// ===== Header scroll state =====
(function () {
  const header = document.querySelector('.site-header');
  if (!header) return;
  const onScroll = function () {
    header.classList.toggle('scrolled', window.scrollY > 20);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
})();

// ===== Reveal on scroll =====
(function () {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  if (!('IntersectionObserver' in window)) {
    els.forEach(function (e) { e.classList.add('in'); });
    return;
  }
  const io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  els.forEach(function (e) { io.observe(e); });
})();

// ===== Enquiry form validation + Formspree =====
(function () {
  const form = document.getElementById('enquiryForm');
  if (!form) return;

  // ============================================================
  // FORMSPREE ENDPOINT — replace the string below with your
  // actual Formspree form URL (e.g. https://formspree.io/f/xxxx).
  // Until this is set, submissions will not reach the showroom.
  // ============================================================
  const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';

  const successBox = form.querySelector('.form-success');
  const failBox = form.querySelector('.form-fail');

  const setError = function (group, msg) {
    group.classList.add('invalid');
    if (msg) {
      const errEl = group.querySelector('.err');
      if (errEl) errEl.textContent = msg;
    }
  };
  const clearError = function (group) {
    group.classList.remove('invalid');
  };

  const validators = {
    name: function (v) {
      if (!v || !v.trim()) return 'Please enter your name.';
      if (v.trim().length < 2) return 'Name is too short.';
      return null;
    },
    mobile: function (v) {
      if (!v || !v.trim()) return 'Please enter your mobile number.';
      const cleaned = v.replace(/\D/g, '');
      if (!/^[6-9]\d{9}$/.test(cleaned)) {
        return 'Enter a valid 10-digit Indian mobile number.';
      }
      return null;
    },
    email: function (v) {
      if (!v || !v.trim()) return null; // optional
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())) {
        return 'Enter a valid email address.';
      }
      return null;
    },
    enquiryType: function (v) {
      if (!v) return 'Please select an enquiry type.';
      return null;
    }
  };

  const validateField = function (name) {
    const input = form.elements[name];
    if (!input) return true;
    const group = input.closest('.form-group');
    const fn = validators[name];
    if (!fn) return true;
    const err = fn(input.value);
    if (err) { setError(group, err); return false; }
    clearError(group);
    return true;
  };

  // live clear on input
  ['name', 'mobile', 'email', 'enquiryType'].forEach(function (name) {
    const input = form.elements[name];
    if (!input) return;
    input.addEventListener('input', function () {
      const group = input.closest('.form-group');
      if (group.classList.contains('invalid')) validateField(name);
    });
    input.addEventListener('change', function () {
      if (name === 'enquiryType') validateField(name);
    });
  });

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    successBox.classList.remove('show');
    failBox.classList.remove('show');

    const nameOk = validateField('name');
    const mobileOk = validateField('mobile');
    const emailOk = validateField('email');
    const typeOk = validateField('enquiryType');

    if (!(nameOk && mobileOk && emailOk && typeOk)) {
      const firstInvalid = form.querySelector('.invalid');
      if (firstInvalid) {
        firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
        const inp = firstInvalid.querySelector('input, select, textarea');
        if (inp) inp.focus();
      }
      return;
    }

    const submitBtn = form.querySelector('[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';

    const endpoint = FORMSPREE_ENDPOINT;
    const configured = endpoint && !endpoint.includes('YOUR_FORM_ID');

    try {
      let ok = false;
      if (configured) {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { Accept: 'application/json' },
          body: new FormData(form)
        });
        ok = res.ok;
      } else {
        // Endpoint not configured yet — do NOT pretend success.
        throw new Error('NOT_CONFIGURED');
      }

      if (ok) {
        successBox.classList.add('show');
        form.reset();
        successBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        throw new Error('REQUEST_FAILED');
      }
    } catch (err) {
      if (err && err.message === 'NOT_CONFIGURED') {
        failBox.textContent = 'The enquiry form is not yet connected to a delivery endpoint. Please call or WhatsApp us at 8522998262, and our team will assist you right away.';
      } else {
        failBox.textContent = 'Something went wrong while submitting your enquiry. Please try again or call us at 8522998262.';
      }
      failBox.classList.add('show');
      failBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  });
})();
