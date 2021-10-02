//function execute() will execute function parseXML() only when the form validation succeeded
function execute() {
	if (validate()) {			//if function validate() returns true
		parseXML();		//then call function parseXML()
	}
}

/* function validate() will validate form data */
function validate() {
	var fileName = $("#tbFile").val();							//obtain the XML filename from the text box
	var errMsg = "";												//initialise the error message
	var result = true;											//initialise the result
	var pattern = /^[a-zA-Z0-9_]+\.xml$/;		//regular pattern for a valid xml filename
	console.log(fileName)
	if (!fileName) {											//check if a filename is entered
		errMsg += "Please enter a filename.\n";
	} else {
		if (!fileName.match(pattern)) {					//check if the filename entered is valid
			errMsg += "Please enter a valid XML filename.\n";
		} else if (fileName != "nba.xml") {  							//check if the filename is nba.xml
			errMsg += "Please enter 'nba.xml', which is currently the only available XML file.";
		}
	}

	if (errMsg != "") {												//if there is an error, display the error message
		alert(errMsg);
		result = false;
	} else {
		result = true;												//if the validation succeeded, assign true to result
	}
	return result;													//return true or false to indicate successful or failed form validation
}

function parseXML() {
	var xhttp = new XMLHttpRequest();				//Create a XML HTTP request object

	xhttp.open("GET", "nba.xml", false);				//setup the XML HTTP request
	xhttp.send();													//send the requrest to retrieve the XML document

	xmlDoc = xhttp.responseXML;							//obtain received XML document

	// console.log(xmlDoc);
	//build a table using JavaScript
	document.write("<table id='teamTable'>");
	document.write("<caption>NBA Teams</caption>");
	document.write("<tr><th>Team Name</th><th>Location</th><th>Star Player</th><th>Stadium</th></tr>");

	//access nodes using their names
	var teams = xmlDoc.getElementsByTagName("Team");
	console.log(teams)		//accessing the nodes named "Team"
	// var teamNames = xmlDoc.TeamName;									//accessing the nodes named "TeamName"
	// var locations = xmlDoc.Location;										//accessing the nodes named "Location"
	// var starPlayers = xmlDoc.StarPlayer;									//accessing the nodes named "StarPlayer"
	// var stadiums = xmlDoc.Stadium;										//accessing the nodes named "Stadium"

	// using a loop. insert rows into the table
	for (let team of teams) {
		var teamName = team.children[0].innerHTML;	//retrieve the value of a node in the array teamNames
		// console.log(teamName)
		var location = team.children[1].innerHTML;		//retrieve the value of a node in the array locations
		var starPlayer = team.children[2].innerHTML;	//retrieve the value of a node in the array starPlayers
		var stadium = team.children[3].innerHTML;		//retrieve the value of a node in the array stadiums

		//insert an <tr> element using the values retrieved above
		document.write("<tr><td>" + teamName + "</td>" + "<td>" + location + "</td>" + "<td>" + starPlayer + "</td>" + "<td>" + stadium + "</td>" + "</tr>");
	}


	//style the table
	$("#teamTable").css("border", "1px solid black");
	$("th").css("border", "1px solid black");
	$("td").css("border", "1px solid black");
}

//link functions to elements' events
function init() {
	$("#btnExecute").click(execute);		//link function execute() to the click event of the button
	// $("#execute").submit(validate);		//link function execute() to the submit event of the form
}

//the initialise function
$(document).ready(init);