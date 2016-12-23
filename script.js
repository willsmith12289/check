var $ = function (id) {
	return document.getElementById(id);
};

var canvas = $("myCanvas"),
placeSize = 50,
boardSize = placeSize*8,
pieces = new Array();


window.onload = function () {
	canvas.setAttribute('height', 400);
	canvas.setAttribute('width', 400);
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
};

function drawPieces () {
	var ctx = canvas.getContext('2d');
	for (var row = 0; row <= 8; row++) {
		for (var column = 0; column <= 8; column++) {
			var x = column * placeSize;
			var y = row * placeSize;
			if ((row % 2 == 0) && (column % 2 == 0) ) {
				if ((row > 1) && (row < 3)) {
					ctx.fillStyle = "yellow";
				}
				if( row >= 6) {
					ctx.fillStyle = "red";
				}
				ctx.beginPath();
				ctx.arc(x -25, y - 25, 20, 0, 2 * Math.PI);
				ctx.stroke();
				ctx.fill();
			}
		}
	}
}
	// 		if (row % 2 == 0) {
	// 			if (column % 2 == 0) {
	// 				ctx.fillStyle = "yellow";
	// 			}
	// 			else {
	// 				ctx.fillStyle = "red";
	// 			}
	// 		} else {
	// 			if (column % 2 == 0) {
	// 				ctx.fillStyle = "red";
	// 			} else {
	// 				ctx.fillStyle = "yellow";
	// 			}
	// 		}
	// 		if (ctx.fillStyle == "yellow" && row <= 3) {
	// 			ctx.beginPath();
	// 			ctx.arc(x -25, y - 25, 20, 0, 2 * Math.PI);
	// 			ctx.stroke();
	// 			ctx.fill();
	// 		} else if (ctx.fillStyle == "red" {

	// 		}
	// 	}
	// }

