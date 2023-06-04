<?php
session_start();
$conn = mysqli_connect("localhost", "root", "", "motus");

// IF
if(isset($_POST["action"])){
    if($_POST["action"] == "register"){
      register();
    }
    else if($_POST["action"] == "login"){
      login();
    }
    else if($_POST["action"] == "score"){
      addScore();
    }
    
  }

  // REGISTER
function register(){
    global $conn;
  
    $name = $_POST["name"];
    $username = $_POST["username"];
    $password = $_POST["password"];
  
    if(empty($name) || empty($username) || empty($password)){
      echo "Veuillez remplir tous les champs!";
      exit;
    }
  
    $user = mysqli_query($conn, "SELECT * FROM tb_user WHERE username = '$username'");
    if(mysqli_num_rows($user) > 0){
      echo "Nom d'utilisateur déjà utilisé";
      exit;
    }
  
    $query = "INSERT INTO tb_user VALUES('', '$name', '$username', '$password')";
    mysqli_query($conn, $query);
    echo "Registration Successful";
  }

  // LOGIN
function login(){
    global $conn;
  
    $username = $_POST["username"];
    $password = $_POST["password"];
  
    $user = mysqli_query($conn, "SELECT * FROM tb_user WHERE username = '$username'");
  
    if(mysqli_num_rows($user) > 0){
  
      $row = mysqli_fetch_assoc($user);
  
      if($password == $row['password']){
        echo "Login Successful";
        $_SESSION["login"] = true;
        $_SESSION["id"] = $row["id"];
      }
      else{
        echo "Mot de passe ou nom d'utilisateur incorrect";
        exit;
      }
    }
    else{
      echo "Utilisateur non inscrit";
      exit;
    }
  }

// ADD BEST SCORE 
function addScore(){
  echo "coucou";
  global $conn;
  $score = $_POST["score"];
  $query = "INSERT INTO tb_user VALUES('', '', '', '$score')";
  mysqli_query($conn, $query);
}
