var Table;
var RowCountMax = 101;
function DrawTable(TableDiv, Array1, Array2) {
	var tr;
	var td;
	if (Table != null) {
		TableDiv.removeChild(Table);
	}
	Table = document.createElement('table');
	Table.id = "Table";
	Table.style.width = '100px';
	Table.style.border = '1px solid black';
	//Add Table headers
	tr = Table.insertRow();
	td = tr.insertCell();
	td.innerText = "Round";
	td.style.textAlign = "center";
	td = tr.insertCell();
	td.innerText = "Chance to make it to round, and then win Alpha pack";
	td.style.textAlign = "center";
	td = tr.insertCell();
	td.innerText = "Cumulative chance to win Alpha pack";
	td.style.textAlign = "center";
	//Add in Array values
	for(var Row = 1; Row < Math.min(Array1.length, Array2.length, RowCountMax); Row++) {
		tr = Table.insertRow();
		for(var Column = 0; Column < 3; Column++){
			td = tr.insertCell();
			if (Column == 0) {
				td.innerText = Row;
				td.style.textAlign = "center";
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
