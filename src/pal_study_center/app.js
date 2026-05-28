//
// ==========================
// SIGNUP
// ==========================
//

function signup(){

let student = {

name: document.getElementById("name").value,
phone: document.getElementById("phone").value,
password: document.getElementById("password").value,
class: document.getElementById("class").value,

fees:{
January:"Unpaid",
February:"Unpaid",
March:"Unpaid",
April:"Unpaid",
May:"Unpaid",
June:"Unpaid",
July:"Unpaid",
August:"Unpaid",
September:"Unpaid",
October:"Unpaid",
November:"Unpaid",
December:"Unpaid"
}

};

let users = JSON.parse(localStorage.getItem("users")) || [];

let exists = users.find(u => u.phone === student.phone);

if(exists){
alert("User already exists");
return;
}

users.push(student);

localStorage.setItem("users", JSON.stringify(users));

alert("Signup Successful");

window.location.href = "login.html";

}

//
// ==========================
// LOGIN
// ==========================
//

function login(){

let phone = document.getElementById("phone").value;
let password = document.getElementById("password").value;

let users = JSON.parse(localStorage.getItem("users")) || [];

let user = users.find(u =>
u.phone === phone &&
u.password === password
);
/* ADMIN LOGIN */
if(phone === "5210" && password === "4628"){
window.location.href = "dashboard.html";
return;
}

if(user){

// CURRENT USER STORE
localStorage.setItem("currentUser", JSON.stringify(user));

alert("Login Successful");

// REDIRECT TO STUDENT DASHBOARD
window.location.href = "student-dashboard.html";

}else{

alert("Invalid Credentials");

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