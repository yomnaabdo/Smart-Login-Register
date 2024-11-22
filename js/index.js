document.addEventListener("DOMContentLoaded", () => {
  // Helper functions
  function saveAccount(fullName, email, password) {
    const accounts = JSON.parse(localStorage.getItem("accounts")) || [];
    accounts.push({ fullName, email, password });
    localStorage.setItem("accounts", JSON.stringify(accounts));
  }

  function isAccountExists(email) {
    const accounts = JSON.parse(localStorage.getItem("accounts")) || [];
    return accounts.some((account) => account.email === email);
  }

  // Switching between forms
  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");
  const switchToRegister = document.getElementById("switch-to-register");
  const switchToLogin = document.getElementById("switch-to-login");

  switchToRegister.addEventListener("click", () => {
    loginForm.style.display = "none";
    registerForm.style.display = "block";
  });

  switchToLogin.addEventListener("click", () => {
    registerForm.style.display = "none";
    loginForm.style.display = "block";
  });
  // Register form submission
  document.getElementById("register-form").addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent default form submission

    const fullName = document.getElementById("register-name").value.trim();
    const email = document.getElementById("register-email").value.trim();
    const password = document.getElementById("register-password").value.trim();

    const isFullNameValid = validateFullName();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmPassword();

    if (
      isFullNameValid &&
      isEmailValid &&
      isPasswordValid &&
      isConfirmPasswordValid
    ) {
      if (isAccountExists(email)) {
        document.getElementById("registerEmailError").textContent ="An account with this email already exists. Please use another email.";
        document.getElementById("registerEmailError").style.display = "block";
      } else {
        saveAccount(fullName, email, password);
        //Registration successful! You can now log in.
        Swal.fire({
          title: "Registration successful!",
          text: " You can now log in.",
          icon: "success",
          customClass: {
            popup: "swal2-popup", // Link the custom class
          },
        });

        registerForm.reset();
        switchToLogin.click();
      }
    } else {
      // If any validation fails, show a generic error message inline
      document.getElementById("registerErrorMessage").textContent ="Please fix the errors in the form before submitting.";
      document.getElementById("registerErrorMessage").style.display = "block";
    }
  });

  // Login form submission
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value.trim();
    const accounts = JSON.parse(localStorage.getItem("accounts")) || [];
    const user = accounts.find(
      (account) => account.email === email && account.password === password
    );

    // Reset error messages
    document.getElementById("login-email-error").style.display = "none";
    document.getElementById("login-password-error").style.display = "none";

    if (user) {
      // Save logged-in user and redirect to dashboard
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      window.location.href = "user.html";
    } else {
      // Show inline error message for invalid login
      if (!accounts.some((account) => account.email === email)) {
        document.getElementById("login-email-error").style.display = "block";
      } else {
        document.getElementById("login-password-error").style.display = "block";
      }
    }
  });
});

document
  .getElementById("register-name")
  .addEventListener("input", validateFullName);
document
  .getElementById("register-email")
  .addEventListener("input", validateEmail);
document
  .getElementById("register-password")
  .addEventListener("input", validatePassword);
document
  .getElementById("register-confirm-password")
  .addEventListener("input", validateConfirmPassword);

// Real-time validation for Full Name
function validateFullName() {
  const fullName = document.getElementById("register-name").value.trim();
  const fullNameInput = document.getElementById("register-name");
  const fullNameError = document.getElementById("registerNameError");

  if (fullName.length < 3) {
    fullNameError.textContent = "Full name must be at least 3 characters long.";
    fullNameInput.classList.add("is-invalid");
    fullNameInput.classList.remove("is-valid");
    return false;
  } else {
    fullNameError.textContent = ""; // Clear the error message
    fullNameInput.classList.add("is-valid");
    fullNameInput.classList.remove("is-invalid");
    return true;
  }
}

// Real-time validation for Email
function validateEmail() {
  const email = document.getElementById("register-email").value.trim();
  const emailInput = document.getElementById("register-email");
  const emailError = document.getElementById("registerEmailError");
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!emailPattern.test(email)) {
    emailError.textContent = "Please enter a valid email address.";
    emailInput.classList.add("is-invalid");
    emailInput.classList.remove("is-valid");
    return false;
  } else {
    emailError.textContent = ""; // Clear the error message
    emailInput.classList.add("is-valid");
    emailInput.classList.remove("is-invalid");
    return true;
  }
}

// Real-time validation for Password
function validatePassword() {
  const password = document.getElementById("register-password").value.trim();
  const passwordInput = document.getElementById("register-password");
  const passwordError = document.getElementById("registerPasswordError");

  if (password.length < 6) {
    passwordError.textContent = "Password must be at least 6 characters long.";
    passwordInput.classList.add("is-invalid");
    passwordInput.classList.remove("is-valid");
    return false;
  } else {
    passwordError.textContent = ""; // Clear the error message
    passwordInput.classList.add("is-valid");
    passwordInput.classList.remove("is-invalid");
    return true;
  }
}

// Real-time validation for Confirm Password
function validateConfirmPassword() {
  const password = document.getElementById("register-password").value.trim();
  const confirmPassword = document
    .getElementById("register-confirm-password")
    .value.trim();
  const confirmPasswordInput = document.getElementById(
    "register-confirm-password"
  );
  const confirmPasswordError = document.getElementById(
    "registerConfirmPasswordError"
  );

  if (confirmPassword !== password) {
    confirmPasswordError.textContent = "Passwords do not match.";
    confirmPasswordInput.classList.add("is-invalid");
    confirmPasswordInput.classList.remove("is-valid");
    return false;
  } else {
    confirmPasswordError.textContent = ""; // Clear the error message
    confirmPasswordInput.classList.add("is-valid");
    confirmPasswordInput.classList.remove("is-invalid");
    return true;
  }
}
