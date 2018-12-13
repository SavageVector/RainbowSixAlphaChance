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
  for (Count = 1; Count < AlphapackWinChanceArray.length; Count++) {
    AlphapackAverageGames += (AlphapackWinChanceArray[Count] * (Count + 1));
  }
  //Update page
  SetTextboxValues(1 / AlphapackAverageGames, AlphapackAverageGames);
  //WIP
  DrawChart(document.getElementById("ChartPrint"), AlphapackWonChanceArray, AlphapackWinChanceArray);
  //DrawTable(document.getElementById("TablePrint"),AlphapackWinChanceArray);
  
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

