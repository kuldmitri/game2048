const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
}

const reverse = (array) => [...array].reverse();

const transposeArray = (array) => {
  const width = array[0].length;
  const height = array.length;

  const result = new Array(width)
    .fill(null)
    .map(() => new Array(height).fill(null));

  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      result[i][j] = array[j][i]
    }
  }
  return result;
}

const shiftArray = array => {
  return [
    ...array.filter(e => e !== null),
    ...new Array(array.length).fill(null)
  ].slice(0, array.length);
};

const joinDuplicate = array => {
  const copy = [...array];
  for (let i = 0; i < copy.length; i++) {
    if (copy[i] && copy[i] === copy[i + 1]) {
      copy[i] = copy[i] + copy[i + 1];
      copy[i + 1] = null
    }
  }
  return copy
}

const moveArray = array => {
  const step1 = shiftArray(array);
  const step2 = joinDuplicate(step1);
  const step3 = shiftArray(step2);
  return step3;
}


export class Array2D {
  constructor(width, height, value) {
    this.value = new Array(height)
      .fill(null)
      .map(() => new Array(width).fill(value));
    this.width = width;
    this.height = height;
    console.log('constructor');
    this.addNumber();
  }

  moveLeft() {
    this.value = this.value.map(e => {
      return moveArray(e);
    })
  }

  moveRight() {
    this.value = this.value.map(e => {
      return reverse(moveArray(reverse(e)));
    })
  }

  moveDown() {
    const transposedArray =  transposeArray(this.value).map(e => {
      return reverse(moveArray(reverse(e)));
    })
    this.value = transposeArray(transposedArray);
  }

  moveUp() {
    const transposedArray =  transposeArray(this.value).map(e => {
      return moveArray(e);
    })
    this.value = transposeArray(transposedArray);
  }

  addNumber(){
    const emptyCells = []

    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        if (this.value[i][j] === null){
          emptyCells.push([i,j])
        }
      }
    }

    const numberOfVariants = emptyCells.length;

    if (numberOfVariants){
      const randomInt = getRandomInt(emptyCells.length);
      const [x, y] = emptyCells[randomInt]
      this.value[x][y] = 2;
    }
  }
}
