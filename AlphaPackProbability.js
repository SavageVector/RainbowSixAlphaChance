var AlphapackWinChanceAddWin = .02;
var AlphapackWinChanceAddLoss = .015;
var GameTotalCount = 100;
var GameWinChance = 0.5;
var AlphapackWinChanceArray = [];
function CalculateAlphaProbability() {
  var GameAlphapackWinChanceSum;
  GetTextboxValues();
  AlphapackWinChanceArray[0] = AlphapackWinChanceAddWin;
  
  //Populate array with the average Alphapack chance at game "i"
  var i;
  for (i = 1; i < GameTotalCount; i++) {
    AlphapackWinChanceArray[i] = AlphapackWinChanceArray[i-1] + (GameWinChance * AlphapackWinChanceAddWin) + ((1 - GameWinChance) * AlphapackWinChanceAddLoss);
    if(AlphapackWinChanceArray[i] > 1) {
      AlphapackWinChanceArray[i] = 1;
    }
  }
  
  //Populate array with the average chance of winning Alphapack for game "i"
  for (i = 0; i < AlphapackWinChanceArray.length; i++) {
    AlphapackWinChanceArray[i] = AlphapackWinChanceArray[i] * GameWinChance;
  }
  
  //Populate array with the average chance of getting to game "i", and winnning
  GameAlphapackWinChanceSum = AlphapackWinChanceArray[0];
  for (i = 1; i < AlphapackWinChanceArray.length; i++) {
    AlphapackWinChanceArray[i] = AlphapackWinChanceArray[i] * (1 - GameAlphapackWinChanceSum);
    GameAlphapackWinChanceSum = GameAlphapackWinChanceSum + AlphapackWinChanceArray[i];
    if (GameAlphapackWinChanceSum > 1) {
      GameAlphapackWinChanceSum = 1;
    }
  }
  
  document.getElementById("TextChancePerRound").innerText = GameAlphapackWinChanceSum / 100;
  
  
  //SetTextboxValues();
  SetTable();
}

function GetTextboxValues() {
  GameWinChance = document.getElementById("TextWinrate").innerText;
}
function SetTextboxValues() {
  document.getElementById("TextChancePerRound").innerText;
  document.getElementById("TextAverageNumberOfGames").innerText;
}
function SetTable() {
  //WIP
}
