var $ = function (id) {
	return document.getElementById(id);
};

var canvas = $("myCanvas"),
ctx = canvas.getContext('2d'),
placeSize = 50,
boardSize = placeSize*8,
Pieces = new Array(),
yellowPieces = new Array(),
redPieces = new Array();


window.onload = function () {
	canvas.setAttribute('height', 400);
	canvas.setAttribute('width', 400);
	drawBoard();
	drawYellow();
	drawRed();
	canvas.onclick = function() {
		var coords = findClick();
		var xClicked = coords[0];
		var yClicked = coords[1];
		var thisPiece = findPiece(xClicked, yClicked);
	};
}
function piece(x,y,k,c, id) {
	//used for keeping track of pieces on board
	this.centerX = x;
	this.centerY = y;
	this.king = k;
	this.color = c;
	this.id = id;
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

function drawYellow () {
	var ctx = canvas.getContext('2d');
	var id = 0
	for (var row = 1; row <= 3; row++) {
		for (var column = 1; column <= 8; column++) {
			var x = column * placeSize;
			var y = row * placeSize;
			if (row % 2 == 0) {
				if (column % 2 == 0) {
					ctx.fillStyle = "yellow";
				} else {continue;}
			} else {
				if (column % 2 != 0) {
					ctx.fillStyle = "yellow";
				} else { continue; }
			}
				ctx.beginPath();
				ctx.arc(x -25, y - 25, 20, 0, 2 * Math.PI);
				ctx.stroke();
				ctx.fill();
				id += 1;
				var circleY = new piece((x-25), (y-25), false, "yellow", id);
				Pieces.push(circleY);
				var p = document.createElement("span");
				p.setAttribute("id", `y${id}`)
				canvas.appendChild(p);
		}
	}
};

function drawRed() {
	var ctx = canvas.getContext('2d'),
	id = 0;
	for (var row = 6; row <= 8; row++) {
		for (var column = 0; column <= 8; column++) {
			var x = column * placeSize;
			var y = row * placeSize;
			if (row % 2 == 0) {
				if (column % 2 == 0) {
					ctx.fillStyle = "red";
				} else {continue;}
			} else {
				if (column % 2 != 0) {
					ctx.fillStyle = "red";
				} else { continue; }
			}
				ctx.beginPath();
				ctx.arc(x -25, y - 25, 20, 0, 2 * Math.PI);
				ctx.stroke();
				ctx.fill();
				id += 1;
				var circleX = new piece((x-25), (y-25), false, "red", id);
				Pieces.push(circleX);
				var p = document.createElement("span");
				p.setAttribute("id", `r${id}`)
				canvas.appendChild(p);
		}
	}
};


function findClick() {
	var canvasCoords = canvas.getBoundingClientRect();
	var xClicked = event.clientX - canvasCoords.left;
	var yClicked = event.clientY - canvasCoords.top;
	console.log("xclicked:" + xClicked, "yclicked:" + yClicked);
	return [xClicked, yClicked];
};

function findPiece(xClicked, yClicked) {
	var radius = 20;
	for (var i = 0; i <= Pieces.length; i++) {
			var thisPiece = Pieces[i];
				console.log(Pieces[i].centerX);
		//distance equation determines if clicked point is within circle
			if (Math.sqrt((thisPiece.centerX - xClicked) * (thisPiece.centerX - xClicked) + (thisPiece.centerY - yClicked) * (thisPiece.centerY - yClicked)) < radius) {
				console.log("within piece");
				//changes color of clicked piece
				color(thisPiece);
				return thisPiece;
			} else { 
				continue; }
	}
};
function color(piece) {
	ctx.fillStyle = "green";
	ctx.beginPath();
	ctx.arc(piece.centerX, piece.centerY, 20, 0, 2 * Math.PI);
	ctx.stroke();
	ctx.fill();
}
function movePiece(piece) {
	var coords = findClick();
	var x = coords[0];
	var y = coords[1];
	if(findPiece(piece)) {
		removePiece(piece);
		ctx.fillStyle = "green";
		ctx.beginPath();
		ctx.arc(x, y, 20, 0, 2 * Math.PI);
		ctx.stroke();
		ctx.fill();
	}
};

function removePiece(piece) {
	if (findPiece) {
		ctx.fillStyle = "black";
			ctx.beginPath();
			ctx.arc(piece.centerX, piece.centerY, 20, 0, 2 * Math.PI);
			ctx.stroke();
			ctx.fill();
	}
}