$(document).ready( function(){


var healths = [520,150,140,165];
var healthID = ["ph1", "ph2", "ph3", "ph4"];
var playerImg = ["assets/images/player1.png","assets/images/player2.jpg","assets/images/player3.png","assets/images/player4.png"];
var characterNames = ["Obi Kenobi", "Darth Vader", "Boba Fett", "Chewbacca"];
var players = ["player1","player2","player3","player4"];
var imgs = ["img1","img2","img3","img4"];
var attack = false;
var playerPicked = 0;
var enemyPicked = 0;
var numClick = 1;


//Creating html tags for images and other elements

$(".container").prepend($("<h1>").text("LEGO Star Wars RPG"));


for (var i = 0; i<4; i++){
	var characters = $("<div>", 
		{ 	id: players[i],
			width: 200,
            height: 250
	});
	characters.addClass("col-md-3 individualPlayers");
	$("#players").append(characters);

	var names = $("<h3>",
		{
			height: 22,
			width: 140
		});
	names.addClass("playerNames");
	names.text(characterNames[i]);
	characters.prepend(names);

	var img = $('<img>',
             { src: playerImg[i],
               id: imgs[i],
               width: 140,
               height: 140
             });
	characters.append(img);

	var health = $("<h3>",
		{	id: healthID[i],
			height: 22,
			width: 140
		});

	health.addClass("health");
	health.text(healths[i]);
	characters.append(health);
}


//adding responsive text after creating image elements
$("#chosen").append($("<h3>",{height:30, width: 300}).text("Your character"));
$("#enemy").append($("<h3>",{height:30, width: 300}).text("Enemies Available to Attack"));
$("#attackField").append($("<h3>",{height:30, width: 300}).text("Fight Section"));

//attack button
var buttonAttack = $("<button>");
	buttonAttack.addClass("button");
	buttonAttack.html("Attack");
	$("#attackField").append(buttonAttack);

$("#attackField").append($("<h3>",{height:30,width: 300}).text("Defender"));


//Start Game by clicking players. Click responsive selection of characters
$(".individualPlayers").one("click",function(event){

	
	if($(event.target).attr("id")=="player1" || $(event.target).attr("id")=="img1"){
        
        playerPicked = 0;
        $("#chosen").append($("#player1"));
        $("#enemy").append($("#player2, #player3, #player4"));
        $("#player2, #player3, #player4").css({"background-color":"red", "border-color":"#730800"});
        $("#player2, #player3, #player4").unbind();
    } 

    else if($(event.target).attr("id")=="player2" || $(event.target).attr("id")=="img2"){
    	
    	playerPicked = 1;
        $("#chosen").append($("#player2"));
        $("#enemy").append($("#player1, #player3, #player4"));
        $("#player1, #player3, #player4").css({"background-color":"red", "border-color":"#730800"});
        $("#player1, #player3, #player4").unbind();
    } 

    else if($(event.target).attr("id")=="player3" || $(event.target).attr("id")=="img3"){
    	
    	playerPicked = 2;
        $("#chosen").append($("#player3"));
        $("#enemy").append($("#player2, #player1, #player4"));
        $("#player2, #player1, #player4").css({"background-color":"red", "border-color":"#730800"});
        $("#player2, #player1, #player4").unbind();    
    } 

    else if($(event.target).attr("id")=="player4" || $(event.target).attr("id")=="img4"){
    	
    	playerPicked = 3;
        $("#chosen").append($("#player4"));
        $("#enemy").append($("#player2, #player3, #player1"));
        $("#player2, #player3, #player1").css({"background-color":"red", "border-color":"#730800"}); 
        $("#player2, #player3, #player1").unbind();  
    } 

    $("#players").remove();

});


//after selecting personal character time to select enemy to fight
$("#enemy").one("click",function(event){


	if($(event.target).attr("id")=="player1" || $(event.target).attr("id")=="img1"){
        
        enemyPicked = 0;
        $("#attackField").append($("#player1"));
        $("#player1").css({"background-color":"black", "border-color":"green"});
        $("#player1, #player2, #player3, #player4").unbind();
    } 

    else if($(event.target).attr("id")=="player2" || $(event.target).attr("id")=="img2"){

    	enemyPicked = 1;
    	$("#attackField").append($("#player2"));
        $("#player2").css({"background-color":"black", "border-color":"green"});
        $("#player1, #player2, #player3, #player4").unbind();
    } 

    else if($(event.target).attr("id")=="player3" || $(event.target).attr("id")=="img3"){

    	enemyPicked = 2;
    	$("#attackField").append($("#player3"));
        $("#player3").css({"background-color":"black", "border-color":"green"});
        $("#player1, #player2, #player3, #player4").unbind();
    } 

    else if($(event.target).attr("id")=="player4" || $(event.target).attr("id")=="img4"){

    	enemyPicked = 3;
    	$("#attackField").append($("#player4"));
        $("#player4").css({"background-color":"black", "border-color":"green"});
        $("#player1, #player2, #player3, #player4").unbind();
    } 

    attack = true;
    $("#yourDamage").html(""); 
    

});


var IDs = ["#ph1","#ph2","#ph3","#ph4"];
var playerId = ["#player1", "#player2", "#player3","#player4"];
var numDefeat = 1;


//creating reposive text tag 
$("#text").append($("<p>",{id: "yourDamage", height:30, width: 300}));
$("#text").append($("<p>",{id: "enemyDamage", height:30, width: 300}));


//Attack Action by clicking button
$(".button").on("click", function(){

	
	if (attack ===true){

		healths[playerPicked] -= 25;
		healths[enemyPicked] -= (8*numClick);
		$(IDs[playerPicked]).html(healths[playerPicked]);
		$(IDs[enemyPicked]).html(healths[enemyPicked]);
		$("#yourDamage").html("You attacked " + players[enemyPicked] + " for " + (8*numClick));
		$("#enemyDamage").html(players[enemyPicked] + " attacked you for " + 25);

			if(healths[playerPicked]<0){

				$(".button").off("click");
				$("#yourDamage").html(" You are dead... You Lost!"); 
				$("#enemyDamage").html(" Winner is " + players[enemyPicked]);
				$("#enemyDamage").remove();
				$(playerId[enemyPicked]).remove();
				$("#attackField").append($("<button>").text("reset").addClass("buttonReset").on("click", function(){location.reload();}));
				$(".button").off("click");   

			}

			else if(healths[enemyPicked]<0){
				
				attack = false;
				$("#enemyDamage").html("You have Defeated " + players[enemyPicked] + ", you can chose to fight another enemy!");
				$(playerId[enemyPicked]).remove();

				$("#enemy").one("click",function(event){

						attack = true;

						if($(event.target).attr("id")=="player1" || $(event.target).attr("id")=="img1"){
       					enemyPicked = 0;
        				$("#attackField").append($("#player1"));
        				$("#player1").css({"background-color":"black", "border-color":"green"});
        				$("#player1, #player2, #player3, #player4").unbind();
    					} 

    					else if($(event.target).attr("id")=="player2" || $(event.target).attr("id")=="img2"){
    					enemyPicked = 1;
    					$("#attackField").append($("#player2"));
        				$("#player2").css({"background-color":"black", "border-color":"green"});
        				$("#player1, #player2, #player3, #player4").unbind();
   						} 

    					else if($(event.target).attr("id")=="player3" || $(event.target).attr("id")=="img3"){
    					enemyPicked = 2;
    					$("#attackField").append($("#player3"));
        				$("#player3").css({"background-color":"black", "border-color":"green"});
        				$("#player1, #player2, #player3, #player4").unbind();
    					} 

    					else if($(event.target).attr("id")=="player4" || $(event.target).attr("id")=="img4"){
    					enemyPicked = 3;
    					$("#attackField").append($("#player4"));
        				$("#player4").css({"background-color":"black", "border-color":"green"});
        				$("#player1, #player2, #player3, #player4").unbind();
    					} 
    					numDefeat++;
    					$("#yourDamage").html(""); 
    					$("#enemyDamage").html("");
				});

				if (numDefeat === (players.length-1)){
					$("#yourDamage").html(" YOU WIN!!!!!"); 
					$("#enemyDamage").remove();
					$("#attackField").append($("<button>").text("reset").addClass("buttonReset").on("click", function(){location.reload();}));
					$(".button").off("click");
				}
			}


		numClick++;
	}

	else {
		$("#yourDamage").html("No Enemy Selected!!!"); 
		$("#enemyDamage").html("");
	}

});


});

