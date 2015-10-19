
var memory_values = [];
var memory_card_id = [];
var card_flipped = 0;
var points = 0;
var playerName = '';
var playerEmail = '';
var cards_array = ['orange', 'yellow', 'red', 'green', 'blue', 'purple', 'brown', 'magenta', 'orange', 'yellow', 'red', 'green', 'blue', 'purple', 'brown', 'magenta'];
var selected = 0;
var flippedAndMatched = [];
Array.prototype.shuffle = function(){
	var i = this.length, j, temp;
	while(--i > 0){
		
		j = Math.floor(Math.random() * (i+1));
		
		temp = this[j];
		this[j] = this[i];
		this[i] = temp;
	}
	
}


function gameBoard(){
	
	card_flipped = 0;
	points = 0;
	var output = '';
	var c = cards_array[4];
	document.getElementById("score").innerHTML = points;
	cards_array.shuffle();
	for(var i = 0; i < cards_array.length; i++){
		output += '<div id = "card_'+i+'" ></div>';
		
	}
	document.getElementById('gameBoard').innerHTML = output;
	selectNew(selected);

		
}

function cardFlip(div, color){
	if(div.innerHTML == "" && memory_values.length < 2){
		
		div.style.background = color;

		if(memory_values.length == 0){
			memory_values.push(color);
			memory_card_id.push(div.id);

		} else if(memory_values.length == 1){
			memory_values.push(color);
			memory_card_id.push(div.id);
			if(memory_values[0] == memory_values[1]){
				card_flipped += 2;
				flippedAndMatched.push(memory_card_id[0]);
				flippedAndMatched.push(memory_card_id[1]);
				memory_values = [];
				memory_card_id = [];
				points++;
				
				document.getElementById("score").innerHTML = points;

				if(card_flipped == cards_array.length){

					$('#playerInfoModal').modal('show');
					
					
				}
			} else {
				function flip2Back(){
					var flag = 0;
					var card_1 = document.getElementById(memory_card_id[0]);
					var card_2 = document.getElementById(memory_card_id[1]);
					if(!matchedAlready(memory_card_id[0])){
					card_1.style.background = '#E1E1E1';
					card_1.innerHTML = "";
					flag++;
				}
				  if(!matchedAlready(memory_card_id[1])){
					card_2.style.background = '#E1E1E1';
					card_2.innerHTML = "";
					flag++
						}
					if(flag == 2)
					   points--;
					document.getElementById("score").innerHTML = points;
					memory_values = [];
					memory_card_id = [];
				}

				setTimeout(flip2Back, 400);
			}
		}
	}
}

$(document).on('keyup', function (e) {
	
		switch(e.which){
			case 39:
			if(selected > 14){
				unselectPrevious(selected);
				selected = 0;
				selectNew(selected);
			} else{
				unselectPrevious(selected);
				selectNew(++selected);
		   }
		   break;

		   case 13:
		   		if(!matchedAlready("card_"+selected))
		   		cardFlip(document.getElementById("card_"+selected),cards_array[selected]);
				break;
			case 37:
			if(selected == 0){
				selectNew(15);
				unselectPrevious(selected);
				selected = 15;
			}
			else{
				unselectPrevious(selected);
				selectNew(--selected);
			}

			break;

			case 38:
				if(selected < 4){
					unselectPrevious(selected);
					selected = selected + 12;
					selectNew(selected);
				}
				else{
					unselectPrevious(selected);
					selected = selected - 4;
				    selectNew(selected);
				    }
				break;

				case 40:
				if(selected > 11){
					unselectPrevious(selected);
					selected = selected - 12;
					selectNew(selected);
				}
				else{
					unselectPrevious(selected);
					selected = selected + 4;
				    selectNew(selected);
				    }
				break;
		}
	});



function matchedAlready(selected){
	
	for(var i = 0; i < flippedAndMatched.length; i++){
		if(flippedAndMatched[i] == selected)
		{
			console.log("flipped value:"+flippedAndMatched[i]);
			return true;
		}
	
	}
			return false;
}
function unselectPrevious(id){

	document.getElementById("card_"+id).style.borderColor = "#000";
	document.getElementById("card_"+id).style.borderWidth = "1px";
}

