<?php
$conn = mysqli_connect("localhost", "root", "", "motus");
require 'function.php';
if(isset($_SESSION["id"])){
  $id = $_SESSION["id"];
  $user = mysqli_fetch_assoc(mysqli_query($conn, "SELECT * FROM tb_user WHERE id = $id"));
}
else{
  header("Location: login.php");
}

function getScore() {
  global $conn;
  
  if (isset($_GET["score"]) ) {
  $id = $_SESSION["id"];
   $score = $_GET["score"] ;
   $query = "UPDATE tb_user SET best_score= $score WHERE id= $id";
   mysqli_query($conn, $query);
  }
}
getScore()
?>
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
  <link rel="stylesheet" href="reset.css">

    <link rel="stylesheet" href="motus.css">
    <meta charset="utf-8">
    <title>Motus</title>
  </head>
  <body>
      <div class="header-container">
          <h2 class="welcome">Bienvenue <?php echo $user["name"]; ?> !</h2>
          <a class="logout-link" href="logout.php">Se déconnecter</a>
        </div>
        <img class="logo" src="./motus_logo_2010.png" alt="Logo">
        
        <div class="board-container">
          
          <div class="rules">
            <h2 class="rules-title">Les lettres entourées :</h2>
            <ul>
              <li>- d'un carré rouge sont bien placées.</li>
              <li>- d'un cercle jaune sont mal placées, mais présentes dans le mot.</li>
              <li>- d’un fond bleu ne sont pas dans le mot.</li>
            </ul>
  
          </div>
          <div id="score"></div>
          <div id='board'>
            
            </div> 
        </div>
  </body>
  <script src="./motus.js"></script>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
</html>