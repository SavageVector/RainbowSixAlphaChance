var AlphapackWinChanceAddWin = .02;
var AlphapackWinChanceAddLoss = .015;
var GameTotalCount = 100;
var GameWinChance = 0.5;
function CalculateAlphaProbability() {
  var AlphapackWinChanceArray = [];
  var GameAlphapackWinChanceSum;
  var AlphapackAverageGames = 0;
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
  
  //AlphapackWinChanceArray.length
  
  for (i = 0; i < AlphapackWinChanceArray.length; i++) {
    AlphapackAverageGames = AlphapackAverageGames + (AlphapackWinChanceArray[i] * (i + 1));
  }
  
  
  //document.getElementById("TextChancePerRound").innerText = AlphapackAverageGames;
  
  
  SetTextboxValues(1 / AlphapackAverageGames, AlphapackAverageGames);
  
  SetTable();
}

function GetTextboxValues() {
  GameWinChance = document.getElementById("TextWinrate").value;
}
function SetTextboxValues(ChancePerRound, AverageNumberOfGames) {
  document.getElementById("TextChancePerRound").innerText = ChancePerRound;
  document.getElementById("TextAverageNumberOfGames").innerText = AverageNumberOfGames;
}
function SetTable() {
  //WIP
}
function DrawChart() {
  var chart = new CanvasJS.Chart("chartContainer", {
	animationEnabled: true,
	theme: "light2",
	title:{
		text: "Simple Line Chart"
	},
	axisY:{
		includeZero: false
	},
	data: [{
		type: "line",
      dataPoints: [
        { y: 450 },
        { y: 414 },
        { y: 520 },
        { y: 460 },
        { y: 450 },
        { y: 500 },
        { y: 480 },
        { y: 480 },
        { y: 410 },
        { y: 500 },
        { y: 480 },
        { y: 510 }
      ]
    }]
  });
  chart.render();
  }
}
