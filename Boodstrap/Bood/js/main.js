// Simple contact form validation + SweetAlert + small UI effects
var form = document.getElementById('contactForm');
var nameInput = document.getElementById('fullName');
var emailInput = document.getElementById('emailAddress');
var messageInput = document.getElementById('userQuery');
var navbar = document.getElementById('mainNavbar');

function markValid(input) {
  input.classList.remove('is-invalid');
  input.classList.add('is-valid');
}

function markInvalid(input) {
  input.classList.remove('is-valid');
  input.classList.add('is-invalid');
}

function validateName() {
  var nameRegex = /^[A-Za-z ]{3,}$/;
  var value = nameInput.value.trim();

  if (nameRegex.test(value)) {
    markValid(nameInput);
    return true;
  }

  markInvalid(nameInput);
  return false;
}

function validateEmail() {
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  var value = emailInput.value.trim();

  if (emailRegex.test(value)) {
    markValid(emailInput);
    return true;
  }

  markInvalid(emailInput);
  return false;
}

function validateMessage() {
  var value = messageInput.value.trim();

  if (value.length >= 10) {
    markValid(messageInput);
    return true;
  }

  markInvalid(messageInput);
  return false;
}

if (nameInput) nameInput.addEventListener('keyup', validateName);
if (emailInput) emailInput.addEventListener('keyup', validateEmail);
if (messageInput) messageInput.addEventListener('keyup', validateMessage);

if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var isNameOk = validateName();
    var isEmailOk = validateEmail();
    var isMessageOk = validateMessage();

    if (isNameOk && isEmailOk && isMessageOk) {
      if (window.Swal) {
        Swal.fire({
          icon: 'success',
          title: 'Message Sent',
          text: 'Thank you! Your message has been sent successfully.',
          confirmButtonColor: '#f39c12'
        });
      }

      form.reset();
      nameInput.classList.remove('is-valid');
      emailInput.classList.remove('is-valid');
      messageInput.classList.remove('is-valid');
    } else {
      if (window.Swal) {
        Swal.fire({
          icon: 'error',
          title: 'Validation Error',
          text: 'Please correct the highlighted fields before submitting.',
          confirmButtonColor: '#d33'
        });
      }
    }
  });
}

// Simple navbar shadow on scroll
window.addEventListener('scroll', function () {
  if (!navbar) return;

  if (window.scrollY > 20) {
    navbar.classList.add('nav-scrolled');
  } else {
    navbar.classList.remove('nav-scrolled');
  }
});

// jQuery basic effects (only if jQuery loaded)
if (window.jQuery) {
  $(document).ready(function () {
    $('.carousel').carousel({
      interval: 3500,
      pause: 'hover'
    });

    $('.navbar-nav .nav-link').click(function () {
      $('.navbar-collapse').collapse('hide');
    });

    $('.card').hover(
      function () {
        $(this).css('transform', 'translateY(-6px)');
        $(this).css('transition', '0.2s ease');
      },
      function () {
        $(this).css('transform', 'translateY(0)');
      }
    );

    var revealItems = document.querySelectorAll('.reveal');
    for (var k = 0; k < revealItems.length; k++) {
      revealItems[k].classList.add('show');
    }
  });
}