function selectNew(id){
	document.getElementById("card_"+id).style.borderColor = "#E69400";
			document.getElementById("card_"+id).style.borderWidth = "3px";

}

function getKeyControls(){

	

	document.getElementById("card_"+selected).style.borderColor = "#E69400";
	document.getElementById("card_"+selected).style.borderWidth = "3px";
	
	
}



function restart(){

	if (confirm("Do you want to play again?") == true) {
        document.getElementById('gameBoard').innerHTML = "";
					gameBoard();
					point = 0;
					document.getElementById("score").innerHTML = points;
    } else {
       	document.getElementById('gameBoard').innerHTML = "<center><h2>Thank you "+playerName+" for playing</h2></center>"
       	document.getElementById("score").innerHTML = points;
    }

    document.getElementById("finalScore").innerHTML = "You scored "+points+" points";

	$('#playerInfoModal').modal('show');				
}

function submitFunc(){
	console.log("in submit button function");
  playerName = document.getElementById("name").value; //$("#name").val()";
  playerEmail = document.getElementById("email").value; //$("#email").val();
  if(playerName == '' || playerEmail == ''){
  	if(playerName == ''){
  		document.getElementById("emptyFieldMessage").innerHTML = "<span style='color: red;'>Please enter player name</span>";
  	 }
  	 else{
  	 	document.getElementById("emptyFieldMessage").innerHTML   = "<span style='color: red;'>Please enter email</span>";
  	 }
  	 }
  	 else if (!isValidEmailAddress(playerEmail)){
  	 	document.getElementById("emptyFieldMessage").innerHTML   = "<span style='color: red;'>Please enter valid email</span>";
  	 }

else{
  saveToDB(playerName, playerEmail);
  $('#playerInfoModal').modal('hide');
  ranking();
  //restart();
}
}
  
function saveToDB(playerName, playerEmail){
	$("document").ready(function(){
	$.ajax({
         url: "/MemoryGame/index.php",
         type: "POST",
		dataType: "json",
         data: { name: playerName, email: playerEmail, score: points},
         //cache: false,
         success: function (response) {
         	 alert("hello");
         	            
         }

     });
});
}

$(document).ready(function(){
    //attach a jQuery live event to the button
    $('#submitButton').on('click', function(){
        $.getJSON('index.php', function(data) {
            alert(data); //uncomment this for debug
            //alert (data.item1+" "+data.item2+" "+data.item3); //further debug
            //$('#showdata').html("<p>item1="+data.item1+" item2="+data.item2+" item3="+data.item3+"</p>");
        });
    });
});

function ranking(){
	
     console.log("in ranking");
    //     if (window.XMLHttpRequest) {
    //         // code for IE7+, Firefox, Chrome, Opera, Safari
    //         xmlhttp = new XMLHttpRequest();
    //     } else {
    //         // code for IE6, IE5
    //         xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    //     }
    //     xmlhttp.onreadystatechange = function() {
    //         if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
    //         	console.log("in xml");
    //             console.log(xmlhttp.responseText);
    //         }
    //     }
    //     xmlhttp.open("GET","/MemoryGame/index.php",true);
    //     xmlhttp.send();
    // }

// 	$.ajax({
//   		url: "/MemoryGame/index.php",
  		
//   		dataType: "JSON",
  
//         success: function(highestPlayer){
//         console.log("in  success ranking");	
//     alert(highestPlayer);
// }
//     });

$.getJSON('index.php',function(jsonData){
	console.log("in jsonget");
    alert("the recieved data is:"+jsonData); 
});    
}


function isValidEmailAddress(emailAddress) {
    var pattern = new RegExp(/^(("[\w-+\s]+")|([\w-+]+(?:\.[\w-+]+)*)|("[\w-+\s]+")([\w-+]+(?:\.[\w-+]+)*))(@((?:[\w-+]+\.)*\w[\w-+]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][\d]\.|1[\d]{2}\.|[\d]{1,2}\.))((25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\.){2}(25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\]?$)/i);
    return pattern.test(emailAddress);
};









					