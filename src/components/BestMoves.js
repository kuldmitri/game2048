import React from 'react';

const directions = {
  up: '🡹',
  down: '🡻',
  left: '🡸',
  right: '🡺',
}

export const BestMoves = ({moves}) => {
  return (
    <div className={'row'}>
      {moves.map((direction, i) => {
        return (
          <div className={'cell'} key={`directions ${i}`}>
            {directions[direction]}
          </div>
        )
      })}
    </div>
  );
}
