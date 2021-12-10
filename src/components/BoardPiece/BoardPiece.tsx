import React from 'react';
import './BoardPiece.css';

interface BoardPieceProps {
  type: number;
}

export const BoardPiece = (props: BoardPieceProps) => {
  const { type } = props;
  const pieceClass = type === 1 ? 'one' : 'two';
  
  return (
    <div className="board-piece">
      <div className="board-piece-hole"></div>
        { type > 0 &&
          <div className={"board-piece-" + pieceClass}></div>
        }
    </div>
  );
};
