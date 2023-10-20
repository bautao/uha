<?php
$host = "uha-2023.com"; /* Host name */
$user = "uhacom1_test"; /* User */
$password = "secret "; /* Password */
$dbname = "uhacom1_votings"; /* Database name */
$con = mysqli_connect($host, $user, $password,$dbname);
// Check connection
if (!$con) {
   die("Connection failed: " . mysqli_connect_error());
}