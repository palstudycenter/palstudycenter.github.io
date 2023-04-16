// url = "http://localhost:3000"
url = "https://study-center.onrender.com"
$(document).ready(function () {
  $("#submit_btn").click(function () {
    let name = $("#name").val();
    let phone = $("#phone").val();
    let st_class = $("#st_class").val();
    let address = $("#address").val();

    if (name == '' || phone == '' || address == '') {
      alert("Field can't be empty");
    } else if (st_class == null) {
      alert("Please select class");
    } else {
      console.log(name, phone, st_class, address);
      data = { name: name, phone: phone, class: st_class, address: address };
      $.ajax({
        url: `${url}/createStudent`,
        type: 'POST',
        data: data,
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        success: function (response) {
          alert(response.result);
          $("#name").val('');
          $("#phone").val('');
          $("#address").val('');
        },
        error: function (res) {
          alert("error - " + res.err);
        }
    }); 
    }
  });
});
