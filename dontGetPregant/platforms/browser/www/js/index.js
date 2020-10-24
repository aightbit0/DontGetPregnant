

var storage = window.localStorage;
thetime = storage.getItem("triggertime");

function getTime(){
	var wann = storage.getItem("triggertime");
		splitter = wann.split(":");
		console.log("Stunde: "+parseInt(splitter[0])+" Minute: "+parseInt(splitter[1]))
	    cordova.plugins.notification.local.schedule({
	    	title: 'nimm die Pille!!!',
	    	trigger: { every: {hour: parseInt(splitter[0]), minute: parseInt(splitter[1])}}
		});
}

function setStuff(){
	document.getElementById("timetofire").value = thetime;
	var value = storage.getItem("noti");
	if(value == "ja"){
		document.getElementById("checker").checked = true;
	}
}

function setTrue(){
	if(document.getElementById("checker").checked == false){
		storage.setItem("noti", "nein");
	}else{
		var wann2 = storage.getItem("triggertime");
		if(wann2){
			alert("Benachrichtigungen wurden gesetzt");
			storage.setItem("noti", "ja");
			getTime();
		}else{
			alert("Baby, erst mal ne Uhrzeit einstellen bitte");
			document.getElementById("checker").checked = false;
		}	
	}
}

function setTime(tme){
	//getTime();
    console.log(document.getElementById("timetofire").value);
	//var value = storage.getItem(key); // Pass a key name to get its value.
	storage.setItem("triggertime", tme) // Pass a key name and its value to add or update that key.
	//storage.removeItem(key) // Pass a key name to remove that key from storage.
}
