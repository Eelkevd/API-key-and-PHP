<?php
	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Methods: *");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $userName = $_GET["mykey"]; 
    $chatMsg = $_GET["value"];

    $file = fopen('chattext.txt', 'a+'); //Open your txt file
    $content = $userName. " : " .$chatMsg. PHP_EOL;  // merges username and message
    fwrite($file , $content); // adds message to .txt
    fclose($file ); //closes .txt

    if(isset($_SERVER['HTTP_REFERER'])) {
    $previous = $_SERVER['HTTP_REFERER'];
	}
   die(header("Location: ".$_SERVER["HTTP_REFERER"]));
	} elseif ($_SERVER['REQUEST_METHOD'] === 'GET') { //does stuff if the request method is get
    $myfile = fopen("chattext.txt", "r") or die("Unable to open file!");
    echo fread($myfile,filesize("chattext.txt"));
    fclose($myfile);
}

    
/*
if(isset($_SERVER['HTTP_REFERER'])) {
    $previous = $_SERVER['HTTP_REFERER'];
}
    die(header("Location: ".$_SERVER["HTTP_REFERER"]));

} elseif ($_SERVER['REQUEST_METHOD'] === 'GET') { 
   
}

    
    */
?>