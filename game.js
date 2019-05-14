/* Name : Sandesh Bindukar
   UN ID: 18406550 */

var startButton; //declaring variable to get elements from start
var horses; //declaring variable to get the class of horse
var interval=0; //declaring variable for time interval
var lapCount = 1; //declaring variable for lap counter
var place = 1; //declaring variable for the horse's place
var betHorse; //declaring variable for betting borse
var totalAmount; //declaring variable for the total amount of money
var betAmount; //declaring variable for the bet amount of money
var selectLap; //declaring variable to select the numbers of lap
var randomTurn; //declaring variable to generate random number for the time interval
var randomNumber; //declaring variable to generate random number for the speed of horsess
var positionLeft; //declaring variable to get the horizontal position of the horses
var positionTop; //declaring variable to get the vertical position of the horses

//Function to move the horse at right direction
function moveHorseAtRight(){
	clearResults(); //calling clear results function
	horses = document.getElementsByClassName('horse');
	for (var i = 0; i < horses.length ; i++) {	
		positionLeft = horses[i].offsetLeft; //horizontal position of horse
		randomNumber = Math.ceil(Math.random()*8+2); //generating random number
		horses[i].className = 'horse runRight'; //sets horse class name to runRight
		horses[i].style.left = positionLeft + randomNumber + 'px'; //increments in the horizontal positon of horses like moving towards right
		//checks the position of horses to turn for next direction
		if(positionLeft >=(window.innerWidth*0.79) && positionLeft <=(window.innerWidth*0.89)){
			clearInterval(interval); //clears the interval period
			randomTurn = Math.ceil(Math.random()*5+35); //generating random number
			interval = setInterval(moveHorseAtTop,randomTurn); //call moveHorseAtTop function
		}
	}
}
//Function to move the horse upwards
function moveHorseAtTop(){
	horses = document.getElementsByClassName('horse');
	for (var i = 0; i<horses.length; i++) {
		positionTop = horses[i].offsetTop; //vertical position of horse
		randomNumber = Math.ceil(Math.random()*8+2); //generating random number
		horses[i].className = 'horse runUp'; //sets horse class name to runUp
		horses[i].style.top = positionTop - randomNumber + 'px'; //decrements in the vertical positon of horses like moving upwards
		//checks the position of horses to turn for next direction
		if(positionTop >=(window.innerHeight*0.01) && positionTop <=(window.innerHeight*0.04)){
			clearInterval(interval); //clears the interval period
			randomTurn = Math.ceil(Math.random()*5+35); //generating random number
			interval = setInterval(moveHorseAtLeft,randomTurn); //call moveHorseAtLeft function
		}
	}
}
//Function to move the horse at left direction
function moveHorseAtLeft(){
		horses = document.getElementsByClassName('horse');
		for (var i = 0; i < horses.length ; i++) {	
			positionLeft = horses[i].offsetLeft; //horizontal position of horse
			randomNumber = Math.ceil(Math.random()*8+2); //generating random number
			horses[i].className = 'horse runLeft'; //sets horse class name to runLeft
			horses[i].style.left = positionLeft - randomNumber + 'px'; //decrements in the horizontal positon of horses like moving towards left
			//checks the position of horses to turn for next direction
			if(positionLeft>=(window.innerWidth*0.06) && positionLeft<=(window.innerWidth*0.09)){
				clearInterval(interval); //clears the interval period
				randomTurn = Math.ceil(Math.random()*5+35); //generating random number
				interval = setInterval(moveHorseAtDown, randomTurn) //call moveHorseAtDown function
			}
		}
}
//Function to move the horse downwards
function moveHorseAtDown(){
	horses = document.getElementsByClassName('horse');
	for (var i = 0; i<horses.length; i++) {
		positionTop = horses[i].offsetTop; //vertical position of horse
		randomNumber = Math.ceil(Math.random()*8+2); //generating random number
		horses[i].className = 'horse runDown'; //sets horse class name to runDown
		horses[i].style.top = positionTop + randomNumber + 'px'; //increments in the vertical positon of horses like moving downwards
		//checks the position of horses to turn for next direction
		if(positionTop >=(window.innerHeight*0.80) && positionTop <=(window.innerHeight*0.83)){
			if(parseInt(noOfLaps.value)==lapCount){ //checks the number of laps is equals to the laps provided
				clearInterval(interval); //clears the interval period
				randomTurn = Math.ceil(Math.random()*5+35); //generating random number
				interval = setInterval(finishLap,randomTurn); //call finishLap function
			}
			else{
				lapCount++; //increments the number of laps
				clearInterval(interval); //clears the interval period
				randomTurn = Math.ceil(Math.random()*5+35); //generating random number
				interval = setInterval(moveHorseAtRight,randomTurn); //call moveHorseAtRight function
			}	
		}
	}
}

