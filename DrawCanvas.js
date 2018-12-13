function DrawChart(Canvas, DataArray1, DataArray2) {
  var xPadding = 30;
  var yPadding = 30;
  var Chart = Canvas.getContext('2d');
  Chart.clearRect(0, 0, Canvas.width, Canvas.height);
  
  //Draw axes
  Chart.lineWidth = 2;
  Chart.strokeStyle = "black";
  Chart.globalAlpha = 1;
  Chart.beginPath();
  Chart.moveTo(xPadding, yPadding);
  Chart.lineTo(xPadding, Canvas.height - yPadding);
  Chart.lineTo(Canvas.width - xPadding, Canvas.height - yPadding);
  Chart.stroke();
  
  //Label Y axis
  Chart.font = 'italic 8pt sans-serif';
  Chart.textAlign = "center";
  for(var i = 0; i < GetArrayMaxValue(DataArray1) + 0.1; i += 0.1) {
    Chart.fillText(Math.round(i * 10) / 10, xPadding - 15, (Canvas.height - (((Canvas.height - yPadding) / (GetArrayMaxValue(DataArray1) + 0.2)) * i)) - yPadding);
  }
  
  //Label X axis
  Chart.font = 'italic 8pt sans-serif';
  Chart.textAlign = "center";
  for(var i = 0; i < DataArray1.length ; i ++) {
    if(0 == i % Math.round(DataArray1.length / 10)) {
      Chart.fillText(i, ((Canvas.width - (xPadding * 2)) / DataArray1.length) * i + xPadding, Canvas.height - yPadding + 20);
    }
  }
  
  //Draw Line 1
  Chart.lineWidth = 1;
  Chart.strokeStyle = "blue";
  Chart.globalAlpha = 1;
  Chart.beginPath();
  Chart.moveTo(xPadding, Canvas.height - (((Canvas.height - yPadding) / (GetArrayMaxValue(DataArray1) + 0.2)) * DataArray1[0]) - yPadding);
  
  for(var i = 0; i < DataArray1.length; i ++) {
    //( * i) + (xPadding * 1.5)
      Chart.lineTo(((Canvas.width - (xPadding * 2)) / DataArray1.length) * i + xPadding, (Canvas.height - (((Canvas.height - yPadding) / (GetArrayMaxValue(DataArray1) + 0.2)) * DataArray1[i])) - yPadding);
  }
  Chart.stroke();
  
  //Percentiles Line 1
  Chart.lineWidth = 1;
  Chart.strokeStyle = "black";
  Chart.globalAlpha = 0.7;
  Chart.beginPath();
  for(var i = 1; i < DataArray1.length; i++) {
    if(DataArray1[i] > 0.25 && DataArray1[i-1] < 0.25) {
      //Chart.moveTo(xPadding, Canvas.height - (((Canvas.height - yPadding) / (GetArrayMaxValue(DataArray1) + 0.2)) * 0.25) - yPadding);
      Chart.moveTo(((Canvas.width - (xPadding * 2)) / DataArray1.length) * ((0.25 - DataArray1[i-1]) / (DataArray1[i] - DataArray1[i-1]) + (i - 1)) + xPadding, Canvas.height - (((Canvas.height - yPadding) / (GetArrayMaxValue(DataArray1) + 0.2)) * 0.25) - yPadding);
      Chart.lineTo(((Canvas.width - (xPadding * 2)) / DataArray1.length) * ((0.25 - DataArray1[i-1]) / (DataArray1[i] - DataArray1[i-1]) + (i - 1)) + xPadding, Canvas.height - yPadding);
    }
    if(DataArray1[i] > 0.5 && DataArray1[i-1] < 0.5) {
      //Chart.moveTo(xPadding, Canvas.height - (((Canvas.height - yPadding) / (GetArrayMaxValue(DataArray1) + 0.2)) * 0.5) - yPadding);
      Chart.moveTo(((Canvas.width - (xPadding * 2)) / DataArray1.length) * ((0.5 - DataArray1[i-1]) / (DataArray1[i] - DataArray1[i-1]) + (i - 1)) + xPadding, Canvas.height - (((Canvas.height - yPadding) / (GetArrayMaxValue(DataArray1) + 0.2)) * 0.5) - yPadding);
      Chart.lineTo(((Canvas.width - (xPadding * 2)) / DataArray1.length) * ((0.5 - DataArray1[i-1]) / (DataArray1[i] - DataArray1[i-1]) + (i - 1)) + xPadding, Canvas.height - yPadding);
    }
    if(DataArray1[i] > 0.75 && DataArray1[i-1] < 0.75) {
      //Chart.moveTo(xPadding, Canvas.height - (((Canvas.height - yPadding) / (GetArrayMaxValue(DataArray1) + 0.2)) * 0.75) - yPadding);
      Chart.moveTo(((Canvas.width - (xPadding * 2)) / DataArray1.length) * ((0.75 - DataArray1[i-1]) / (DataArray1[i] - DataArray1[i-1]) + (i - 1)) + xPadding, Canvas.height - (((Canvas.height - yPadding) / (GetArrayMaxValue(DataArray1) + 0.2)) * 0.75) - yPadding);
      Chart.lineTo(((Canvas.width - (xPadding * 2)) / DataArray1.length) * ((0.75 - DataArray1[i-1]) / (DataArray1[i] - DataArray1[i-1]) + (i - 1)) + xPadding, Canvas.height - yPadding);
    }
  }
  Chart.stroke();
  
  
  //Draw Line 2
  Chart.lineWidth = 1;
  Chart.strokeStyle = "red";
  Chart.globalAlpha = 1;
  Chart.beginPath();
  Chart.moveTo(xPadding, Canvas.height - (((Canvas.height - yPadding) / (GetArrayMaxValue(DataArray1) + 0.2)) * DataArray2[0]) - yPadding);
  for(var i = 0; i < DataArray2.length; i ++) {
      Chart.lineTo(((Canvas.width - (xPadding * 2)) / DataArray2.length) * i + xPadding, (Canvas.height - (((Canvas.height - yPadding) / (GetArrayMaxValue(DataArray1) + 0.2)) * DataArray2[i])) - yPadding);
  }
  Chart.stroke();
  //Draw Line 2 zoom
  Chart.lineWidth = 1;
  Chart.strokeStyle = "red";
  Chart.globalAlpha = 0.5;
  Chart.beginPath();
  Chart.moveTo((xPadding), Canvas.height - (((Canvas.height - yPadding) / (GetArrayMaxValue(DataArray2) + 0.01)) * DataArray2[0]) - yPadding);
  for(var i = 0; i < DataArray2.length; i ++) {
      Chart.lineTo(((Canvas.width - (xPadding * 2)) / DataArray2.length) * i + xPadding, (Canvas.height - (((Canvas.height - yPadding) / (GetArrayMaxValue(DataArray2) + 0.01)) * DataArray2[i])) - yPadding);
  }
  Chart.stroke();
  
  //Max value Line 2 Zoom
  Chart.strokeStyle = "black";
  Chart.lineWidth = 1;
  Chart.globalAlpha = 0.5;
  Chart.beginPath();
  Chart.moveTo(xPadding, (Canvas.height - (((Canvas.height - yPadding) / (GetArrayMaxValue(DataArray2) + 0.01)) * GetArrayMaxValue(DataArray2))) - yPadding);
  Chart.lineTo(((Canvas.width - xPadding) / DataArray2.length) * GetArrayMaxPosition(DataArray2) + (xPadding * 1.5), (Canvas.height - (((Canvas.height - yPadding) / (GetArrayMaxValue(DataArray2) + 0.01)) * GetArrayMaxValue(DataArray2))) - yPadding);
  Chart.stroke();
  
  Chart.fillText(Math.round(1000 * GetArrayMaxValue(DataArray2)) / 1000, xPadding + 15, ((Canvas.height - (((Canvas.height - yPadding) / (GetArrayMaxValue(DataArray2) + 0.01)) * GetArrayMaxValue(DataArray2))) - yPadding) + 15);
  Chart.stroke();
}
