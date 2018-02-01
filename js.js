// Butrtons Controller
const DataCtrl = (function() {
	// Button contructor
	const Button = function(id, sound, lightColor, darkColor) {
		this.id = id;
		this.sound = sound;
		this.lightColor = lightColor;
		this.darkColor = darkColor;
	};

	// All of the data
	var gameData = {
		gameCount: 0, // The game count
		simonsButtonClicks: [], // Keeps track of simons button clicks
		playersButtonClicks: [], // Keeps trach of players button clicks
		checkIfPowerIsOn: false, // check to see if powers on
		checkIfStartIsOn: false, // checks to see if game started
		checkIfStrictModeIsOn: false, // check if strict mode is on,
		computersTurn: true, // computers turn
		playersTurn: false // players turn
	};

	button1 = new Button(1, 'https://s3.amazonaws.com/freecodecamp/simonSound1.mp3', 'lightgreen', 'darkgreen');
	button2 = new Button(2, 'https://s3.amazonaws.com/freecodecamp/simonSound2.mp3', 'red', 'darkred');
	button3 = new Button(4, 'https://s3.amazonaws.com/freecodecamp/simonSound4.mp3', 'lightblue', 'darkblue');
	button4 = new Button(3, 'https://s3.amazonaws.com/freecodecamp/simonSound3.mp3', 'gold', 'goldenrod');
	gameData.simonsButtonClicks.push(button1);
	gameData.simonsButtonClicks.push(button2);
	gameData.simonsButtonClicks.push(button3);
	gameData.simonsButtonClicks.push(button4);

	return {
		changeTurns: function() {
			if (gameData.computersTurn) {
				gameData.computersTurn = false;
			} else {
				gameData.playersTurn = true;
			}
		},
		checkWhosTurn: function() { // returns true or false if its computers turn
			if (gameData.computersTurn) {
				return true;
			} else {
				return false;
			}
		},
		checkIfPowerIsOn: function() { // returns true or false if power is on
			return gameData.checkIfPowerIsOn;
		},
		checkIfStartIsOn: function() { // returns true or false based on games state
			return gameData.checkIfStartIsOn;
		},
		turnStartOffOrOn: function() { // toggles between turning start button off and on
			if (!gameData.checkIfStartIsOn) {
				gameData.checkIfStartIsOn= true;
			} else {
				gameData.checkIfStartIsOn = false;
			}
		},
		turnPowerOffOrOn: function() { // changes power to true or false
			if (!gameData.checkIfPowerIsOn) {
				gameData.checkIfPowerIsOn = true;
			} else {
				gameData.checkIfPowerIsOn = false;
			}
		},
		incrementGameCount: function() { // increment the game count by 1
			gameData.gameCount = gameData.gameCount + 1;
		},
		gameCount: function() { // returns the game count
			return gameData.gameCount;
		},
		setCountBackToOne: function() { // Sets game count back to one
			gameData.gameCount = 0;
		},
		randomButtonGenerator: function() { // generate random number between 1-4
			return Math.floor(Math.random() * 4) + 1;
		},
		createMove: function(id) { // this creates moves by making a instance of a button
			var button;									 // the move is based off what the id is
														 // the last if statment checks to see if shouldbe pushed into
			if (id === 1) {								 // computers array or players array
				button = new Button(id, 'https://s3.amazonaws.com/freecodecamp/simonSound1.mp3', 'lightgreen', 'darkgreen');
			} else if (id === 2) {
				button = new Button(id, 'https://s3.amazonaws.com/freecodecamp/simonSound2.mp3', 'red', 'darkred');
			} else if (id === 3) {
				button = new Button(id, 'https://s3.amazonaws.com/freecodecamp/simonSound3.mp3', 'gold', 'goldenrod');
			} else {
				button = new Button(id, 'https://s3.amazonaws.com/freecodecamp/simonSound4.mp3', 'lightblue', 'darkblue');
			}
			
			if (gameData.computersTurn) { // now push new instance of button into an array
				gameData.simonsButtonClicks.push(button);
			} else {
				gameData.playersButtonClicks.push(button);
			}
		},
		eraseAllButtonClicks: function() { // erase Simons
			gameData.simonsButtonClicks = [];
			gameData.playersButtonClicks = [];
		},
		getComputersMoves: function() {
			return gameData.simonsButtonClicks;
		},
		getPlayersMoves: function() {
			return gameData.playersButtonClicks;
		}
	};
})();



