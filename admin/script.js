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
            profileBtn.href = `profile.html?studentId=${student.phone}&name=${encodeURIComponent(student.name)}`; // pass studentId in URL
            if (student.profile_link == undefined) {
              profileBtn.style.backgroundColor = 'red'
            } else {
              profileBtn.style.backgroundColor = 'green'
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

  $("#submit_profile_link").click(function () { 
    const phone_number = document.getElementById('studentId').value;
    const name = document.getElementById('studentName').value;
    const profile_link = document.getElementById('profileLink').value;

    if (phone_number == '' || profile_link == '') {
      Swal.fire(
        "Field can't be empty",
        '',
        'info'
      )
    } else {
        data = { phone: phone_number, profile_link: profile_link };
        $.ajax({
          url: `${url}/UpdateProfileLink`,
          type: 'PATCH',
          data: data,
          contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
          success: function (res) {
            if (res.status == true) {
              Swal.fire({
                text: `Profile Link Updated Sucessfully, It will be shown to ${name}..!`,
                icon: 'success',
                confirmButtonText: 'ok'
              }).then((result) => {
                window.location.href = "students.html";
              })
              $(document).ajaxComplete(function() {
                $("#overlay").fadeOut(300);
              });
            } else if (res.status == false) {
              Swal.fire({
                title: 'Error',
                text: res.msg,
                icon: 'error',
              })
              $(document).ajaxComplete(function() {
                $("#overlay").fadeOut(300);
              });
            }
          },
          error: function (res) {
            Swal.fire({
              title: 'Error',
              text: res.err,
              icon: 'error',
            })
            Swal.fire({
              title: 'Error',
              text: res.err,
              icon: 'error',
              confirmButtonText: 'ok'
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.href = "index.html";
              }
            })
          }
        }); 
    }


  });
});
