// url = "http://localhost:3000"
url = "https://study-center.onrender.com"
$(document).ready(function () {
  $(document).ajaxSend(function() {
    $("#overlay").fadeIn(300);　
  });
  $("#submit_btn").click(function () {
    let name = $("#name").val();
    let phone = $("#phone").val();
    let st_class = $("#st_class").val();
    let address = $("#address").val();
    let st_board = $("#st_board").val();
    let email = $("#email").val();
    let user_type = $("#user_type").val();
    let password = $("#password").val();
    let f_name = $("#f_name").val();
    let timing = st_class == "class 10th" ? "9 AM" : (st_class == "class 11th") ? "10 AM" : "8 AM"
    if (name == '' || phone == '' || address == '' || email == '' || password == '' || f_name == '') {
      Swal.fire(
        "Field can't be empty",
        '',
        'info'
      )
    } else if (st_class == null) {
      Swal.fire(
        "Please select class",
        '',
        'info'
      )
    } else if (st_board == null) {
      Swal.fire(
        "Please select board",
        '',
        'info'
      )
    } else if (user_type == null) {
      Swal.fire(
        "Please select User type",
        '',
        'info'
      )
    }
     else {
        data = { name: name, phone: phone, usertype: user_type, email: email, fathername: f_name, class: st_class, address: address, board: st_board, password: password };
        $.ajax({
          url: `${url}/createStudent`,
          type: 'POST',
          data: data,
          contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
          success: function (response) {
            $("#name").val('');
            $("#phone").val('');
            $("#address").val('');
            Swal.fire({
              title: 'Thank you!',
              text: `Your ${st_class} timing is ${timing}`,
              icon: 'success',
              confirmButtonText: 'ok'
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.href = "../index.html";
              }
            })
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


  $("#login_btn").click(function () {
    let email = $("#email").val();
    let password = $("#password").val();
    if (email == '' || password == '') {
      Swal.fire(
        "Field can't be empty",
        '',
        'info'
      )
    } else {
        data = { email: email, password: password };
        $.ajax({
          url: `${url}/StudentLogin`,
          type: 'POST',
          data: data,
          contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
          success: function (response) {
            console.log(response);
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
