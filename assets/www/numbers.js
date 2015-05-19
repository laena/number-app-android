var A_GOOD_SCORE 	= 15;
var A_DECENT_SCORE 	= 10;
var A_BAD_SCORE 	= 5;
var NUM_ANSWERS 	= 4;

var mode = "easy";
var givenNumbers = 4;

var correctIndex = 0;
var correctValue = 0;

var score = 0;

var questionTypes = ["fibonacci", "randomLinear", "randomStep", "randomQuadratic", "randomSequence"];

function initializeApp() {
	// TODO
}

function showInMode(questionMode) {
	mode = questionMode;
	generateQuestion();
}

function reset() {
	givenNumbers = 4;
	correctIndex = 0;
	correctValue = 0;
	score = 0;
}

function generateQuestion() {
	var randomIndex = randomRange(0, questionTypes.length);
	var question = new Question(questionTypes[randomIndex]);
	console.log(questionTypes[randomIndex]);
	if (mode == "kindergarten")
		givenNumbers = 7;

	var numbers = question.firstNumbers(givenNumbers + 1);
	var questionString = "";
	for (var i=0; i<givenNumbers; ++i)
		questionString = questionString + numbers[i] + ", ";
	questionString = questionString + "...?"

	correctIndex = randomRange(0, NUM_ANSWERS);
	correctValue = numbers[givenNumbers];

	if (mode == "easy" || mode == "kindergarten") {
		// In this mode, players get a choice of answers
		setElementText("questionTextLabel", questionString);
		for (var i=0; i<NUM_ANSWERS; ++i) {
			if (i == correctIndex)
				setElementText("answerButton"+i, correctValue);
			else {
				var randomResult = correctValue;
				while (randomResult == correctValue){
					if (correctValue < 0)
						randomResult = randomRange(5*correctValue, -correctValue);
					else
						randomResult = randomRange(-correctValue, 5*correctValue);
				}
				setElementText("answerButton"+i, randomResult);
			}
		}
	}
	else if (mode == "hard") {
		// In this mode, players need to enter their answer manually
		setElementText("questionTextLabel_hard", questionString);
		setElementText("numberInput", 0);
	} else {
		console.log("This should not happen");
	}
}

function submitAnswer() {
	submitAnswerByValue();
}

function submitAnswerByValue(value) {
	if (value == correctValue)
		generateQuestion();
	else 
		showResultScreen();
}

function submitAnswerByIndex(index) {
	if (index == correctIndex) {
		score = score + 1;
		generateQuestion();
	}
	else 
		showResultScreen();
}

function showResultScreen() {
	if (score > A_GOOD_SCORE)
		setElementText("congratsLabel", "4w350m3!!");
	else if (score > A_DECENT_SCORE)
		setElementText("congratsLabel", "Well done!");
	else if (score > A_BAD_SCORE)
		setElementText("congratsLabel", "Not bad!");
	else if (score > 0)
		setElementText("congratsLabel", "Go on training!");
	else
		setElementText("congratsLabel", "Learn some math, n00b!");

	setElementText("scoreLabel", "Score:   " + score);

	$.mobile.changePage("#resultPage");
	score = 0;
}

function Question(type) {
	this.a = randomRange(-10,10);
	this.b = randomRange(-10,10);
	this.c = randomRange(-10,10);

	this.d = randomRange(1,10);

    if (type == "randomLinear")
    	this.generate = function(n) { return (n*this.a + this.b); };
    else if (type == "randomQuadratic")
    	this.generate = function(n) { return (n*n*this.a + n*this.b + this.c); };
    else if (type == "randomStep")
    	this.generate = function(n) { 
    		if (n%2 == 0)
    			return (n + this.a);
    		else
    			return (n - this.a); 
    	};
    else if (type == "fibonacci")
    	this.generate = function(n) {
    		return fibonacci(n + this.d);
    	};
    else if (type == "randomSequence")
    	this.generate = function(n) {
    		return sequence(n, Math.floor(this.a/2), this.b);
    	}
}

Question.prototype.firstNumbers = function(n) {
	var result = new Array();
	for (var i=0; i<n; ++i)
		result[i] = this.generate(i);
	console.log(result);
	return result;
}

Question.prototype.numberAt = function(n) {
    return this.generate(n);
}

function fibonacci(n) {
	if (n == 0 || n == 1) return n;
    else return fibonacci(n-1) + fibonacci(n-2);
}

function sequence(n, a, b) {
	// a,b const
	if (n == 0 || n == 1) return n;
	else return sequence(n-1, a, b) * a + b;
}