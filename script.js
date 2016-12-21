var $ = function (id) {
	return document.getElementById(id);
};

var canvas = $("myCanvas"),
placeSize = 50,
boardSize = placeSize*8,
pieces = new Array();


window.onload = function () {
	drawBoard();
	drawPieces();
}
function piece (x,y,k,c) {
	//used for keeping track of pieces on board
	this.col = x;
	this.row = y;
	this.king = k;
	this.color = c
}
function drawBoard () {
	var ctx = canvas.getContext('2d');
	for (var row = 0; row <= 8; row++) {
		for (var column = 0; column <= 8; column++) {
			var x = column * 50;
			var y = row * 25;

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
  		ctx.fillRect(x, y, 50, 25);
		}
	}
};

function drawPieces () {
	var ctx = canvas.getContext('2d');

	for (var row = 0; row <= 8; row++) {
		for (var column = 0; column <= 8; column++) {
			var x = column * 50;
			var y = row * 25;

			if (row <= 3 && row % 2 == 0) {
				if (column % 2 == 0) {
					ctx.fillStyle = "black";
					ctx.beginPath();
					ctx.arc(x+25, y+12.5, 10, 0, 2 * Math.PI);
					ctx.stroke();
					ctx.fill();
				}
			}else if (row >= 7) {
				if (column %2 == 0)
				}
					ctx.fillStyle = "red";
				}
			} else {
				if (column % 2 == 0) {
					ctx.fillStyle = "red";
				} else {
					ctx.fillStyle = "black";
				}
			}
			
		}
	}
};