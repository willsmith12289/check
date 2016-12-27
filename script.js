var $ = function (id) {
	return document.getElementById(id);
};

var canvas = $("myCanvas"),
ctx = canvas.getContext('2d'),
placeSize = 50,
boardSize = placeSize*8;
var whosTurn = 'black';
var Pieces = new Array();
window.onload = function () {
	var Pieces = new Array();
	canvas.setAttribute('height', 400);
	canvas.setAttribute('width', 400);
	drawBoard();
	canvas.onclick = function() {
		var coords = findClick();
		var xClicked = coords[0];
		var yClicked = coords[1];
		thisPiece = findPiece(xClicked, yClicked);
		console.log(thisPiece);
		removePiece(thisPiece);
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
				color(centerX, centerY);
				//console.log(thisPiece);
				return thisPiece;
			} else { 
				continue; }
	}
};
function color(x, y) {
	ctx.fillStyle = "green";
	ctx.beginPath();
	ctx.arc(x, y, 20, 0, 2 * Math.PI);
	ctx.stroke();
	ctx.fill();
}
function movePiece(thisPiece) {
		var newCoords = findClick();
		newX = newCoords[0];
		newY = newCoords[1];
		piece.centerX = newX;
		piece.centerY = newY;
		var color = thisPiece.color;
		ctx.fillStyle = color;
		ctx.beginPath();
		ctx.arc(newX, newY, 20, 0, 2 * Math.PI);
		ctx.stroke();
		ctx.fill();
};

function removePiece(thisPiece) {
		
		var centerX = (thisPiece.row * placeSize) - 25;
		var centerY = (thisPiece.column * placeSize) - 25;
		ctx.fillStyle = "black";
			ctx.beginPath();
			ctx.arc(centerX, centerY, 20, 0, 2 * Math.PI);
			ctx.stroke();
			ctx.fill();
};
// function whosTurn() {
// 	if {}
// }