<?php

//Get data from .ajax call
// $data = $_POST;

$data = 'hello';
$file = 'people.txt';
file_put_contents($file, $data);

?>
