var $ = function (id) {
	return document.getElementById(id);
};

var canvas = $("myCanvas"),
ctx = canvas.getContext('2d'),
placeSize = 50,
boardSize = placeSize*8;
var whosTurn = 'black';
var Pieces = new Array();
var click = [];
var isPiece = "";
window.onload = function () {
	var Pieces = new Array();
	canvas.setAttribute('height', 400);
	canvas.setAttribute('width', 400);
	drawBoard();
	
	canvas.onclick = function() {
		click.push(findClick());
		var coord = click[0],
		coordX = coord[0],
		coordY = coord[1];
		var myPiece = findPiece(coord[0], coord[1]);
		if(isPiece) {
			color(myPiece, "green");
			isPiece = "";
			} else {
				isPiece = "";
			};
		// }else {
		// 	movePiece(myPiece)
		// };
	};
		// var xClicked = coords[0];
		// var yClicked = coords[1];
		// findPiece(xClicked, yClicked);
	canvas.ondblclick = function() {
		var coord = click[0],
		coordX = coord[0],
		coordY = coord[1];
		var firstPiece = findPiece(coordX, coordY);
		if (isPiece) {
			isPiece = "";
			movePiece(firstPiece);
			click = [];
		} else {
			click = [];
			isPiece = "";
			return;
		};
	};

};

function piece(x,y,k,c) {
	//used for keeping track of pieces on board
	this.row = x;
	this.column = y;
	this.king = k;
	this.color = c;
};

function drawBoard () {
	var ctx = canvas.getContext('2d');
	for (var row = 0; row <= 8; row++) {
		for (var column = 0; column <= 8; column++) {
			var x = column * placeSize;
			var y = row * placeSize;

			if (row % 2 == 0) {
				if (column % 2 == 0) {
					ctx.fillStyle = "black";
				}
				else {
					ctx.fillStyle = "white";
				}
			} else {
				if (column % 2 == 0) {
					ctx.fillStyle = "white";
				} else {
					ctx.fillStyle = "black";
				}
			}
  		ctx.fillRect(x, y, placeSize, placeSize);
		}
	}
	makePieces();
	drawPieces();
};

function makePieces() {
	//initializes pieces in rows and columns
	for (var row = 1; row < 9; row++) {
		for ( var column = 1; column < 9; column+=2) {
			if (row < 4) {
				if (row % 2 == 1) {
					Pieces.push(new piece(row, column, false, "yellow"));
				} else {
					Pieces.push(new piece(row, column + 1, false, "yellow"));
				}
				
			} else if (row > 5) {
				if (row % 2 == 1) {
					Pieces.push(new piece(row, column, false, "red"));
				} else {
					Pieces.push(new piece(row, column + 1, false, "red"));
				}
			};
		};
	};
};

function drawPieces() {
	for (var i = 0; i < Pieces.length; i++) {
		ctx.beginPath();
		ctx.arc((Pieces[i].column * placeSize) - 25, (Pieces[i].row * placeSize) - 25, 20, 0, 2 * Math.PI);
		ctx.stroke();
		var color = Pieces[i].color;
		ctx.fillStyle = color;
		ctx.fill();
	};
};


function findClick() {
		var canvasCoords = canvas.getBoundingClientRect();
		var xClicked = event.clientX - canvasCoords.left;
		var yClicked = event.clientY - canvasCoords.top;
		// console.log("xclicked:" + xClicked, "yclicked:" + yClicked);
		return [xClicked, yClicked];
};

function findPiece(xClicked, yClicked) {
	var radius = 20;
	for (var i = 0; i < Pieces.length; i++) {
			var centerX = (Pieces[i].column * placeSize) - 25;
			var centerY = (Pieces[i].row * placeSize) - 25;
			var thisPiece = Pieces[i];

		//distance equation determines if clicked point is within circle
			if (Math.sqrt((centerX - xClicked) * (centerX - xClicked) + (centerY - yClicked) * (centerY - yClicked)) < radius) {
				isPiece = true;
				return thisPiece;
			} else { 
				isPiece = false;
				continue; }
	}
};

