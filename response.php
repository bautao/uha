<?php
$conn = new mysqli("uha-2023.com:3306", "uhacom1_test", "secret ", "uhacom1_votings");


if($conn->connect_error){
    die("Could not connect to database!");
}