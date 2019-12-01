import { createMatrix, deepCopy, deepEqual, getRandomInt, getDifference } from './utils'
import { Row } from './array'

export class Array2D {

  constructor(value = []) {
    this.value = deepCopy(value);
  }

  copy() {
    return new Array2D(this.value)
  }

  get width() {
    return this.value && this.value[0] && this.value[0].length
  }

  get height() {
    return this.value && this.value.length
  }

  walk(cb) {
    try {
      const height = this.height;
      const width = this.width;

      for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
          cb(this.value[i][j], i, j)
        }
      }
    } catch (e) {
      console.error('Error during walking of Array2D');
      console.error(e)
    }
  }

  mapColumns(cb) {
    let result = deepCopy(this.value);
    const getColumn = (i) => {
      return result.map(e => e[i])
    }

    const setColumn = (index, value) => {
      result = result.map((e, i) => {
        e[index] = value[i]
        return e;
      })
    }

    for (let i = 0; i < this.width; i++) {
      setColumn(i, cb(getColumn(i), i))
    }

    return result

  }

  move(direction) {
    this.value = this.moved(direction);
  }

  moved(direction) {
    if (!['left', 'right', 'up', 'down'].includes(direction)) {
      return deepCopy(this.value)
    }

    if (['left', 'right'].includes(direction)) {
      const rowDirection = direction === 'left'
        ? 'start'
        : 'end';
      return this.value.map(e => {
        return new Row(e).move(rowDirection).value
      })
    }

    if (['up', 'down'].includes(direction)) {
      const rowDirection = direction === 'up'
        ? 'start'
        : 'end';
      return this.mapColumns((e) => {
        return new Row(e).move(rowDirection).value
      })
    }

  }

  get hasAnyMoves() {
    return [
      this.canMove('up'),
      this.canMove('down'),
      this.canMove('left'),
      this.canMove('right'),
    ].some(Boolean)
  }

  canMove(direction) {
    return !deepEqual(this.value, this.moved(direction))
  }

  scoresForMove(direction) {
    return getDifference(this.value, this.moved(direction));
  }

  addNumber() {
    const emptyCells = [];
    this.walk((e, i, j) => {
      if (!e) {
        emptyCells.push([i, j])
      }
    })

    const numberOfVariants = emptyCells.length;

    if (numberOfVariants) {
      const randomInt = getRandomInt(numberOfVariants);
      const [x, y] = emptyCells[randomInt]
      this.value[x][y] = getRandomInt(10) === 0 ? 4 : 2;
    }

  }

}

