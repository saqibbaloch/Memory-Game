
<!DOCTYPE html>
<html>
<head>

<script src="jquery-1.11.3.js"></script>
<script type="text/javascript" src="Game.js"></script>

<meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
   
</meta> 
    <!-- Bootstrap -->
    <link href="css/bootstrap.min.css"  title="compact" rel="alternate stylesheet">
    <link rel="stylesheet" type="text/css"  title="compact" href="_styles/_style.css">
</head>

<body >

	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    
    <script src="js/bootstrap.min.js"></script>

	<div id = "mainBoard">
	
	<div  id = "gameBoard"> </div>	
	<div id = "sideMenu">
		<div id = "logotype"><br><br><br><br><br><br><h4>Memory Game</h4></div>	
		<div id = "gameInfo"><h3>Score:</h3></center><strong><span id="score"></strong></span></div>
		<div id = "restart" ><button class="btn btn-primary" style="height: 90%; width: 105%; background-color:  #3B1609;" onclick = "restart();"><h4>Restart</h4></button></div>

	</div>
	
</div>
	<script>gameBoard();</script>
    
    <div class="modal fade" id="playerInfoModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="InfoModalLabel"><p id = "finalScore" style = "text-align: center; text-weight: bold; color: red;"></p></h4>
      </div>
     
      <div class="modal-body">
      	<h4>Enter your Information:</h4><br>
       <lablel class = "infoLabel">Name:</label><input id="name" type="text"></input><br><br>
       	<lablel class = "infoLabel">Email: </label><input id="email" type = "text"></input><br>
       		<label id = "emptyFieldMessage"></label>

      </div>
      <div class="modal-footer">
       <button class = "btn btn-primary" id="submitButton" onclick = "submitFunc();">Submit</button>
      </div>
  
    </div>
  </div>
</div>



<?php

$name = $_POST['name'];
$email = $_POST['email'];
$score = $_POST['score'];
//ChromePhp::log('in function name is:'.$email);
$servername = "localhost";
$username = "innowiki";
$password = "123";

// Creating connection
$conn = new mysqli($servername, $username, $password);

// Checking connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

   $selected = mysqli_select_db($conn, "MemoryGame");
   $query = "INSERT INTO scores (user_name, email, scores) VALUES ('$name', '$email', $score)";
   $result = mysqli_query($conn,$query);

   mysqli_close($conn);

?>

</body>

</html>