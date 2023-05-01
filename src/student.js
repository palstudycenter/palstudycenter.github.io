url = "https://study-center.onrender.com"
$(document).ready(function () {
  var students;
  $.ajax({
    url: `${url}/students`,
    type: 'GET',
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    success: function (response) {
      students = response.res
      for (i = 0; i < students.length; i++) {
        $('#student_data > tbody:last-child').
        append('<tr><td>' + students[i]['name'] + 
                '</td><td>' + students[i]['class'] + 
                '</td><td>' + students[i]['board'] + 
                '</td><td>' + students[i]['phone'] + 
                '</td><td>' + students[i]['address'] +
                '</td></tr>');
      }
    },
    error: function (res) {
      console.log(res);
    }
  });
});
