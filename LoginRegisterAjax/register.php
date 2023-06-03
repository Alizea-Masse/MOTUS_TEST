<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Inscription</title>
</head>
<body>
    <h2>Register</h2>
    <form autocomplete="off" action="" method="post">
      <input type="hidden" id="action" value="register">
      <label for="">Nom</label>
      <input type="text" id="name" value=""> <br>
      <label for="">Pseudo</label>
      <input type="text" id="username" value=""> <br>
      <label for="">Mot de passe</label>
      <input type="password" id="password" value=""> <br>
      <button type="button" onclick="submitData();">S'inscrire</button>
    </form>
    <br>
    <a href="login.php">Vous avez déjà un compte ? Connectez vous !</a>
    <?php require 'script.php'; ?>
</body>
</html>