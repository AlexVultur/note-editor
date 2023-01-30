<?php
header("Content-Type: application/json");
$data = json_decode(file_get_contents("php://input"));
$filename = 'data.json';
if (file_exists($filename)) {
    $file = file_get_contents('data.json');
} else {
    $file = fopen("data.json", "a+");
}
file_put_contents('data.json', json_encode($data));
$file = file_get_contents('data.json');
echo $file;
