<?php
require 'function.php';
if(isset($_SESSION["id"])){
  header("Location: index.php");
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <link rel="stylesheet" href="register.css">
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Connexion</title>
</head>
<body>
<img class="logo" src="../LoginRegisterAjax/motus_logo_2010.png" alt="Logo">
<h2>Envie de jouer à motus ? Connectez vous !</h2>

    <form autocomplete="off" action="" method="post">
      <input type="hidden" id="action" value="login">
      <label for="">Nom d'utilisateur</label>
      <input type="text" id="username" value=""> <br>
      <label for="">Mot de passe</label>
      <input type="password" id="password" value=""> <br>
      <div id="message"></div>
      <button type="button" onclick="submitData();">Connexion</button>
    </form>
    <br>
    <a class="message-link" href="register.php">Pas encore de compte ? Inscrivez vous !</a>
    <?php require 'script.php'; ?>
</body>
</html>