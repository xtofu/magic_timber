<?php

//Get data from .ajax call
$data = $_POST;

//Open mongo and select database
$m = new Mongo();
$db = $m->selectDB("numbers");

//select a collection
$collection = $db->testData;

//insert data
$collection->insert($data);

//find collection contents
$cursor = $collection->find();

// echo $data;
?>