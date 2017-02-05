
//use the following two lines to create the sudoku table
//gridSetup();
//buttonSetup();

//create the 9x9 grid with text boxes
function gridSetup(){
	var grid = document.getElementById("sudokuTextGrid");
	var textBox;
	var tableRow;
	var tableData;
	var colourClass;
	
	for (var y = 0; y < 9; y++){
		tableRow = grid.appendChild(document.createElement("tr"));
		for (var x = 0; x < 9; x++){
			textBox = document.createElement("input");
			textBox.setAttribute("type","text");
			textBox.setAttribute("id","block" + x + y);
			textBox.setAttribute("maxLength","1");
			tableData = tableRow.appendChild(document.createElement("td"));
			tableData.appendChild(textBox);
			
			((x <= 2 || x >= 6) && (y <= 2 || y >= 6)) || (x >= 3 && x <= 5 && y >= 3 && y <= 5) ? colourClass = 'shaded' : colourClass = 'unshaded';
			$(textBox).addClass(colourClass);
		}
	}
}

function buttonSetup(){
	var solveButton = document.getElementById("solveButton");
	var clearButton = document.getElementById("clearButton");
	var exampleButton = document.getElementById("exampleButton");

	//set function for when solve button is clicked
	solveButton.onclick = function(){
		var s = gridToSudoku();
		if (s.checkAllDigits()){			s.removePossibleValues();
			if (!s.solve(1))
				alert("This puzzle is unsolvable! Some puzzles just can't be solved");
			else				toGrid(s);
		}
	};
	
	//set function for when clear button is clicked
	clearButton.onclick = function(){
		toGrid(new SudokuTable());
	};
	
	//set function for when example button is clicked
	exampleButton.onclick = function(){
		toGrid(createExamplePuzzle());
	};
}

function gridToSudoku(){
	var s = new SudokuTable();
	var textBox;
	for (var x = 0; x < 9; x++){
		for (var y = 0; y < 9; y++){
			textBox = document.getElementById("block"+x+y);
			if (textBox.value === "0"){
				alert("Input cannot be 0.");
				return;
			}
			if (isNaN(textBox.value)){
					alert("Input must be integers from 1 to 9.");
					return false;
			}
			s.table[x][y].setAnswer(textBox.value);
			s.table[x][y].setSafe(s.table[x][y].isSolved());
		}
	}
	return s;
}
	
function toGrid(sudokuTable){
	var textBox;
	for (var x = 0; x < 9; x++){
		for (var y = 0; y < 9; y++){
			textBox = document.getElementById("block"+x+y);
			if (sudokuTable.table[x][y].getSafe())
				textBox.setAttribute("style","color:RED");
			else
				textBox.setAttribute("style","color:BLACK");
			textBox.value = sudokuTable.table[x][y].getAnswer();
		}
	}
}
