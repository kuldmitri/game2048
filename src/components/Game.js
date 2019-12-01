import React, { useState, useEffect, memo, useRef } from 'react';
import { Game2048 } from '../lib/game';
import { GameField } from './GameField';
import { ToolBar } from './ToolBar';
import { BestMoves } from './BestMoves';
import { useUpdate, useKeyDownHandler } from './hooks';

const directionKeyCodes = {
  32: 'best',
  37: 'left',
  38: 'up',
  39: 'right',
  40: 'down',
};

const game = new Game2048();

export const Game = () => {
  const { update } = useUpdate();


  useEffect(() => {
    // const bestMoves = game.bestMoves;
    // if (bestMoves.length === 1) {
    //   game.move(bestMoves[0]);
    //   update()
    // }

  });

  const keydownHandler = (e) => {
    console.log(e.keyCode);
    const direction = directionKeyCodes[e.keyCode];
    if (!direction) {
      return;
    }
    game.move(direction);
    update();

  };

  useKeyDownHandler(keydownHandler);

  const onNewGame = () => {
    game.new();
    update();
  };

  const onUndo = () => {
    game.undo();
    update();
  };

  const onNext = () => {
    game.next();
    update();
  };

  return (
    <div style={{ display: 'flex', alignItems: 'start' }}>
      <div>
        <ToolBar
          canUndo={game.canUndo()}
          canNext={game.canNext()}
          {...{ onUndo, onNext, onNewGame }}
        />
        <GameField cells={game.field.value}/>
      </div>
      <BestMoves moves={game.bestMoves}/>
    </div>
  );
};
