const process = require('process');

class Layer {
  constructor (width, height, rawData) {
    this.width = width
    this.height = height
    this.rawData = rawData
    this.layer = []

    this._createLayer()
  }

  _createLayer () {
    const layer = []

    for (let i = 0; i < this.height; i++) {
      const startingIndex = 0 + this.width * i
      const endingIndex = startingIndex + this.width

      layer.push(this.rawData.slice(startingIndex, endingIndex))
    }

    this.layer = layer
  }

  getCountOfGivenPixel (num) {
    let count = 0

    this.layer.forEach(row => {
      row.forEach(pixel => {
        if (pixel === num) {
          count++
        }
      })
    })

    return count
  }

  print () {
    this.layer.forEach(row => {
      row.forEach(pixel => {
        if (pixel === '0') {
          process.stdout.write('⬛️')
        } else if (pixel === '1') {
          process.stdout.write('⬜️')
        } else {
          rocess.stdout.write(' ')
        }
      })
      process.stdout.write('\n')
    })
  }
}

module.exports = Layer
