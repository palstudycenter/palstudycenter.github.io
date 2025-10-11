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
            const disable_profile = card.querySelector(".disable_profile");
            const delete_profile = card.querySelector("#delete_student");
            profileBtn.href = `profile.html?studentId=${student.phone}&name=${encodeURIComponent(student.name)}`; // pass studentId in URL
            delete_profile.id = student._id;
            if (student.profile_link == undefined) {
              profileBtn.style.backgroundColor = 'red'
            } else {
              profileBtn.style.backgroundColor = 'green'
            }
            disable_profile.value = `${student.phone}_${student.disable_profile}`
            if (student.disable_profile){
              disable_profile.style.color = 'white'
              disable_profile.style.backgroundColor = 'green'
              disable_profile.textContent = 'Enable Profile'
            }else{
              disable_profile.style.color = 'white'
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

  $(document).on("click", ".disable_profile", function() {
    const [phone, disable] = $(this).val().split("_");
    let disable_profile = disable === "true";
    // Toggle value
    disable_profile = !disable_profile;
    data = { phone: phone, disable_profile: disable_profile };

    $.ajax({
      url: `${url}/DisableProfile`,
      type: 'PATCH',
      data: data,
      contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
      success: function (res) {
        if (res.status == true) {
          Swal.fire({
            text: `Profile Updated Sucessfully`,
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

  });

  $(document).on("click", ".delete_student", function() {
    data = { id: this.id };
    Swal.fire({
      title: "Do you want to delete the Student",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          url: `${url}/DeleteStudent`,
          type: 'DELETE',
          data: data,
          contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
          success: function (res) {
            if (res.status == true) {
              Swal.fire({
                text: res.msg,
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
              text: res.msg,
              icon: 'error',
              confirmButtonText: 'ok'
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.href = "students.html";
              }
            })
          }
        }); 
      }
    });
  });
});
