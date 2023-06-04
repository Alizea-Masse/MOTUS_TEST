<?php
$bdd = new PDO ('mysql:host=localhost;dbname=motus;charset=utf8;','root','');
$recupWord = $bdd->query('SELECT * FROM word
ORDER BY RAND() LIMIT 1');
$result = $recupWord->fetch(PDO::FETCH_ASSOC);        
$randomWord = $result['name'];
echo(json_encode($randomWord));
//echo($randomWord);
?>