import { createMatrix, deepCopy } from './utils'

export class Row {
  constructor(value) {
    this.value = deepCopy(value)
  }

  get length() {
    return this.value.length
  }

  copy() {
    return new Row(this.value)
  }

  reversed() {
    return new Row(deepCopy(this.value).reverse())
  }

  move(direction) {
    this.value = this.moved(direction);
    return this
  }

  moved(direction) {
    if (!['start', 'end'].includes(direction)){
      return []
    }

    let result = deepCopy(this.value).filter(e => e !== null);

    if (direction === 'end') {
      result = result.reverse()
    }

    for (let i = 0; i < result.length; i++) {
      const current = result[i];
      const next = result[i + 1];

      if (current && current === next) {
        result[i] = current + next;
        result[i + 1] = null
      }
    }

    result = [...result.filter(e => e !== null), ...new Array(this.length).fill(null)]
      .slice(0, this.length)

    if(direction === 'start'){
      return result
    }

    if (direction === 'end'){
      return result.reverse()
    }

  }

  canMove(direction) {
    return this.isEqual(this.moved(direction))
  }

  isEqual(row) {
    return JSON.stringify(this.value) === JSON.stringify(row)
  }
}

console.log(new Row([2, 2, 2, 2]).moved('start'));
console.log(new Row([2, 2, 2, 2]).moved('end'));