  // url = "http://localhost:3000"
url = "https://study-center.onrender.com"
$(document).ready(function () {
  $(document).ajaxSend(function() {
    $("#overlay").fadeIn(300);
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


  