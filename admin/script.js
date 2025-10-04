// url = "http://localhost:3000"
url = "https://study-center.onrender.com"
$(document).ready(function () {
  $(document).ajaxSend(function() {
    $("#overlay").fadeIn(300);　
  });
  
    const container = document.getElementById("studentContainer");
    const template = document.getElementById("studentTemplate");

    // Fetch students JSON
    // fetch(`http://127.0.0.1:/5500/json_data/students.json`)
    fetch(`${url}/students`)
      .then(response => response.json())
      .then(data => {
        container.innerHTML = ""; // Clear old content
        data = data.res
        if (data && Array.isArray(data)) {
          // ✅ Show students
          data.forEach(student => {
            const card = template.content.cloneNode(true);

            card.querySelector(".student-name").textContent = student.name;
            card.querySelector(".student-class").textContent = student.class;
            card.querySelector(".student-email").textContent = student.email;
            card.querySelector(".student-phone").textContent = student.phone;
            card.querySelector(".student-board").textContent = student.board;
            card.querySelector(".student-fathername").textContent = student.fathername;

            const profileBtn = card.querySelector("#profile-btn");
            const disable_profile = card.querySelector("#disable_profile");
            profileBtn.href = `profile.html?studentId=${student.phone}&name=${encodeURIComponent(student.name)}`; // pass studentId in URL
            if (student.profile_link == undefined) {
              profileBtn.style.backgroundColor = 'red'
            } else {
              profileBtn.style.backgroundColor = 'green'
            }
            disable_profile.value = student.disable_profile
            if (student.disable_profile){
              disable_profile.style.backgroundColor = 'green'
            }else{
              disable_profile.style.backgroundColor = 'red'
            }
            container.appendChild(card);
          });
        } else {
          // ❌ Show error message
          container.innerHTML = `
            <div class="col-12">
              <div class="alert alert-danger text-center" role="alert">
                Server Error: Unable to fetch student data.
              </div>
            </div>
          `;
        }
      })
      .catch(error => {
        console.error("Error fetching students:", error);
        container.innerHTML = `
          <div class="col-12">
            <div class="alert alert-danger text-center" role="alert">
              Server Error: ${error.message}
            </div>
          </div>
        `;
      }); 
});
