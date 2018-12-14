function GetTextboxValues() {
	GameWinChance = parseFloat(document.getElementById("TextWinrate").value) / (parseFloat(document.getElementById("TextWinrate").value) + 1);
}
function SetTextboxValues(ChancePerRound, AverageNumberOfGames) {
	document.getElementById("TextChancePerRound").innerText = ChancePerRound;
	document.getElementById("TextAverageNumberOfGames").innerText = AverageNumberOfGames;
}
function GetArrayMaxValue(DataArray) {
  var Max = 0;
  for(var i = 0; i < DataArray.length; i ++) {
      if(DataArray[i] > Max) {
        Max = DataArray[i];
      }
  }
  return Max;
}

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
function RoundDigits(RoundNum, NumDigits) {
  return (Math.round(RoundNum * Math.pow(10, NumDigits)) / Math.pow(10, NumDigits))
}