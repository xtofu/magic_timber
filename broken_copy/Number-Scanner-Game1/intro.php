<?php

$_SESSION = $_POST;

//change username lengths.
if ($_SESSION['user'] == '123') //if it's the beginning of a session
{
	$trial = determine_trial();
	//Start session, make userid.
	// session_start();
	$_SESSION['user'] = substr(str_shuffle(str_repeat('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',5)),0,7);
	//do counterbalancing here to assign a condition. then keep passing it in URL using already-implemented functionality in
	//task.js

	$_SESSION['cond'] = 1;
	$_SESSION['trial'] = 1;
	echo json_encode($_SESSION);
}
else
{
	echo json_encode($_SESSION);
}


//functions:
function write_data($data)
{
	//Open mongo and select database
	$m = new Mongo();
	$db = $m->selectDB("numbers");
	//select a collection
	$collection = $db->testData;
	$collection->insert($data);
	return 'success';
}

function determine_trial()
{
	$m = new Mongo();
	$db = $m->selectDB("numbers");
	$collection = $db->testData;

}



// Do task logic here!





// $query = array("x"=>array('$gte'=>5, '$lte'=>5));
// $condition1 = $collection->find($query);



// //insert data
// $collection->insert($data);


//find collection contents
// $cursor = $collection->find();



?>
