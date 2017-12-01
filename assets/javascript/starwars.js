var characterSelected = false;
var defenderSelected = false;
var character = {};
var defender = {};
var enemiesDefeated = 0;
gameOver = false;

var obiWanKenobi = {
	name: "Obi-Wan Kenobi",
	health: 120,
	baseAttack: 8,
	attack:8,
};

var lukeSkywalker = {
	name: "Luke Skywalker",
	health: 100,
	baseAttack: 5,
	attack: 5,
};

var darthSidious = {
	name: "Darth Sidious",
	health: 150,
	baseAttack: 20,
	attack: 20,
};

var darthMaul = {
	name: "Darth Maul",
	health: 180,
	baseAttack: 25,
	attack: 25,
};

function initializeCharacter(chosenCharacter){
	character.name = chosenCharacter.name;
	character.health = chosenCharacter.health;
	character.baseAttack= chosenCharacter.baseAttack;
	character.attack = chosenCharacter.attack;
}

function initializeDefender(chosenDefender){
	defender.name = chosenDefender.name;
	defender.health = chosenDefender.health;
	defender.baseAttack = chosenDefender.baseAttack;
	defender.attack = chosenDefender.attack;
}

function moveToEnemies(){
	$(".available-character").removeClass("available-character").addClass("enemies");
	$("#enemies").append($(".enemies"));
}

function restartGame(){
	$("#obi").children(".health").html(obiWanKenobi.health);
	$("#luke").children(".health").html(lukeSkywalker.health);
	$("#sidious").children(".health").html(darthSidious.health);
	$("#maul").children(".health").html(darthMaul.health);

	$(".image").removeClass("character enemies defender").addClass("available-character");
	var available = $(".available-character").show();
	$("#characters-available").html(available);

	$("#message").empty();
	$("#restart").hide();

	characterSelected = false;
	defenderSelected = false;
	character = {};
	defender = {};
	enemiesDefeated = 0;
	gameOver = false;
}

$(document).ready(function() {

	$("#restart").hide();

	$("#obi").on("click", function() {
		console.log("Obi-Wan Kenobi is selected");

		if (characterSelected === false){
			$("#message").empty();

			initializeCharacter(obiWanKenobi)
			characterSelected = true;

			$("#obi").removeClass("available-character").addClass("character");
			$("#character").append(this);

			moveToEnemies();
		}

		else if ((characterSelected === true) && (defenderSelected === false)) {

			if ($("#obi").hasClass("enemies")){
				$("#message").empty();

			initializeDefender(obiWanKenobi);
			defenderSelected = true;

			$("#obi").removeClass("enemies").addClass("defender");
			$("#defender").append(this);

			}
		}
	});

	$("#luke").on("click", function() {
		console.log("Luke Skywalker is selected");

		if (characterSelected === false){
			$("#message").empty();

			initializeCharacter(lukeSkywalker)
			characterSelected = true;

			$("#luke").removeClass("available-character").addClass("character");
			$("#character").append(this);

			moveToEnemies();
		}

		else if ((characterSelected === true) && (defenderSelected === false)) {

			if ($("#luke").hasClass("enemies")){
				$("#message").empty();

			initializeDefender(lukeSkywalker);
			defenderSelected = true;

			$("#luke").removeClass("enemies").addClass("defender");
			$("#defender").append(this);

			}
		}
	});

	$("#sidious").on("click", function() {
		console.log("Darth Sidious is selected");

		if (characterSelected === false){
			$("#message").empty();

			initializeCharacter(darthSidious)
			characterSelected = true;

			$("#sidious").removeClass("available-character").addClass("character");
			$("#character").append(this);

			moveToEnemies();
		}

		else if ((characterSelected === true) && (defenderSelected === false)) {

			if ($("#sidious").hasClass("enemies")){
				$("#message").empty();

			initializeDefender(darthSidious);
			defenderSelected = true;

			$("#sidious").removeClass("enemies").addClass("defender");
			$("#defender").append(this);

			}
		}
	});

		$("#maul").on("click", function() {
		console.log("Darth Maul is selected");

		if (characterSelected === false){
			$("#message").empty();

			initializeCharacter(darthMaul)
			characterSelected = true;

			$("#maul").removeClass("available-character").addClass("character");
			$("#character").append(this);

			moveToEnemies();
		}

		else if ((characterSelected === true) && (defenderSelected === false)) {

			if ($("#maul").hasClass("enemies")){
				$("#message").empty();

			initializeDefender(darthMaul);
			defenderSelected = true;

			$("#maul").removeClass("enemies").addClass("defender");
			$("#defender").append(this);

			}
		}
	});

		$("#attack").on("click", function() {
			console.log("Attack selected");

			if (characterSelected && defenderSelected && !gameOver) {

				defender.health = defender.health - character.attack;
				$(".defender").children(".health").html(defender.health);
				$("#message").html("<p>You attacked " + defender.name + " for " + character.attack + " damage.</p>");

				character.attack = character.attack + character.baseAttack;

				if (defender.health > 0) {

					character.health = character.health - defender.baseAttack;
					$(".character").children(".health").html(character.health);

					if (character.health > 0) {
						$("#message").append("<p>" + defender.name + " attacked you back for " + defender.baseAttack + " damage.</p>"); 
				}
				else {
					gameOver = true;
					$("#message").html("<p>You've been defeated...GAME OVER!!!</p>");
					$("#restart").show();
				}
			}	
				else{ 
					enemiesDefeated++;
					defenderSelected = false;
					$("#message").html("<p>You have defeated " + defender.name + ". Choose another enemy.</p>");
					$(".defender").hide();

					if (enemiesDefeated === 3) {
						gameOver = true;
						$("#message").html("<p>You won!!!! GAME OVER!!!</p>");
						$("#restart").show();
					}
				}
			}
			else if (!characterSelected && !gameOver) {
				$("#message").html("<p>You must first select your character</p>");
			}	
			else if (!defenderSelected && !gameOver) {
				$("#message").html("<p>No enemy here</p>");
			}
		});

		$("#restart").on("click", function() {
			console.log("Restart selected");

			restartGame();
		});
});
