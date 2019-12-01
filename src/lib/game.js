import { createMatrix, deepCopy, deepEqual, getRandomInt, getDifference } from './utils';
import { Row } from './array';
import { Array2D } from './array2D';

export class Game2048 {

  constructor() {
    this.new();
  }

  init({ score, field, currentMove } = {}) {
    this.field = new Array2D(field || createMatrix(4, 4, null));
    this.score = score || 0;
    this.storySize = 100;
  }

  new() {
    this.story = [];
    this.currentStoreIndex = 0;
    this.init();
    this.field.addNumber();
  }

  get isFinished() {
    return this.field.hasAnyMoves;
  }

  get bestMoves() {
    const up = this.canMove('up');
    const down = this.canMove('down');
    const left = this.canMove('left');
    const right = this.canMove('right');


    const lastRow = this.field.getLastRow();
    const lastRowPossibleMoves = lastRow.possibleMoves;
    const canLastRowMove = Boolean(lastRowPossibleMoves.length);
    console.log({ canLastRowMove, lastRow, lastRowPossibleMoves });
    const result = [];

    if (down) {
      result.push('down');
      return result;
    }

    if (right) {
      result.push('right');
      return result;
    }

    if (left && !canLastRowMove) {
      result.push('left');
      return result;
    }

    return result;

  }

  saveStateToStore() {
    console.log('saveStateToStore');
    const state = {
      score: this.score,
      field: this.field.value,
    };

    this.story.unshift(JSON.stringify(state));
    const neededStorySize = this.story.length - this.currentStoreIndex;
    this.story = this.story.slice(0, neededStorySize < this.storySize ? neededStorySize : this.storySize);
    this.currentStoreIndex = 0;
  }

  downloadStateFromStore(moveNumber) {
    const settings = this.story[moveNumber];
    if (settings) {
      this.init(JSON.parse(settings));
    }
  }

  move(direction) {

    if (direction === 'best'){
      direction = this.bestMoves[0]
    }

    if (!this.canMove(direction)) {
      return;
    }
    this.score = this.score + this.field.scoresForMove(direction);
    this.field.move(direction);
    this.field.addNumber();
    this.saveStateToStore();
  }

  canMove(direction) {
    return this.field.canMove(direction);
  }

  scoresForMove(direction) {
    return this.field.scoresForMove(direction);
  }

  undo() {
    if (this.canUndo()) {
      this.currentStoreIndex++;
      this.downloadStateFromStore(this.currentStoreIndex);
    }
  }

  canUndo() {
    return Boolean(this.story[this.currentStoreIndex + 1]);
  }

  next() {
    if (this.canNext()) {
      this.currentStoreIndex--;
      this.downloadStateFromStore(this.currentStoreIndex);
    }
  }

  canNext() {
    return Boolean(this.story[this.currentStoreIndex - 1]);
  }


}

