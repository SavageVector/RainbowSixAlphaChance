var GameWinChance;
var AlphapackWinChance;
function CalculateAlphaProbability() {
  GetTextboxValues();
  
  
  
  
  SetTextboxValues();
}

function GetTextboxValues() {
  
}
function SetTextboxValues() {
  
}



















Sub Roll()
    Dim Chance As Double
    Dim Count As Long
    Dim RoundCount As Long
    Chance = 0.02
    Count = 0
    RoundCount = 0
    While Count < 1000000
        Count = Count + 1
        RoundCount = RoundCount + 1
        If Rnd > 0.5 Then
            If Rnd < Chance Then
                Chance = 0.02
                SheetFrequency.Cells(RoundCount, 1) = SheetFrequency.Cells(RoundCount, 1) + 1
                SheetMain.Cells(2, 1) = SheetMain.Cells(2, 1) + 1
                RoundCount = 0
            Else
                Chance = Chance + 0.02
            End If
        Else
            Chance = Chance + 0.015
        End If
        SheetMain.Cells(2, 2) = SheetMain.Cells(2, 2) + 1
    Wend
End Sub
