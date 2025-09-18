// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mainNav = document.getElementById('mainNav');

if (mobileMenuBtn && mainNav) {
    mobileMenuBtn.addEventListener('click', () => {
        mainNav.classList.toggle('active');
        mobileMenuBtn.innerHTML = mainNav.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        if (this.getAttribute('href') === '#') return;
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (mainNav && mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                if (mobileMenuBtn) {
                    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                }
            }
        }
    });
});

// Sticky header on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (header) {
        header.classList.toggle('sticky', window.scrollY > 0);
    }
});
// --- Password toggles (register + login)
document.addEventListener('click', function (e) {
  const btn = e.target.closest('.toggle-password');
  if (!btn) return;
  const targetId = btn.getAttribute('data-toggle');
  const input = document.getElementById(targetId);
  if (!input) return;
  input.type = input.type === 'password' ? 'text' : 'password';
  btn.innerHTML = input.type === 'password'
    ? '<i class="fa-regular fa-eye"></i>'
    : '<i class="fa-regular fa-eye-slash"></i>';
});

// --- Register validation (confirm password + basic UX)
(function () {
  const form = document.getElementById('registerForm');
  if (!form) return;
  const pass = document.getElementById('password');
  const confirm = document.getElementById('confirm_password');
  const alertBox = document.getElementById('registerAlert');

  function checkMatch() {
    if (confirm.value !== pass.value) {
      confirm.setCustomValidity("Passwords don't match");
    } else {
      confirm.setCustomValidity('');
    }
  }
  pass.addEventListener('input', checkMatch);
  confirm.addEventListener('input', checkMatch);

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    checkMatch();
    if (!form.checkValidity()) {
      alertBox.className = 'form-alert error';
      alertBox.textContent = 'Please fix the highlighted fields.';
      form.reportValidity();
      return;
    }
    alertBox.className = 'form-alert success';
    alertBox.textContent = 'Account created! (Hook this to your backend.)';
    // TODO: send to backend / redirect
  });
})();

// --- Login handling (placeholder)
(function () {
  const form = document.getElementById('loginForm');
  if (!form) return;
  const alertBox = document.getElementById('loginAlert');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!form.checkValidity()) {
      alertBox.className = 'form-alert error';
      alertBox.textContent = 'Please enter a valid email and password.';
      form.reportValidity();
      return;
    }
    alertBox.className = 'form-alert success';
    alertBox.textContent = 'Logged in! (Connect to your auth service.)';
    // TODO: send to backend / redirect
  });
})();
