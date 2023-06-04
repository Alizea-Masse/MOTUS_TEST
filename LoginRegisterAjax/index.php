<?php
require 'function.php';
if(isset($_SESSION["id"])){
  $id = $_SESSION["id"];
  $user = mysqli_fetch_assoc(mysqli_query($conn, "SELECT * FROM tb_user WHERE id = $id"));
}
else{
  header("Location: login.php");
}
?>
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <link rel="stylesheet" href="register.css">
    <meta charset="utf-8">
    <title>Motus</title>
  </head>
  <body>
      <div class="header-container">
          <h2>Bienvenue <?php echo $user["name"]; ?> !</h2>
          <a class="logout-link" href="logout.php">Se déconnecter</a>
        </div>
        <img class="logo" src="../motus_logo_2010.png" alt="Logo">
  </body>
</html>