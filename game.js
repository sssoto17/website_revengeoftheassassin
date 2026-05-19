window.addEventListener("load", siteLoad);

//VARIABLES AND CONSTANTS

let score;
let life;
let time;
let minTimer;

const cultist = document.querySelector("#cultist_container");
const heart = document.querySelector("#heart_container");
const criminal1 = document.querySelector("#criminal_container1");
const criminal2 = document.querySelector("#criminal_container2");
const criminal3 = document.querySelector("#criminal_container3");
const civilian1 = document.querySelector("#civilian_container1");
const civilian2 = document.querySelector("#civilian_container2");
const civilian3 = document.querySelector("#civilian_container3");
const civilian4 = document.querySelector("#civilian_container4");
const civilian5 = document.querySelector("#civilian_container5");
const sun = document.querySelector("#game_sun");

function randomNum(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

//GAME

function siteLoad() {
	console.log("Site loaded");

	//PLAY BG MUSIC
	document.querySelector("#screen").addEventListener("mousedown", bgMusic);
	document.querySelector("#mute_button").classList = "sound_on";

	//MUSIC MUTE BUTTON
	document
		.querySelector("#mute_button")
		.addEventListener("mousedown", musicMute);
	document
		.querySelector("#guide_button")
		.addEventListener("mousedown", playGuide);

	//mousedown START BUTTON
	document.querySelector("#start_button").classList = "";
	document.querySelector("#start_button").textContent = "Play";
	document
		.querySelector("#start_button")
		.addEventListener("mousedown", playGuide);
}

function playGuide() {
	//DISPLAY GUIDE
	document.querySelector("#how_to").classList.remove("hide");
	document.querySelector("#start_button").classList.add("hide");

	//BACK TO TITLE SCREEN
	document
		.querySelector("#close_button")
		.addEventListener("mousedown", backStart);
	document
		.querySelector("#guide_button")
		.addEventListener("mousedown", backStart);

	//START GAME
	document.querySelector("#play_button").textContent = "Play";
	document
		.querySelector("#play_button")
		.addEventListener("mousedown", startGame);
}

function backStart() {
	//HIDE SCREENS
	document.querySelector("#how_to").classList = "";
	document.querySelector("#how_to").classList.add("hide");
	document.querySelector("#game_over").classList = "";
	document.querySelector("#game_over").classList.add("hide");
	document.querySelector("#level_complete").classList = "";
	document.querySelector("#level_complete").classList.add("hide");

	//DISPLAY TITLE SCREEN
	document.querySelector("#start").classList = "";

	//GUIDE BUTTON
	document
		.querySelector("#guide_button")
		.removeEventListener("mousedown", backStart);
	document
		.querySelector("#guide_button")
		.addEventListener("mousedown", playGuide);

	//mousedown START BUTTON
	document.querySelector("#start_button").classList = "";
	document.querySelector("#start_button").textContent = "Play";
	document
		.querySelector("#start_button")
		.addEventListener("mousedown", startGame);
}

function musicMute() {
	console.log("Mute the music.");

	if (document.querySelector("#bg_music").currentTime != 0) {
		console.log("Music is playing.");
		document
			.querySelector("#screen")
			.removeEventListener("mousedown", bgMusic);
		document.querySelector("#bg_music").pause();
		document.querySelector("#bg_music").currentTime = 0;
		document.querySelector("#mute_button").classList = "";
		document.querySelector("#mute_button").classList.add("sound_mute");
	} else {
		console.log("Music is not playing.");
		bgMusic();
		document.querySelector("#mute_button").classList = "";
		document.querySelector("#mute_button").classList.add("sound_on");
	}
}

function startGame() {
	//HIDE SCREENS
	document.querySelector("#start").classList = "hide";
	document.querySelector("#how_to").classList = "hide";

	document.querySelector("#game_over").classList = "hide";
	document.querySelector("#level_complete").classList = "hide";

	//DISPLAY GAME SCREEN
	document.querySelector("#game").classList.remove("hide");

	//KNIFE mousedown SOUND EFFECT
	document.querySelector("#screen").addEventListener("mousedown", knifeSlash);
	document.querySelector("#heart_bonus").currentTime = 1;

	//RESET SCORE AND LIVES
	score = 0;
	life = 3;

	//PRINT SCORE AND LIFE
	document.querySelector("#score").textContent = score;

	document.querySelector("#life1").classList.remove("life_hide");
	document.querySelector("#life2").classList.remove("life_hide");
	document.querySelector("#life3").classList.remove("life_hide");
	document.querySelector("#life4").classList.add("life_hide");
	document.querySelector("#life5").classList.add("life_hide");

	//TIMER
	time = 6;
	startTimer();
	sun.classList.add("sun_kf");

	//POSITION BONUS ELEMENTS
	cultist.classList.add(
		"pos" + randomNum(1, 4),
		"cultist_speed",
		"delay" + randomNum(1, 9),
	);
	heart.classList.add(
		"pos" + randomNum(1, 4),
		"cultist_speed",
		"delay" + randomNum(6, 9),
	);

	//POSITION CRIMINALS
	criminal1.classList.add(
		"pos" + randomNum(1, 4),
		"criminal_speed",
		"delay" + randomNum(1, 9),
	);
	criminal2.classList.add(
		"pos" + randomNum(1, 4),
		"criminal_speed",
		"delay" + randomNum(1, 9),
	);
	criminal3.classList.add(
		"pos" + randomNum(1, 4),
		"criminal_speed",
		"delay" + randomNum(1, 9),
	);

	//POSITION CIVILIANS
	civilian1.classList.add(
		"pos" + randomNum(1, 4),
		"civilian_speed" + randomNum(1, 3),
		"delay" + randomNum(1, 9),
	);
	civilian2.classList.add(
		"pos" + randomNum(1, 4),
		"civilian_speed" + randomNum(1, 3),
		"delay" + randomNum(1, 9),
	);
	civilian3.classList.add(
		"pos" + randomNum(1, 4),
		"civilian_speed" + randomNum(1, 3),
		"delay" + randomNum(1, 9),
	);
	civilian4.classList.add(
		"pos" + randomNum(1, 4),
		"civilian_speed" + randomNum(1, 3),
		"delay" + randomNum(1, 9),
	);
	civilian5.classList.add(
		"pos" + randomNum(1, 4),
		"civilian_speed" + randomNum(1, 3),
		"delay" + randomNum(1, 9),
	);

	//CULTIST EVENTS
	cultist.addEventListener("mousedown", clickCultist);
	cultist.addEventListener("animationiteration", cultistResetMiss);

	//HEART EVENTS
	heart.addEventListener("mousedown", clickHeart);
	heart.addEventListener("animationiteration", heartReset);

	//mousedown CRIMINAL
	criminal1.addEventListener("mousedown", clickCriminal);
	criminal2.addEventListener("mousedown", clickCriminal);
	criminal3.addEventListener("mousedown", clickCriminal);

	//MISS CRIMINAL
	criminal1.addEventListener("animationiteration", criminalReset);
	criminal2.addEventListener("animationiteration", criminalReset);
	criminal3.addEventListener("animationiteration", criminalReset);

	//mousedown CIVILIAN
	civilian1.addEventListener("mousedown", clickCivilian);
	civilian2.addEventListener("mousedown", clickCivilian);
	civilian3.addEventListener("mousedown", clickCivilian);
	civilian4.addEventListener("mousedown", clickCivilian);
	civilian5.addEventListener("mousedown", clickCivilian);

	//MISS CIVILIAN
	civilian1.addEventListener("animationiteration", civilianReset);
	civilian2.addEventListener("animationiteration", civilianReset);
	civilian3.addEventListener("animationiteration", civilianReset);
	civilian4.addEventListener("animationiteration", civilianReset);
	civilian5.addEventListener("animationiteration", civilianReset);
}

//BG MUSIC & SOUND FX

function bgMusic() {
	document.querySelector("#bg_music").play();
	document.querySelector("#bg_music").loop = true;
}

function knifeSlash() {
	if (document.querySelector("#heart_bonus").currentTime != 0) {
		document.querySelector("#slash").currentTime = 0;
		document.querySelector("#slash").volume = 0.5;
		document.querySelector("#slash").play();
	}
}

//TIMER

function startTimer() {
	if (time > 0) {
		minTimer = setTimeout(printTime, 10000);
	}
	console.log("Timer has started.");
}

function printTime() {
	//Detract time by 1
	time--;
	//Hides symbol
	document.querySelector("#symbol" + (6 - time)).classList.add("symbol_hide");

	if (time > 0) {
		startTimer();
	} else {
		document
			.querySelector("#symbol" + (6 - time))
			.addEventListener("animationend", endGame);
		// endGame();
	}
}

//CULTIST ELEMENT

function clickCultist() {
	console.log("mousedowned");

	//SOUND FX
	document.querySelector("#stab").load();
	document.querySelector("#stab").play();

	score += 3;
	document.querySelector("#score").textContent = score;
	cultist.classList.add("click_once");
	cultist.classList.add("paused");
	cultist.firstElementChild.classList.add("goodclick");
	cultist.addEventListener("animationend", cultistReset);
}

function cultistReset() {
	console.log("cultistReset");
	cultist.classList = "";
	cultist.firstElementChild.classList = "";
	cultist.offsetLeft;
	cultist.classList.add(
		"pos" + randomNum(1, 4),
		"cultist_speed",
		"delay" + randomNum(3, 9),
	);
}

function cultistResetMiss() {
	console.log("cultistReset");

	//SOUND FX
	document.querySelector("#evil").load();
	document.querySelector("#evil").play();

	cultist.classList = "";
	cultist.firstElementChild.classList = "";
	cultist.offsetLeft;
	heart.classList.remove("paused");
	cultist.classList.add(
		"pos" + randomNum(1, 4),
		"cultist_speed",
		"delay" + randomNum(1, 9),
	);

	if (life > 1) {
		document.querySelector("#life" + life).classList.add("life_hide");
		life--;
	} else {
		document.querySelector("#life" + life).classList.add("life_hide");
		endGame();
	}
}

//HEART ELEMENT

function clickHeart() {
	console.log("mousedowned");

	//SOUND FX
	document.querySelector("#heart_bonus").currentTime = 0;
	document.querySelector("#heart_bonus").play();

	if (life < 5) {
		life++;
		document.querySelector("#life" + life).classList.remove("life_hide");
	}

	heart.classList.add("paused");
	heart.classList.add("click_once");
	heart.firstElementChild.classList.add("heartclick");
	heart.addEventListener("animationend", heartReset);
}

function heartReset() {
	console.log("heartReset");

	if (life != 5) {
		console.log("You don't have full life.");
		heart.classList = "";
		heart.firstElementChild.classList = "";
		heart.offsetLeft;
		heart.classList.add(
			"pos" + randomNum(1, 4),
			"cultist_speed",
			"delay" + randomNum(6, 9),
		);
	} else {
		heart.classList = "";
		heart.firstElementChild.classList = "";
		heart.offsetLeft;
		heart.classList.add(
			"pos" + randomNum(1, 4),
			"cultist_speed",
			"delay" + randomNum(6, 9),
		);
		heart.classList.add("paused");
	}
}

//CRIMINAL ELEMENT

function clickCriminal() {
	//SOUND FX
	document.querySelector("#stab").load();
	document.querySelector("#grunt1").load();
	document.querySelector("#grunt2").load();
	document.querySelector("#grunt3").load();
	document.querySelector("#grunt4").load();
	document.querySelector("#grunt5").load();
	document.querySelector("#grunt6").load();
	document.querySelector("#stab").play();
	document.querySelector("#grunt" + randomNum(1, 6)).play();

	score++;
	document.querySelector("#score").textContent = score;

	this.classList.add("paused");
	this.classList.add("click_once");
	this.firstElementChild.classList.add("goodclick");
	this.addEventListener("animationend", criminalReset);
}

function criminalReset() {
	console.log("criminalReset");
	this.classList = "";
	this.firstElementChild.classList = "";
	this.offsetLeft;
	this.classList.add(
		"pos" + randomNum(1, 4),
		"criminal_speed",
		"delay" + randomNum(1, 9),
	);
}

//CIVILIAN ELEMENT

function clickCivilian() {
	//SOUND FX
	document.querySelector("#stab").load();
	document.querySelector("#cry1").load();
	document.querySelector("#cry2").load();
	document.querySelector("#stab").play();
	document.querySelector("#cry" + randomNum(1, 2)).play();

	score -= 5;
	document.querySelector("#score").textContent = score;

	if (life > 1) {
		document.querySelector("#life" + life).classList.add("life_hide");
		life--;
	} else {
		document.querySelector("#life" + life).classList.add("life_hide");
		endGame();
	}
	heart.classList.remove("paused");
	this.classList.add("paused");
	this.classList.add("click_once");
	this.firstElementChild.classList.add("badclick");
	this.addEventListener("animationend", civilianReset);
}

function civilianReset() {
	console.log("civilianReset");
	this.classList = "";
	this.firstElementChild.classList = "";
	this.offsetLeft;
	this.classList.add(
		"pos" + randomNum(1, 4),
		"civilian_speed" + randomNum(1, 3),
		"delay" + randomNum(1, 9),
	);
}

//END GAME

function endGame() {
	console.log("Game ended.");

	document.querySelector("#start_button").classList = "";

	// RESET TIMER
	clearTimeout(minTimer);
	document.querySelector("#symbol1").classList = "";
	document.querySelector("#symbol2").classList = "";
	document.querySelector("#symbol3").classList = "";
	document.querySelector("#symbol4").classList = "";
	document.querySelector("#symbol5").classList = "";
	document.querySelector("#symbol6").classList = "";

	// RESET SUN
	sun.classList = "";

	//REMOVE KNIFE mousedown SOUND EFFECT
	document
		.querySelector("#screen")
		.removeEventListener("mousedown", knifeSlash);

	//POSITION ELEMENTS
	cultist.classList = "";
	cultist.firstElementChild.classList = "";
	heart.classList = "";
	heart.firstElementChild.classList = "";
	criminal1.classList = "";
	criminal1.firstElementChild.classList = "";
	criminal2.classList = "";
	criminal2.firstElementChild.classList = "";
	criminal3.classList = "";
	criminal3.firstElementChild.classList = "";
	civilian1.classList = "";
	civilian1.firstElementChild.classList = "";
	civilian2.classList = "";
	civilian2.firstElementChild.classList = "";
	civilian3.classList = "";
	civilian3.firstElementChild.classList = "";
	civilian4.classList = "";
	civilian4.firstElementChild.classList = "";
	civilian5.classList = "";
	civilian5.firstElementChild.classList = "";

	//CULTIST EVENT LISTENERS
	cultist.removeEventListener("mousedown", clickCultist);
	cultist.removeEventListener("animationiteration", cultistResetMiss);
	cultist.removeEventListener("animationend", cultistReset);

	//HEART EVENT LISTENERS
	heart.removeEventListener("mousedown", clickHeart);
	heart.removeEventListener("animationiteration", heartReset);
	heart.removeEventListener("animationend", heartReset);

	//CRIMINAL EVENT LISTENERS
	criminal1.removeEventListener("mousedown", clickCriminal);
	criminal1.removeEventListener("animationiteration", criminalReset);
	criminal1.removeEventListener("animationend", criminalReset);
	criminal2.removeEventListener("mousedown", clickCriminal);
	criminal2.removeEventListener("animationiteration", criminalReset);
	criminal2.removeEventListener("animationend", criminalReset);
	criminal3.removeEventListener("mousedown", clickCriminal);
	criminal3.removeEventListener("animationiteration", criminalReset);
	criminal3.removeEventListener("animationend", criminalReset);

	//CIVILIAN EVENT LISTENERS
	civilian1.removeEventListener("mousedown", clickCivilian);
	civilian1.removeEventListener("animationiteration", civilianReset);
	civilian1.removeEventListener("animationend", civilianReset);
	civilian2.removeEventListener("mousedown", clickCivilian);
	civilian2.removeEventListener("animationiteration", civilianReset);
	civilian2.removeEventListener("animationend", civilianReset);
	civilian3.removeEventListener("mousedown", clickCivilian);
	civilian3.removeEventListener("animationiteration", civilianReset);
	civilian3.removeEventListener("animationend", civilianReset);
	civilian4.removeEventListener("mousedown", clickCivilian);
	civilian4.removeEventListener("animationiteration", civilianReset);
	civilian4.removeEventListener("animationend", civilianReset);
	civilian5.removeEventListener("mousedown", clickCivilian);
	civilian5.removeEventListener("animationiteration", civilianReset);
	civilian5.removeEventListener("animationend", civilianReset);

	// SCORE COUNT

	if (life > 3) {
		score = score + life;
		document.querySelector("#score").textContent = score;
	} else if (life < 3) {
		console.log(score - (6 - life));
		score = score - (6 - life);
		document.querySelector("#score").textContent = score;
	}

	if (score >= 20) {
		levelComplete();
	} else {
		gameOver();
	}
}

function levelComplete() {
	console.log("Congratulations, you won!");

	document.querySelector("#game").classList.add("hide");
	document.querySelector("#level_complete").classList.remove("hide");
	document.querySelector("#level_complete_points").textContent =
		score + " points";

	if (score >= 50) {
		//amazing
		console.log(score);
		document
			.querySelector("#level_complete")
			.classList.add("level_complete_amazing");
	} else if (score >= 35) {
		//great
		console.log(score);
		document
			.querySelector("#level_complete")
			.classList.add("level_complete_great");
	} else {
		//okay
		console.log(score);
		document
			.querySelector("#level_complete")
			.classList.add("level_complete_okay");
	}

	document.querySelector("#replay_button2").textContent = "Replay";
	document
		.querySelector("#replay_button2")
		.addEventListener("mousedown", startGame);
	document
		.querySelector("#back_button2")
		.addEventListener("mousedown", backStart);
}

function gameOver() {
	console.log("You lost! Try again next time.");
	document.querySelector("#game").classList.add("hide");
	document.querySelector("#game_over").classList.remove("hide");
	document.querySelector("#game_over_points").textContent = score + " points";
	document.querySelector("#replay_button1").textContent = "Replay";
	document
		.querySelector("#replay_button1")
		.addEventListener("mousedown", startGame);
	document
		.querySelector("#back_button1")
		.addEventListener("mousedown", backStart);
}
