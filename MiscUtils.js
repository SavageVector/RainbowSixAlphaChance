//Gets user input
function GetTextboxValues() {
	GameWinChance = parseFloat(document.getElementById("TextWinrate").value) / (parseFloat(document.getElementById("TextWinrate").value) + 1);
}
//Outputs two values
function SetTextboxValues(ChancePerRound, AverageNumberOfGames) {
	document.getElementById("TextChancePerRound").innerText = ChancePerRound;
	document.getElementById("TextAverageNumberOfGames").innerText = AverageNumberOfGames;
}
//Gets largest value in an array
function GetArrayMaxValue(DataArray) {
	var Max = 0;
	for(var i = 0; i < DataArray.length; i ++) {
		if(DataArray[i] > Max) {
			Max = DataArray[i];
		}
	}
	return Max;
}
//Gets position of largest value in an array
function GetArrayMaxPosition(Array) {
	var Max = 0;
	var MaxPos = 0;
	for(var i = 0; i < Array.length; i ++) {
		if(Array[i] > Max) {
			Max = Array[i];
			MaxPos = i;
		}
	}
	return MaxPos;
}
