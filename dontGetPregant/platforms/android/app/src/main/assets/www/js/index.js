

var storage = window.localStorage;
thetime = storage.getItem("triggertime");

dayarr = ["mo","di","mi","do","fr","sa","so"];

motivationarr = ["Have a nice Day","How are you?","Drink some Water","Eat healthy","its a good Day",":)",":D"];

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
	cordova.plugins.notification.local.hasPermission(function (granted) { alert(granted)});
	cordova.plugins.notification.local.getDefaults();
	cordova.plugins.notification.local.on("click", function (notification) {
		if (confirm('Hast du die Pille genommen?')) {
			var d = new Date();
			var n = d.getDay(); 
			n=n-1; 
			storage.setItem(dayarr[n],"true");
			setStuff();
		} else {
			alert("du wirst nochmals benachrichtigt");
			cordova.plugins.notification.local.schedule({
				title: 'Denk daran die Pille zu nehmen!',
				trigger: { in: 5, unit: 'minute' }
			});
		}
	  });
	  setStuff();
}

function getTime(){
	
	var wann = storage.getItem("triggertime");
		splitter = wann.split(":");
		console.log("Stunde: "+parseInt(splitter[0])+" Minute: "+parseInt(splitter[1]))
	    cordova.plugins.notification.local.schedule({
			foreground: true,
			title: 'nimm die Pille!!!',
	    	trigger: { every: {hour: parseInt(splitter[0]), minute: parseInt(splitter[1])}}
		});
}


function setStuff(){
	document.getElementById("timetofire").value = thetime;
	var value = storage.getItem("noti");
	if(value == "ja"){
		document.getElementById("checkbox").checked = true;
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
	if(storage.getItem("noti") == "ja"){
		document.getElementById("status").innerHTML = "&#x23F0; um "+storage.getItem("triggertime")+" Uhr";
	}

}

function setTrue(){
	if(document.getElementById("checkbox").checked == false){
		storage.setItem("noti", "nein");
		document.getElementById("status").innerHTML = "keine Benachrichtigungen";
		cordova.plugins.notification.local.cancelAll(function() {
			alert("Alle Benachrichigungen werden deaktiviert");
		}, this);
		
	}else{
		var wann2 = storage.getItem("triggertime");
		if(wann2){
			alert("Benachrichtigungen wurden gesetzt");
			storage.setItem("noti", "ja");
			getTime();
			document.getElementById("status").innerHTML = "&#x23F0; um "+storage.getItem("triggertime")+" Uhr";
		}else{
			alert("Baby, erst mal ne Uhrzeit einstellen bitte");
			document.getElementById("checkbox").checked = false;
		}	
	}
}

function setTime(tme){
    console.log(document.getElementById("timetofire").value);
	storage.setItem("triggertime", tme);
	document.getElementById("checkbox").checked = false;
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
