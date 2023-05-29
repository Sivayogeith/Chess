class Board {
	constructor() {
		this.board = {};
		this.pieceSymbols = {
			rook: { black: "&#9820;", white: "&#9814;" },
			bishop: { black: "&#9821;", white: "&#9815;" },
			queen: { black: "&#9819;", white: "&#9812;" },
			king: { black: "&#9818;", white: "&#9813;" },
			pawn: { black: "&#9823;", white: "&#9817;" },
			knight: { black: "&#9822;", white: "&#9816;" },
		};
	}

	getPieceSymbol(piece, color) {
		return this.pieceSymbols[piece][color];
	}

	setPieces(color) {
		if (color === "blank") {
			this.board = {
				...this.board,
				...Object.fromEntries(
					Array(32)
						.fill("")
						.map((_, index) => [
							getAlgebraicNotation(index + 1),
							"",
						])
				),
			};
		} else {
			const pieceOrder = [
				"rook",
				"knight",
				"bishop",
				"queen",
				"king",
				"bishop",
				"knight",
				"rook",
			];
			pieceOrder.forEach((pieceName, index) => {
				const position = getAlgebraicNotation(index + 1);
				this.board[position] = this.getPieceSymbol(pieceName, color);
			});
			for (let i = 1; i <= 8; i++) {
				const position = `b${i}`;
				this.board[position] = this.getPieceSymbol("pawn", color);
			}
		}
	}

	setAllPieces() {
		this.setPieces("black");
		this.setPieces("blank");
		this.setPieces("white");
	}
}

class ChessHTML {
	constructor(board) {
		this.board = board;
	}

	generateChessboardHTML() {
		const chessboard = document.querySelector(".chessBoard");
		chessboard.innerHTML = ""; // Clear existing chessboard

		let isWhiteSquare = true;

		for (let rank = 8; rank >= 1; rank--) {
			for (let file = 1; file <= 8; file++) {
				const position = getAlgebraicNotation(file, rank);
				const piece = this.board[position] || "";

				const square = document.createElement("div");
				square.classList.add(isWhiteSquare ? "squareWhite" : "square");
				square.innerHTML = piece;
				chessboard.appendChild(square);

				isWhiteSquare = !isWhiteSquare;
			}
			isWhiteSquare = !isWhiteSquare;
		}
	}

	updateChessboard() {
		const chessboard = document.querySelector(".chessBoard");
		chessboard.innerHTML = ""; // Clear existing chessboard

		let isWhiteSquare = true;

		for (let rank = 8; rank >= 1; rank--) {
			for (let file = 1; file <= 8; file++) {
				const position = getAlgebraicNotation(file, rank);
				const piece = this.board[position] || "";

				const square = document.createElement("div");
				square.classList.add(isWhiteSquare ? "squareWhite" : "square");
				square.innerHTML = piece;
				chessboard.appendChild(square);

				isWhiteSquare = !isWhiteSquare;
			}
			isWhiteSquare = !isWhiteSquare;
		}
	}
}

function getAlgebraicNotation(file, rank) {
	const files = "abcdefgh";
	const fileChar = files[file - 1];
	return `${fileChar}${rank}`;
}

// Usage example:
const board = new Board();
board.setAllPieces();

const chessHTML = new ChessHTML(board.board);
chessHTML.generateChessboardHTML();
