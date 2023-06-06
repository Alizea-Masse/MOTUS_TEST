<?php
session_start();
$conn = mysqli_connect("localhost", "root", "", "motus");

// IF
if (isset($_POST["action"])) {
  if (function_exists($_POST["action"])) {
    $_POST["action"]();
  }
}

// REGISTER
function register()
{
  global $conn;

  $name = $_POST["name"];
  $username = $_POST["username"];
  $password = $_POST["password"];
  $hashPassword = password_hash($password, PASSWORD_BCRYPT);

  if (empty($name) || empty($username) || empty($password)) {
    echo "Veuillez remplir tous les champs!";
    exit;
  }

  $user = mysqli_query($conn, "SELECT * FROM tb_user WHERE username = '$username'");
  if (mysqli_num_rows($user) > 0) {
    echo "Nom d'utilisateur déjà utilisé";
    exit;
  }

  $query = "INSERT INTO tb_user VALUES('', '$name', '$username', '$hashPassword', '')";
  mysqli_query($conn, $query);
  echo "Registration Successful";
}

// LOGIN

function login()
{
  global $conn;

  $username = $_POST["username"];
  $password = $_POST["password"];

  $user = mysqli_query($conn, "SELECT * FROM tb_user WHERE username = '$username'");

  if (mysqli_num_rows($user) > 0) {

    $row = mysqli_fetch_assoc($user);

    if (password_verify($password, $row['password'])) {
      echo "Login Successful";
      $_SESSION["login"] = true;
      $_SESSION["id"] = $row["id"];
    } else {
      echo "Mot de passe ou nom d'utilisateur incorrect";
      exit;
    }
  } else {
    echo "Utilisateur non inscrit";
    exit;
  }
}


// GET WORD

function getWord()
{

  $bdd = new PDO('mysql:host=localhost;dbname=motus;charset=utf8;', 'root', '');
  $recupWord = $bdd->query('SELECT * FROM word
  ORDER BY RAND() LIMIT 1');
  $result = $recupWord->fetch(PDO::FETCH_ASSOC);
  $randomWord = $result['name'];
  echo $randomWord;
}

// ADD BEST SCORE 
function addScore()
{

  global $conn;
  $id = $_SESSION["id"];
  $score = $_POST["score"];
  $bestScore = mysqli_query($conn, "SELECT best_score FROM tb_user WHERE id = $id");

  if ((int)$score > (int)$bestScore) {
    $query = "UPDATE tb_user SET best_score= $score WHERE id= $id";
    mysqli_query($conn, $query);
  }
}

// getBestScore

function getBestScore()
{

  $bdd = new PDO('mysql:host=localhost;dbname=motus;charset=utf8;', 'root', '');
  $wall = $bdd->query('SELECT username, best_score FROM tb_user ORDER BY best_score DESC LIMIT 5');
  $result = $wall->fetchAll(PDO::FETCH_NAMED);
  echo json_encode($result);
}
