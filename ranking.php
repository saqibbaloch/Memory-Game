
<?php

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
  
 $query = "SELECT * FROM scores ORDER BY scores DESC";

  $result = mysqli_query($conn,$query);
  $row = mysqli_fetch_array($result);

  mysqli_close($conn);

  $playersByRank = $row;
 

  echo json_encode($playersByRank);

?>