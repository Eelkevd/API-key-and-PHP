
var topID = 3300; //Vanaf welke index id's geladen worden
var oldMsgs = [];
var myKey;
var userName;
var myInterval;
var xhr = new XMLHttpRequest();

function loadChatroom(){
	userName = document.getElementById('userName').value;
	myKey = document.getElementById('myKey').value;
	
	if (userName != "" && myKey != ""){

		document.getElementById("chatRoom").style.display = "block";
		document.getElementById("logIn").style.display = "none";
		document.getElementById("showUsername").innerHTML = "welcome" + " " + userName;
		document.getElementById("showKey").innerHTML = "You're in chatroom:" + " " + myKey;
		
		/*myInterval = setInterval(function(){
			getAllIds();
			getOldMsg();
		}, 500);*/
		
		document.getElementById("chatInput").focus();
	}
	else {
		alert("Please fill in all fields");
	}
}

function sendMessage(){
	//var userName = document.getElementById('myKey').value;
	var d = new Date();
	var timeStamp = d.toLocaleTimeString();
	var valueMsg = document.getElementById('chatInput').value;
	var urlWrite = "username="+userName+"&message="+valueMsg;
	var chatMessage = document.getElementById('chatField');
	
	//test alertbox
	//alert(urlWrite);
	
	// Post chat message
	if (valueMsg != ""){
		
		xhr.open('POST', 'api_test1.php?mykey='+ userName + '&value='+ valueMsg, false);
		//xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); 
		xhr.send();
		//console.log(xhr.response);
		//var messageId = xhr.response;
		
		grabChatMessageId();
		//var newMessage = xhr.response;
		
		//chatMessage.innerHTML +=  newMessage + "<br>";
		document.getElementById("chatInput").value = "";
	}
}

function grabChatMessageId(){
	xhr.open('GET', 'api_test1.php?mykey='+ userName, false);
	xhr.onreadystatechange = function () {
  		if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
	    var allmessages=xhr.response; //messages arrive as one giant string, separated by "ENTER"
		document.getElementById("chatField").innerHTML = allmessages.replace(/(?:\r\n|\r|\n)/g, '<br />'); //writes messages to div, replaces enter with <br/>
		scrollBottom(); //calls scroll function so newest messages are shown
	  	}
	};
	xhr.send();
}

function getAllIds(){
	urlReadIds = "https://codegorilla.nl/read_write/api.php?action=list&mykey="+ myKey;
	xhr.open("GET", urlReadIds, false);
	xhr.send();
	oldMsgs = xhr.response;
	oldMsgs = oldMsgs.split(",");
	
	for (i=0 ; i < oldMsgs.length ; i++) {
		oldMsgs[i] = parseInt(oldMsgs[i]);
	}
}	

function getOldMsg(){
	var chatMessage = document.getElementById('chatField');
	for (i=0; i  < oldMsgs.length; i++){
		if  (oldMsgs[i] > topID){ 
			grabChatMessageId(oldMsgs[i]);
			var newMessage = xhr.response;
			
			chatMessage.innerHTML += newMessage + "<br>";
			topID = oldMsgs[i];
			scrollBottom();
			var audio = new Audio('audio/unsure.mp3');
			audio.play();
		}
	}
}

function scrollBottom(){
	$("#chatField").scrollTop($("#chatField").prop("scrollHeight"));
}

function loadHome() {
	clearInterval(myInterval);
	
	document.getElementById("chatRoom").style.display = "none";
	document.getElementById("logIn").style.display = "block";
	
	document.getElementById("userName").value = "";
	document.getElementById("myKey").value = "";
	
	document.getElementById("userName").focus();
}


