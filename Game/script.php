<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script type="text/javascript">
  function submitData() {
    $(document).ready(function() {
      let data = {
        name: $("#name").val(),
        username: $("#username").val(),
        password: $("#password").val(),
        action: $("#action").val(),
      };

      $.ajax({
        url: 'ajaxMethods.php',
        type: 'post',
        data: data,
        success: function(response) {
          if (response == "Login Successful") {
            window.location.reload();
          } else if (response == "Registration Successful") {
            $(location).attr('href', 'login.php');
          } else if (response == response) {
            const message = document.getElementById("message")
            message.innerText = response
          }
        }
      });
    });
  }
</script>