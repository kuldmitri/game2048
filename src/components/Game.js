import React, { useState, useEffect, memo, useRef } from 'react';
import { Game2048 } from '../lib/game';
import { GameField } from './GameField';
import { ToolBar } from './ToolBar';
import { useUpdate, useKeyDownHandler } from './hooks';

const directionKeyCodes = {
  37: 'left',
  38: 'up',
  39: 'right',
  40: 'down',
};

const game = new Game2048();

export const Game = () => {
  const { update } = useUpdate();

  const keydownHandler = (e) => {
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
    </div>
  );
};
