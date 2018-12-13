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
  
}
