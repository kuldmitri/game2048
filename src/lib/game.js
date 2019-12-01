import { createMatrix, deepCopy, deepEqual, getRandomInt, getDifference } from './utils'
import { Row } from './array'
import { Array2D } from './array2D'

export class Game2048 {

  constructor() {
    this.new()
  }

  init({ score, field, currentMove } = {}) {
    this.field = new Array2D(field || createMatrix(4, 4, null));
    this.score = score || 0;
    this.storySize = 100;
  }

  new() {
    this.story = [];
    this.currentStoreIndex = 0;
    this.init()
  }

  get isFinished() {
    return this.field.hasAnyMoves
  }

  saveStateToStore() {
    console.log('saveStateToStore');
    const state = {
      score: this.score,
      field: this.field.value,
    };

    this.story.unshift(JSON.stringify(state)) ;
    const neededStorySize = this.story.length - this.currentStoreIndex;
    this.story = this.story.slice(0, neededStorySize < this.storySize ? neededStorySize : this.storySize);
    this.currentStoreIndex = 0;
  }

  downloadStateFromStore(moveNumber) {
    const settings = this.story[moveNumber];
    if (settings) {
      this.init(JSON.parse(settings))
    }
  }

  move(direction) {
    this.score = this.score + this.field.scoresForMove(direction);
    this.field.move(direction);
    this.field.addNumber();
    this.saveStateToStore();
  }

  canMove(direction) {
    return this.field.canMove(direction);
  }

  scoresForMove(direction) {
    return this.field.scoresForMove(direction)
  }

  undo() {
    if (this.canUndo()){
      this.currentStoreIndex++;
      this.downloadStateFromStore(this.currentStoreIndex);
    }
  }

  canUndo() {
    return Boolean(this.story[this.currentStoreIndex + 1]);
  }

  next() {
    if (this.canNext()){
      this.currentStoreIndex--;
      this.downloadStateFromStore(this.currentStoreIndex)
    }
  }

  canNext() {
    return Boolean(this.story[this.currentStoreIndex - 1]);
  }


}

