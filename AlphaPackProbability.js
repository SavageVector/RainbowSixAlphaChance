var AlphapackWinChanceAddWin = .02;
var AlphapackWinChanceAddLoss = .015;
var GameCountMax = 10000;
var GameWinChance = 0.5;
function CalculateAlphaProbability() {
  var AlphapackWinChanceArray = [];
  var AlphapackWonChanceArray = [];
  var AlphapackWinChanceAverage;
  var AlphapackAverageGames = 0;
  var Count;
  GetTextboxValues();
  AlphapackWinChanceAverage = AlphapackWinChanceAddWin;
  AlphapackWinChanceArray[0] = 0;
  AlphapackWonChanceArray[0] = 0; //AlphapackWinChanceAddWin * GameWinChance;
  Count = 0;
  while ((AlphapackWonChanceArray[Count] < 0.9999) && (Count <= GameCountMax)) {
    Count++;
    AlphapackWinChanceArray[Count] = (AlphapackWinChanceAverage * GameWinChance) * (1 - AlphapackWonChanceArray[Count - 1]);
    AlphapackWonChanceArray[Count] = AlphapackWonChanceArray[Count - 1] + AlphapackWinChanceArray[Count];
    AlphapackWinChanceAverage += (GameWinChance * AlphapackWinChanceAddWin) + ((1 - GameWinChance) * AlphapackWinChanceAddLoss);
    if (AlphapackWinChanceAverage > 1) {
      AlphapackWinChanceAverage = 1;
    }
  }
  //Calculate average games before Alphapack win
  for (Count = 0; Count < AlphapackWinChanceArray.length; Count++) {
    AlphapackAverageGames += (AlphapackWinChanceArray[Count] * Count);
  }
  //Update page
  SetTextboxValues(1 / AlphapackAverageGames, AlphapackAverageGames);
  //WIP
  DrawChart(document.getElementById("ChartPrint"), AlphapackWonChanceArray, AlphapackWinChanceArray);
  DrawTable(document.getElementById("TablePrint"), AlphapackWinChanceArray, AlphapackWonChanceArray);
  
  //document.getElementById("TempOutput").innerText = AlphapackWinChanceArray.length;
}

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
