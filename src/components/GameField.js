import React from 'react';

const colors = {
  2: '#eee4da',
  4: '#ede0c8',
  8: '#f2b179',
  16: '#f59563',
  32: '#f67c5f',
  64: '#f65e3b',
  128: '#edcf72',
  256: '#edcc61',
  512: '#edc850',
  1024: '#edc53f',
  2048: '#edc22e',
  super: '#3c3a32',
};

const sizes = {
  2: '25px',
  4: '25px',
  8: '25px',
  16: '25px',
  32: '25px',
  64: '25px',
  128: '25px',
  256: '25px',
  512: '25px',
  1024: '20px',
  2048: '20px',
  super: '15px',
}

export const GameField = ({cells}) => {
  return (
    <div className={'container'}>
      {cells.map((e, i) => (
        <div className={'row'} key={i}>
          {e.map((e1, j) => (
            <div
              className={'cell'}
              key={j}
              style={e1
                ? {
                  backgroundColor: colors[e1] || colors.super,
                  fontSize: sizes[e1] || sizes.super
                }
                : {}}
            >
              {e1}
            </div>))}
        </div>))}
    </div>
  );
}
