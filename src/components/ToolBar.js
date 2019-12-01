import React from 'react';

export const ToolBar = ({ canUndo, canNext, onUndo, onNext, onNewGame }) => {
  return (
    <div style={{ marginBottom: '10px' }}>
      <div className={'row'}>
        <div className={'button'} onClick={onNewGame}>New game</div>
      </div>
      <div className={'row'}>
        <div className="button" style={{ opacity: canUndo ? 1 : 0.5 }} onClick={onUndo}>🡸 Undo</div>
        <div className="button" style={{ opacity: canNext ? 1 : 0.5 }} onClick={onNext}>Redo 🡺</div>
      </div>
    </div>
  );
}
