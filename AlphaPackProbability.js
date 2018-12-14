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
	//Get user input
	GetTextboxValues();
	AlphapackWinChanceAverage = AlphapackWinChanceAddWin;
	AlphapackWinChanceArray[0] = 0;
	AlphapackWonChanceArray[0] = 0;
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
	//Output average chance per game, and average number of games
	SetTextboxValues(1 / AlphapackAverageGames, AlphapackAverageGames);
	//Output line graph and table
	DrawChart(document.getElementById("ChartPrint"), AlphapackWonChanceArray, AlphapackWinChanceArray);
	DrawTable(document.getElementById("TablePrint"), AlphapackWinChanceArray, AlphapackWonChanceArray);
}
