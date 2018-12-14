var Table;
var RowCountMax = 101;
function DrawTable(TableDiv, Array1, Array2) {
  if (Table != null) {
    TableDiv.removeChild(Table);
  }
  Table  = document.createElement('table');
  Table.id = "Table";
  Table.style.width  = '100px';
  Table.style.border = '1px solid black';
  for(var Row = 0; Row < Math.min(Array1.length, Array2.length, RowCountMax); Row++) {
      var tr = Table.insertRow();
      for(var Column = 0; Column < 3; Column++){
        var td = tr.insertCell();
        td.appendChild(document.createTextNode('Cell'));
        td.style.border = '1px solid black';
        if (Column == 0) {
          td.innerText = Row;
        }
        else if (Column == 1){
          td.innerText = Array1[Row];
        }
        else {
          td.innerText = Array2[Row]
        }
      }
  }
  TableDiv.appendChild(Table);
}
