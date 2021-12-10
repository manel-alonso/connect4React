import React from 'react';
import './Board.css';
import { BoardType } from './BoardType';
import { BoardPiece } from '../BoardPiece/BoardPiece';

interface BoardProps {
  rows: number;
  cols: number;
}

const buildBoard = (rows: number, cols: number) => {
  return new Array<number>(rows).fill(0).map(() => new Array<number>(cols).fill(0))
};


export const Board = (props: BoardProps) => {
  const { rows, cols } = props;
  const [ board, setBoard ] = React.useState(buildBoard(rows, cols));
  const [ currentPlayer, setCurrentPlayer ] = React.useState(1);

  const playOnColumn = (column: number) => {
    const newBoard = [...board];

    for (let i = rows - 1; i >= 0; i--) {
      if (newBoard[i][column] === 0) {
        newBoard[i][column] = currentPlayer;
        break;
      }
    }

    setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
    setBoard(newBoard);
    checkWin();
  }

  const checkWin = () => {
    // check if 4 columns contain the same player vertically or horizontally or diagonally
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (board[i][j] !== 0) {
          if (checkVertical(i, j) || checkHorizontal(i, j) || checkDiagonal(i, j)) {
            console.log('player ' + board[i][j] + ' wins!');
            setBoard(buildBoard(rows, cols));
            break;
          }
        }
      }
    }
  }

  const checkVertical = (row: number, col: number) => {
    let count = 1;
    let i = row - 1;
    while (i >= 0 && board[i][col] === board[row][col]) {
      count++;
      i--;
    }
    i = row + 1;
    while (i < rows && board[i][col] === board[row][col]) {
      count++;
      i++;
    }
    return count >= 4;
  }

  const checkHorizontal = (row: number, col: number) => {
    let count = 1;
    let j = col - 1;
    while (j >= 0 && board[row][j] === board[row][col]) {
      count++;
      j--;
    }
    j = col + 1;
    while (j < cols && board[row][j] === board[row][col]) {
      count++;
      j++;
    }
    return count >= 4;
  }

  const checkDiagonal = (row: number, col: number) => {
    let count = 1;
    let i = row - 1;
    let j = col - 1;
    while (i >= 0 && j >= 0 && board[i][j] === board[row][col]) {
      count++;
      i--;
      j--;
    }
    i = row + 1;
    j = col + 1;
    while (i < rows && j < cols && board[i][j] === board[row][col]) {
      count++;
      i++;
      j++;
    }
    return count >= 4;
  }

  return (
    <div className="Board">
      <div onClick={() => playOnColumn(0)} className={"play-indicator" + currentPlayer}></div>
      <div onClick={() => playOnColumn(1)} className={"play-indicator" + currentPlayer}></div>
      <div onClick={() => playOnColumn(2)} className={"play-indicator" + currentPlayer}></div>
      <div onClick={() => playOnColumn(3)} className={"play-indicator" + currentPlayer}></div>
      <div onClick={() => playOnColumn(4)} className={"play-indicator" + currentPlayer}></div>
      <div onClick={() => playOnColumn(5)} className={"play-indicator" + currentPlayer}></div>
      <div onClick={() => playOnColumn(6)} className={"play-indicator" + currentPlayer}></div>
      {
        board.map((row, rowIndex) => {
          return (
            <div className="row" key={rowIndex}>
              {
                row.map((square, colIndex) => {
                  return (
                    <BoardPiece type={square}></BoardPiece>
                  );
                })
              }
            </div>
          );
        })
      }
    </div>
  );
};

