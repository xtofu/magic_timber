<?php
try {
  // open connection to MongoDB server
  $conn = new Mongo('localhost');

  // access database
  $db = $conn->test;

  // access collection
  $collection = $db->items;

  // insert a new document
  $item = array(
    'name' => 'milk',
    'quantity' => 10,
    'price' => 2.50,
    'note' => 'skimmed and extra tasty'
  );
  $collection->insert($item);
  echo 'Inserted document with ID: ' . $item['_id'];
  
  // disconnect from server
  $conn->close();
} catch (MongoConnectionException $e) {
  die('Error connecting to MongoDB server');
} catch (MongoException $e) {
  die('Error: ' . $e->getMessage());
}
?>