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
		if(myPiece) {
			color(myPiece);

			}
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
		console.log(firstPiece);
		removePiece(firstPiece);
		movePiece(firstPiece);
		click = [];
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
		console.log("xclicked:" + xClicked, "yclicked:" + yClicked);
		//findPiece(xClicked, yClicked);
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
				console.log("within piece");
				//changes color of clicked piece
				//color(centerX, centerY);
				//console.log(thisPiece);
				return thisPiece;
			} else { 
				continue; }
	}
};
function color(piece) {
	if(piece){
		var x = (piece.column * placeSize) - 25;
		var y = (piece.row * placeSize) - 25;
		ctx.fillStyle = "green";
		ctx.beginPath();
		ctx.arc(x, y, 20, 0, 2 * Math.PI);
		ctx.stroke();
		ctx.fill();
	};
};
function movePiece(firstPiece) {
			var newCoords = click[1];
			console.log(newCoords[0]);
			newX = newCoords[1]
			newY = newCoords[0];
			var color = firstPiece.color;
			ctx.fillStyle = color;
			ctx.beginPath();
			ctx.arc(newCoords[0], newCoords[1], 20, 0, 2 * Math.PI);
			ctx.stroke();
			ctx.fill();
			removePiece(firstPiece);
			firstPiece.row = Math.floor((newX + 25)/placeSize);
			firstPiece.column = Math.floor((newY+25)/placeSize);
			console.log("row " + firstPiece.row);
};

function removePiece(firstPiece) {
		var centerX = (firstPiece.column * placeSize) - 25;
		console.log(centerX);
		var centerY = (firstPiece.row * placeSize) - 25;
		ctx.fillStyle = "black";
			ctx.beginPath();
			ctx.arc(centerX, centerY, 20, 0, 2 * Math.PI);
			ctx.stroke();
			ctx.fill();
};
// function whosTurn() {
// 	if {}
// }