// UI Controller 
const UICtrl = (function() {
	var UISelectors = { // All the selectors
		coloredButtons: '#colored-buttons',
		countButton: '#count',
		startButton: '#start',
		strictButton: '#strict',
		onOffButton: '#on-off-button',
		s: '#s'
	};

	return {
		turnOnOffGame: function(pixels) { // margin left 21px(ON) or margin left 0px;(OFF)
			document.querySelector(UISelectors.onOffButton).style.marginLeft = pixels;
		},
		countWindow: function(displayCountNumber) { // this inits the count window with empty string or dash
			document.querySelector(UISelectors.countButton).textContent = displayCountNumber;
		},
		changeButtonColor: function(id, color) { // this changes the color of buttons from light to dark
			document.querySelector(UISelectors.s + id).style.backgroundColor = color;
		},
		getSelectors: function() { // returns all selectors
			return UISelectors;
		}
	};
})();



// App Controller
const App = (function(DataCtrl, UICtrl) {
	var loadEventListeners = function() {
		var UISelectors = UICtrl.getSelectors(); // This grabs all selectors from UI
		// all possible click events below
		document.querySelector(UISelectors.coloredButtons).addEventListener('click', coloredButtons);  
		document.querySelector(UISelectors.startButton).addEventListener('click', startButton); 
		document.querySelector(UISelectors.strictButton).addEventListener('click', strictButton);
		document.querySelector(UISelectors.onOffButton).addEventListener('click', onOffButton);
	};
	// colorredButtons, stateButton, strictButton, and onOffButton are called based off click events
	var coloredButtons = function() {

	};

	var startButton = function() {
		var isPowerOnOrOff = DataCtrl.checkIfPowerIsOn(); // return false(OFF) or true(ON)if power is on/off
		var gameCount = DataCtrl.gameCount(); // Get game count
		var checkIfStartIsOn = DataCtrl.checkIfStartIsOn();
		
		if (isPowerOnOrOff && !checkIfStartIsOn) { // allow the user to start game is power is on, if not nothhing will happen
			UICtrl.countWindow(gameCount);
			DataCtrl.turnStartOffOrOn();
			createMoves(); // this starts the first move of computers turn
		} 
	};

	var strictButton = function() {

	};

	var onOffButton = function() {
		var isPowerOnOrOff = DataCtrl.checkIfPowerIsOn(); // return false(OFF) or true(ON)if power is on/off

		DataCtrl.turnPowerOffOrOn(); // changes power to off or on

		if (!isPowerOnOrOff) { // if false move UI button over to on, if true move UI button over to off
			UICtrl.turnOnOffGame('21px'); // and count window will get dashes or empty string
			UICtrl.countWindow('- -');
		} else {
			UICtrl.turnOnOffGame('0px');
			UICtrl.countWindow('');
			DataCtrl.turnStartOffOrOn() // changes start of off or on
			DataCtrl.setCountBackToOne() // set game count back to one
			DataCtrl.eraseAllButtonClicks() // erase the array of data from Simons button clicks and players
		}
	};

	function createMoves() { // creates move/buttons for computer or user
		var arrayOfMoves; // init moves variable
		var randomNum = DataCtrl.randomButtonGenerator(); // gets random number from 1-4
		var checkIfComputersTurn = DataCtrl.checkWhosTurn();

		DataCtrl.createMove(randomNum); // Creates move for computer or user
		
		if (checkIfComputersTurn) { // if its the computers turn return computers moves or false return players moves
			var arrayOfMoves = DataCtrl.getComputersMoves();
			setColorTimer(arrayOfMoves);
		} else {
			console.log('fuck');
			var arrayOfMoves = DataCtrl.getPlayersMoves();
		}
	}

	function setColorTimer(arrayOfMoves) {
		var count1 = 0;
		var count2 = 0;

		var timeOut1 = (function foo() {
			var id = arrayOfMoves[count1].id.toString();
			var lightcolor = arrayOfMoves[count1].lightColor;
			var darkColor = arrayOfMoves[count2].darkColor;

    		UICtrl.changeButtonColor(id, lightcolor);
    		count1++;
			
			var timeOut2 = setTimeout(function() {
				UICtrl.changeButtonColor(id, darkColor);
				count2++;
	
					if (count2 === arrayOfMoves.length) {
						DataCtrl.changeTurns();
						clearTimeout(timeOut1);
						clearTimeout(timeOut2);
					}
			}, 500);

			if (count1 === arrayOfMoves.length) {
				clearTimeout(timeOut1);
			} else {
				setTimeout(foo, 1000);
			}

			incrementGameCountAndDisplay(); // Update game count and display the new value in UI

		})();
	};

	function incrementGameCountAndDisplay() { // updates game count by one and then returns the game
		DataCtrl.incrementGameCount();        // to be displayed on the UI
		var gameCount = DataCtrl.gameCount();
		UICtrl.countWindow(gameCount);
	}

	return {
		init: function() {
			console.log('Start Game!');
			loadEventListeners();
		},
	};
})(DataCtrl, UICtrl);



// Init App
App.init();