function color(piece, color) {
		var x = (piece.column * placeSize) - 25;
		var y = (piece.row * placeSize) - 25;
		ctx.fillStyle = color;
		ctx.beginPath();
		ctx.arc(x, y, 20, 0, 2 * Math.PI);
		ctx.stroke();
		ctx.fill();
};
function movePiece(firstPiece) {
	//gets coords of doubleclick and centers 
			var newCoords = centerMove();
			var newRow = newCoords[1]-25;
			var newColumn = newCoords[0]-25;
			var isLegal = legalMove(firstPiece, newRow, newColumn);
			if (isLegal) {
				ctx.fillStyle = firstPiece.color;
				ctx.beginPath();
				ctx.arc(newRow, newColumn, 20, 0, 2 * Math.PI);
				ctx.stroke();
				ctx.fill();
				removePiece(firstPiece);
				firstPiece.row = Math.ceil(newColumn/placeSize);
				firstPiece.column = Math.ceil(newRow/placeSize);
			} else {
				color(firstPiece, firstPiece.color);
				return;
			};
			// console.log(firstPiece.row);
			// console.log(firstPiece.column);
};

function removePiece(firstPiece) {
		var centerX = (firstPiece.column * placeSize) - 25;
		var centerY = (firstPiece.row * placeSize) - 25;
		ctx.fillStyle = "black";
			ctx.beginPath();
			ctx.arc(centerX, centerY, 20, 0, 2 * Math.PI);
			ctx.stroke();
			ctx.fill();
};
function centerMove() {
	var newCoords = click[1];
	var newX = Math.ceil(newCoords[1]/50) * 50,
	newY = Math.ceil(newCoords[0]/50) * 50;
	return [newX, newY]
}
function legalMove(firstPiece, newRow, newColumn) {
	var oldRow = firstPiece.row,
	oldColumn = firstPiece.column,
	//new rows
	nRow = Math.ceil(newColumn/placeSize),
	nCol = Math.ceil(newRow/placeSize);
	// loop through pieces and if any of their row and columns match
	for (var i = 0; i < Pieces.length; i++) {
		if (Pieces[i].row == nRow && Pieces[i].column == nCol) {
			console.log("cant move where theres already a piece");
			return false;
		};
	};
	//allow more than one row if theres a piece between them

	if (nCol - oldColumn > 2) {
		for (var i = 0; i < Pieces.length; i++) {

		}
	}
	switch (firstPiece.color) {
		case "red":
			if(nRow-oldRow == -2) {
				for (var i = 0; i < Pieces.length; i++) {
					if (Pieces[i].row == (nRow +1) && Pieces[i].column == (nCol +1)) {
						console.log("jumped a piece " + Pieces[i]);
//remove drawing
						removePiece(Pieces[i]);
//remove from array
						Pieces.splice(i,1);
						return true;
					} else if (Pieces[i].row == (nRow + 1) && Pieces[i].column == (nCol-1)) {
						console.log("jumped a piece " + Pieces[i].row);
//remove drawing
						removePiece(Pieces[i]);
//remove from array
						Pieces.splice(i,1);
						return true;
					};
				};
			};
				if ((nRow - oldRow) < (oldRow - nRow) && (nRow-oldRow == -1)) {
					if (nCol - oldColumn > 1 || nCol - oldColumn < -1) {
						console.log("only 1 column");
						return false;
					} else {
						console.log("valid move");
						return true;
					}
				} else {
	
					console.log("cant go backwards or more than one row");
					return false;
				};
				break;

		case "yellow":
			if(nRow - oldRow == 2) {
				for (var i = 0; i < Pieces.length; i++) {
					if (Pieces[i].row == (nRow -1) && Pieces[i].column == (nCol -1)) {
						console.log("jumped a piece " + Pieces[i]);
//remove drawing
						removePiece(Pieces[i]);
//remove from array
						Pieces.splice(i,1);
						return true;
					} else if (Pieces[i].row == (nRow - 1) && Pieces[i].column == (nCol+1)) {
						console.log("jumped a piece " + Pieces[i].row);
//remove drawing
						removePiece(Pieces[i]);
//remove from array
						Pieces.splice(i,1);
						return true;
					};
				};
			};
			if ((nRow - oldRow) > (oldRow - nRow) && (nRow - oldRow == 1)) {
				if (nCol - oldColumn > 1 || nCol - oldColumn < -1) {
					console.log("only 1 column");
					return false;
				} else {
					console.log("valid move");
					return true;
				}
			} else {
				console.log("cant go backwards or more than one row");
				return false;
			};
			break;
	};
};