//var id = document.getElementById('horse');
//Function to move the horse to the start/stop line and stop the horses
function finishLap() {
	horses = document.getElementsByClassName('horse');
	for (var i = 0; i < horses.length ; i++) {	
		positionLeft = horses[i].offsetLeft; //horizontal position of horse
		randomNumber = Math.ceil(Math.random()*8+2); //generating random number
		//checks the position of horses to turn for next direction
		if(positionLeft >=(window.innerWidth*0.05) && positionLeft <=(window.innerWidth*0.28)){
			horses[i].className = 'horse runRight'; //sets horse class name to runRight
			horses[i].style.left = positionLeft + randomNumber + 'px'; //increments in the horizontal positon of horses like moving towards right
		}
		//checks the position to stop the horse
		if(positionLeft >=(window.innerWidth*0.28)){	
			for (var i = 0; i < horses.length; i++) {
				results(horses[i].id);
				horses[i].className = 'horse standRight'; //sets horse class name to standRight 
			}
			
			startButton.addEventListener('click',raceStart);
		}

	}
}

//Function to display results table
function results(id)
{ 
  var tr = document.getElementsByTagName('tr'); //get elements from the reesults table
  var horsePlace = document.createElement('td'); //create td elememts in the results table
  horsePlace.className = id; 
  tr[place].appendChild(horsePlace); //append child in the results place
  if (place == 4)
  {
    clearInterval(interval); //clears the interval period
    checkWinner(tr); //calls checkWinner function
  }
  else
  {
    place++; //increment
  }
}

//Function to check the winner of the race
function checkWinner(tr)
{
  var winner = tr[1].childNodes[3].className;
  if (winner == betHorse)
  {
  	alert("You win"); //alerts message 
    totalAmount += betAmount.value; //adding the bet amount with total amount
    document.getElementById('funds').innerHTML = totalAmount; //setting new amount
  }
  else
  {
    alert("You lose."); //alerts message 
  }
  betAmount.disabled = false; 
  selectLap.disabled = false;
  betHorse.disabled = false;

}

//Function to clear the results
function clearResults(){
  place = 1;
  for (var i = 0; i < 4; i++)	
  {
    var results = document.getElementsByClassName('horse' + (i + 1));
    if (results.length > 0)
    {
      results[0].parentNode.removeChild(results[0]); //removes from the results table
    }
  }
}

//Function to start the race
function raceStart(){
	 totalAmount = document.getElementById('funds').innerHTML;
	 betHorse = document.getElementById('bethorse');
	 betAmount = document.getElementById('amount');
	 selectLap = document.getElementById('noOfLaps');
	  if(selectLap.value != "" && betAmount.value != "" && (betAmount.value <=parseInt(totalAmount)) )
	   {
	 	betAmount.disabled = true;
	 	betHorse.disabled = true;
	 	selectLap.disabled =true;
	 	randomTurn = Math.ceil(Math.random()*5+35); //generating random number
		interval = setInterval(moveHorseAtRight,randomTurn);
		startButton.removeEventListener('click', raceStart); //disable the start button
		totalAmount = totalAmount - betAmount.value;
		document.getElementById('funds').innerHTML = totalAmount;
	   }
	   else{
		if (betAmount.value == "") {
			alert("Enter your bet amount.");
		}
		else if(betAmount.value > parseInt(totalAmount)){
			alert("You don't have that much funds. Your maximum amount: £" + totalAmount + ".");
		}
		else if (betAmount.value <=0) {
			alert("You don't have enough balance to continue this game. Your fund is below 0. Please reload the game.")
		}
		else if(selectLap.value == ""){
			alert("Enter number of laps.");
		}
	}
}

function myLoadEvent(){
    startButton = document.getElementById('start'); //get elements from start
	startButton.addEventListener('click', raceStart); //adding action listener to start while clicking the button
}
//adding action listener to the myLoad event
document.addEventListener('DOMContentLoaded', myLoadEvent);