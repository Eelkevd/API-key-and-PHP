<?php
	
if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $userName = $_GET["username"]; 
    $chatMsg = $_GET["message"];
    $content = $chatMsg;
    echo $content;
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