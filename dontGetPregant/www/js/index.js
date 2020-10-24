

var storage = window.localStorage;
thetime = storage.getItem("triggertime");

dayarr = ["mo","di","mi","do","fr","sa","so"];

motivationarr = ["Have a nice Day","I Love you","Drink some Water","Sven is the Best *.*","Sonja is the best *.*"];

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
	for (var i = 0; i < dayarr.length; i++) {
		if( storage.getItem(dayarr[i]) == "true" ){
			document.getElementById(dayarr[i]).style.background ="lightgreen";
		}else{
			document.getElementById(dayarr[i]).style.background ="lightpink";
		}
	}
	numb = Math.floor(Math.random() * motivationarr.length);
	document.getElementById("motivation").innerHTML = motivationarr[numb];

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

function toggleDays(day){
	console.log(day);
	if(storage.getItem(day)){
		if(storage.getItem(day) == "false"){
			document.getElementById(day).style.background ="lightgreen";
			storage.setItem(day,"true");
		}else{
			document.getElementById(day).style.background ="lightpink";
			storage.setItem(day,"false");
		}
	}else{
		storage.setItem(day,"true");
		document.getElementById(day).style.background ="lightgreen";
	}
}

function setBackDays(){
	for (var i = 0; i < dayarr.length; i++) {
		storage.setItem(dayarr[i],"false");
		document.getElementById(dayarr[i]).style.background ="lightpink";
	}
}
