var AlphapackWinChanceAddWin = .02;
var AlphapackWinChanceAddLoss = .015;
var GameCountMax = 10000;
var GameWinChance = 0.5;
function CalculateAlphaProbability() {
  var AlphapackWinChanceArray = [];
  var AlphapackWinChanceAverage;
  var GameAlphapackWinChanceSum;
  var AlphapackAverageGames = 0;
  var Count;
  GetTextboxValues();
  GameAlphapackWinChanceSum = 0;
  AlphapackWinChanceAverage = AlphapackWinChanceAddWin;
  Count = 0;
  while ((GameAlphapackWinChanceSum < 0.9999) && (Count < GameCountMax)) {
    AlphapackWinChanceArray[Count] = (AlphapackWinChanceAverage * GameWinChance) * (1 - GameAlphapackWinChanceSum);
    GameAlphapackWinChanceSum = GameAlphapackWinChanceSum + AlphapackWinChanceArray[Count];
    AlphapackWinChanceAverage += (GameWinChance * AlphapackWinChanceAddWin) + ((1 - GameWinChance) * AlphapackWinChanceAddLoss);
    if (AlphapackWinChanceAverage > 1) {
      AlphapackWinChanceAverage = 1;
    }
    Count++;
  }
  //Calculate average games before Alphapack win
  for (Count = 0; Count < AlphapackWinChanceArray.length; Count++) {
    AlphapackAverageGames += (AlphapackWinChanceArray[Count] * (Count + 1));
  }
  //Update page
  SetTextboxValues(1 / AlphapackAverageGames, AlphapackAverageGames);
  //WIP
  DrawChart(document.getElementById("ChartPrint"),AlphapackWinChanceArray);
  DrawTable(document.getElementById("TablePrint"),AlphapackWinChanceArray);
  
  //document.getElementById("TempOutput").innerText = AlphapackWinChanceArray.length;
}

function GetTextboxValues() {
  GameWinChance = parseFloat(document.getElementById("TextWinrate").value) / (parseFloat(document.getElementById("TextWinrate").value) + 1);
}
function SetTextboxValues(ChancePerRound, AverageNumberOfGames) {
  document.getElementById("TextChancePerRound").innerText = ChancePerRound;
  document.getElementById("TextAverageNumberOfGames").innerText = AverageNumberOfGames;
}









function DrawTable(TableDiv, Array) {
  TableDiv.removeChild();
  tbl  = document.createElement('table');
  tbl.id = "Table";
  tbl.style.width  = '100px';
  tbl.style.border = '1px solid black';
  for(var Row = 0; Row < Array.length; Row++) {
      var tr = tbl.insertRow();
      for(var Column = 0; Column < 2; Column++){
        var td = tr.insertCell();
        td.appendChild(document.createTextNode('Cell'));
        td.style.border = '1px solid black';
        if (Column == 0) {
          td.innerText = Row;
        }
        else {
          td.innerText = Array[Row];
        }
      }
  }
  TableDiv.appendChild(tbl);
}










function DrawChart(Canvas, DataArray) {
  var xPadding = 30;
  var yPadding = 30;
  var Chart = Canvas.getContext('2d');
  Chart.clearRect(0, 0, Canvas.width, Canvas.height);
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
  //Label Y axis
  for(var i = 0; i < GetArrayMaxValue(DataArray); i += 0.01) {
    Chart.fillText(Math.round(i / 0.01) * 0.01, xPadding - 15, (Canvas.height - (((Canvas.height - yPadding) / (GetArrayMaxValue(DataArray) + 0.01)) * i)) - yPadding);
  }
  //Label X axis
  for(var i = 0; i < DataArray.length; i += DataArray.length/10) {
    //( * i) + (xPadding * 1.5)
    Chart.fillText(Math.round(i), ((Canvas.width - xPadding) / DataArray.length) * i + xPadding, Canvas.height - yPadding + 20);
  }
  //Draw Line
  Chart.strokeStyle = '#f00';
  Chart.beginPath();
  Chart.moveTo((xPadding), Canvas.height - (((Canvas.height - yPadding) / (GetArrayMaxValue(DataArray) + 0.01)) * DataArray[0]) - yPadding);
  
  for(var i = 0; i < DataArray.length; i ++) {
    //( * i) + (xPadding * 1.5)
      Chart.lineTo(((Canvas.width - xPadding) / DataArray.length) * i + xPadding, (Canvas.height - (((Canvas.height - yPadding) / (GetArrayMaxValue(DataArray) + 0.01)) * DataArray[i])) - yPadding);
  }
  Chart.stroke();
  //Max value line
  Chart.strokeStyle = '#333';
  Chart.lineWidth = 1;
  Chart.beginPath();
  Chart.moveTo(xPadding, (Canvas.height - (((Canvas.height - yPadding) / (GetArrayMaxValue(DataArray) + 0.01)) * GetArrayMaxValue(DataArray))) - yPadding);
  Chart.lineTo(((Canvas.width - xPadding) / DataArray.length) * GetArrayMaxPosition(DataArray) + (xPadding * 1.5), (Canvas.height - (((Canvas.height - yPadding) / (GetArrayMaxValue(DataArray) + 0.01)) * GetArrayMaxValue(DataArray))) - yPadding);
  Chart.stroke();
  
  
  
  Chart.fillText(Math.round(1000 * GetArrayMaxValue(DataArray)) / 1000, xPadding + 15, ((Canvas.height - (((Canvas.height - yPadding) / (GetArrayMaxValue(DataArray) + 0.01)) * GetArrayMaxValue(DataArray))) - yPadding) + 15);
  Chart.stroke();
  
  
  
  
  
  
  
  
  
  
  
  document.getElementById("TempOutput").innerText = DataArray[10];
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

