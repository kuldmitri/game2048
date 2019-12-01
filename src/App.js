import React, { useState, useEffect, memo, useRef } from 'react';
import './App.css';
// import { Array2D } from './core';
import { Game2048 } from './game';
import { createMatrix } from './utils';

const directions = {
  up: '🡹',
  down: '🡻',
  left: '🡸',
  right: '🡺',
}


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

const test = [
  [4, 4, 8, 16],
  [256, 128, 64, 32],
  [512, 1024, 2048, 4096],
  [65536, 32768, 16384, 8192],
]

const game = new Game2048();

const App = () => {
  const [state, setState] = useState(null);
  console.log(game);
  const keydownHandler = (e) => {
    if (![37, 38, 39, 40].includes(e.keyCode)) {
      return
    }

    if (e.keyCode === 37) {
      game.move('left')
    }
    if (e.keyCode === 39) {
      game.move('right')
    }
    if (e.keyCode === 38) {
      game.move('up')
    }
    if (e.keyCode === 40) {
      game.move('down')
    }
    setState(+new Date())
  }

  useEffect(() => {
    document.addEventListener('keydown', keydownHandler);

    return () => {
      document.removeEventListener('keydown', keydownHandler);
    }
  }, [])

  const onClick = () => {
    game.new();
    setState(+new Date())
  }

  const onClickUndo = () => {
    game.undo();
    setState(+new Date())
  }

  const onClickRedo = () => {
    game.next();
    setState(+new Date())
  }

  return (
    <div style={{ display: 'flex', alignItems: 'start' }}>
      <div>
        <div className={'row'}>
          <div className={'cell'} style={{ width: '100%', backgroundColor: '#bbada0', cursor: 'pointer' }}
               onClick={onClick}>New game
          </div>
        </div>

        <div className={'row'}>
          <div className={'cell'} style={{ width: '100%', backgroundColor: '#bbada0' }}>Score: {game.score}</div>
        </div>

        <div className={'row'} style={{ marginBottom: '10px' }}>
          <div
            className={'cell'}
            style={{ width: '50%', backgroundColor: '#bbada0', cursor: 'pointer', opacity: game.canUndo() ? 1 : 0.5 }}
            onClick={onClickUndo}
          >🡸 Undo
          </div>
          <div
            className={'cell'}
            style={{ width: '50%', backgroundColor: '#bbada0', cursor: 'pointer', opacity: game.canNext() ? 1 : 0.5 }}
            onClick={onClickRedo}
          >Redo 🡺
          </div>
        </div>


        <div className={'container'}>

          {game.field.value.map((e, i) => (
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
      </div>
      <div>
        <div className={'container'}>
          <div className={'row'}>
            {Object.keys(directions).map((e, i) => {
              return (
                <div className={'cell'} key={`directions ${i}`}>
                  {directions[e]}
                </div>
              )
            })}

          </div>

          <div className={'row'}>
            {Object.keys(directions).map((e, i) => {
              return (
                <div className={'cell'} key={`directions ${i}`}>
                  {game.canMove(e) && game.scoresForMove(e)}
                </div>
              )
            })}

          </div>
        </div>
      </div>

    </div>
  );
}

export default App;
