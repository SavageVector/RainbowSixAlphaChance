var AlphapackWinChanceAddWin = .02;
var AlphapackWinChanceAddLoss = .015;
var GameTotalCount = 100;
var GameWinChance = 0.5;
function CalculateAlphaProbability() {
  var AlphapackWinChanceArray = [];
  var GameAlphapackWinChanceSum;
  var AlphapackAverageGames = 0;
  var i;
  GetTextboxValues();
  AlphapackWinChanceArray[0] = AlphapackWinChanceAddWin;
  //Populate array with the average Alphapack chance at game "i"
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
  //Calculate average games before Alphapack win
  for (i = 0; i < AlphapackWinChanceArray.length; i++) {
    AlphapackAverageGames = AlphapackAverageGames + (AlphapackWinChanceArray[i] * (i + 1));
  }
  //Update page
  SetTextboxValues(1 / AlphapackAverageGames, AlphapackAverageGames);
  //WIP
  DrawChart(document.getElementById("ChartPrint"),AlphapackWinChanceArray);
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
function DrawChart(Canvas, DataArray) {
  var xPadding = 30;
  var yPadding = 30;
  var Chart = Canvas.getContext('2d');
  //Set chart styling
  Chart.lineWidth = 2;
  Chart.strokeStyle = '#333';
  Chart.font = 'italic 8pt sans-serif';
  Chart.textAlign = "center";
  //Draw axes
  Chart.beginPath();
  Chart.moveTo(xPadding, yPadding);
  Chart.lineTo(xPadding, Canvas.height - yPadding);
  Chart.lineTo(Canvas.width, Canvas.height - yPadding);
  Chart.stroke();
  
  //Draw Line
  Chart.strokeStyle = '#f00';
  Chart.beginPath();
  Chart.moveTo((xPadding * 1.5), Canvas.height - (((Canvas.height - yPadding) / getMaxY(DataArray)) * DataArray[0]) - yPadding);

  for(var i = 1; i < DataArray.length; i ++) {
      Chart.lineTo(((Canvas.width - xPadding) / DataArray.length) * i + (xPadding * 1.5), (Canvas.height - (((Canvas.height - yPadding) / getMaxY(DataArray)) * DataArray[i])) - yPadding);
  }
  Chart.stroke();
  
  
  
  
  
  
  document.getElementById("TempOutput").innerText = Canvas.height;
}



function getMaxY(DataArray) {
  var max = 0;
  for(var i = 0; i < DataArray.length; i ++) {
      if(DataArray[i] > max) {
          max = DataArray[i];
      }
  }

  //max += 10 - max % 10;
  return max;
}


function getXPixel(val) {
    return ((graph.width() - xPadding) / data.values.length) * val + (xPadding * 1.5);
}

function getYPixel(val) {
    return graph.height() - (((graph.height() - yPadding) / getMaxY()) * val) - yPadding;
}
