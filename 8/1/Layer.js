class Layer {
  constructor (width, height, rawData) {
    this.width = width
    this.height = height
    this.rawData = rawData
    this.layer = null

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
}

module.exports = Layer
