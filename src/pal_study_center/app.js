// Import BASE_URL from config.js

//
// ==========================
// SIGNUP
// ==========================
//

function setButtonLoading(button, loading, label) {
  if (!button) return;
  if (!button.dataset.originalHtml) {
    button.dataset.originalHtml = button.innerHTML;
  }
  button.disabled = loading;
  button.innerHTML = loading ? `<span class="spinner-border spinner-border-sm text-white me-2" role="status" aria-hidden="true"></span>${label}` : button.dataset.originalHtml;
}

function showStatusMessage(elementId, message) {
  const el = document.getElementById(elementId);
  if (!el) return;
  if (message) {
    el.textContent = message;
    el.style.display = 'block';
  } else {
    el.textContent = '';
    el.style.display = 'none';
  }
}

function validateSignupData(student) {
  if (!student.name) {
    return 'Student Name is required.';
  }
  if (student.name.length < 2 || /[0-9]/.test(student.name)) {
    return 'Please enter a valid student name.';
  }
  if (!student.phone) {
    return 'Mobile Number is required.';
  }
  if (!/^[0-9]{10}$/.test(student.phone)) {
    return 'Please enter a valid 10-digit mobile number.';
  }
  if (!student.class) {
    return 'Please select a class.';
  }
  if (!student.board || student.board === 'Select Board') {
    return 'Please select a board.';
  }
  if (!student.password) {
    return 'Password is required.';
  }
  return '';
}

async function signup(){
  showStatusMessage('signupStatus', '');
  const signupButton = document.querySelector('.signup-btn');
  const student = {
    name: document.getElementById("name").value.trim(),
    phone: document.getElementById("phone").value.trim(),
    password: document.getElementById("password").value,
    "class": document.getElementById("class").value,
    board: document.getElementById("board").value,
  };

  const validationError = validateSignupData(student);
  if (validationError) {
    showStatusMessage('signupStatus', validationError);
    return;
  }

  try {
    setButtonLoading(signupButton, true, 'Creating account...');
    showStatusMessage('signupStatus', 'Creating account, please wait...');

    const response = await fetch(getApiUrl(CONFIG.API.CREATE_STUDENT), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(student)
    });

    const data = await response.json();

    if (data.status) {
      showStatusMessage('signupStatus', 'Signup successful. Redirecting to login...');
      window.location.href = 'login.html';
    } else {
      showStatusMessage('signupStatus', data.msg || 'Signup failed. Please try again.');
    }
  } catch (error) {
    console.error('Signup error:', error);
    showStatusMessage('signupStatus', 'Unable to connect to the server. Please try again later.');
  } finally {
    setButtonLoading(signupButton, false, 'Create Account');
  }
}

//
// ==========================
// LOGIN
// ==========================
//

function validateLoginData(phone, password) {
  if (!phone) {
    return 'Mobile Number is required.';
  }
  if (!/^[0-9]{10}$/.test(phone)) {
    return 'Please enter a valid 10-digit mobile number.';
  }
  if (!password) {
    return 'Password is required.';
  }
  return '';
}

async function login(){
  showStatusMessage('loginStatus', '');
  const loginButton = document.querySelector('.login-btn');
  const phone = document.getElementById("phone").value.trim();
  const password = document.getElementById("password").value;

  const validationError = validateLoginData(phone, password);
  if (validationError) {
    showStatusMessage('loginStatus', validationError);
    return;
  }

  try {
    setButtonLoading(loginButton, true, 'Logging in...');
    showStatusMessage('loginStatus', 'Logging in, please wait...');

    const response = await fetch(getApiUrl(CONFIG.API.STUDENT_LOGIN), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ phone, password })
    });

    const data = await response.json();
    if (data.status) {
      localStorage.setItem("currentUser", JSON.stringify(data.data || {}));
      showStatusMessage('loginStatus', 'Login successful. Redirecting...');
      if (data.data && data.data.usertype === 'admin') {
        window.location.href = "dashboard.html";
      } else {
        window.location.href = "student-dashboard.html";
      }
    } else {
      showStatusMessage('loginStatus', data.msg || 'Invalid credentials. Please try again.');
    }
  } catch (error) {
    console.error('Login error:', error);
    showStatusMessage('loginStatus', 'Unable to connect to the server. Please try again later.');
  } finally {
    setButtonLoading(loginButton, false, 'Login Now');
  }
}

//
// ==========================
// LOGOUT
// ==========================
//

function logout(){
  localStorage.removeItem("currentUser");
  window.location.href = "login.html";
}
