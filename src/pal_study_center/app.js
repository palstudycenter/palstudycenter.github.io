const BASE_URL = 'https://study-center.onrender.com';

//
// ==========================
// SIGNUP
// ==========================
//

async function signup(){
  const student = {
    name: document.getElementById("name").value.trim(),
    phone: document.getElementById("phone").value.trim(),
    password: document.getElementById("password").value,
    "class": document.getElementById("class").value,
  };

  if (!student.name || !student.phone || !student.password || !student.class) {
    alert("Please fill in all fields.");
    return;
  }

  try {
    const response = await fetch(`${BASE_URL}/createStudent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(student)
    });

    const data = await response.json();

    if (data.status) {
      alert(data.msg || 'Signup Successful');
      window.location.href = 'login.html';
    } else {
      alert(data.msg || 'Signup failed. Please try again.');
    }
  } catch (error) {
    console.error('Signup error:', error);
    alert('Unable to connect to the server. Please try again later.');
  }
}

//
// ==========================
// LOGIN
// ==========================
//

async function login(){
  const phone = document.getElementById("phone").value.trim();
  const password = document.getElementById("password").value;

  if (!phone || !password) {
    alert("Please enter both phone number and password.");
    return;
  }

  /* ADMIN LOGIN */
  if (phone === "5210" && password === "4628") {
    window.location.href = "dashboard.html";
    return;
  }

  try {
    const response = await fetch(`${BASE_URL}/StudentLogin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ phone, password })
    });

    const data = await response.json();
    if (data.status) {
      localStorage.setItem("currentUser", JSON.stringify(data.data || {}));
      alert(data.msg || 'Login Successful');
      if (data.data && data.data.usertype === 'admin') {
        window.location.href = "dashboard.html";
      } else {
        window.location.href = "student-dashboard.html";
      }
    } else {
      alert(data.msg || 'Invalid credentials. Please try again.');
    }
  } catch (error) {
    console.error('Login error:', error);
    alert('Unable to connect to the server. Please try again later.');
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
