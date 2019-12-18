const Layer = require('./Layer')

class Image {
  constructor (width, height, rawData) {
    this.width = width
    this.height = height
    this.rawData = rawData
    this.layers = []

    this._createLayers()
  }

  _createLayers () {
    const area = this.width * this.height
    const layerCount = Math.ceil(this.rawData.length / area)

    for (let i = 0; i < layerCount; i++) {
      const startingIndex = 0 + area * i
      const endingIndex = startingIndex + area
      const rawLayerData = this.rawData.slice(startingIndex, endingIndex)
      const layer = new Layer(this.width, this.height, rawLayerData)

      this.layers.push(layer)
    }
  }

  getVisibleLayer () {
    const visibleRawData = []

    for (let rowIndex = 0; rowIndex < this.height; rowIndex++) {
      for (let colIndex = 0; colIndex < this.width; colIndex++) {
        for (let layerIndex = 0; layerIndex < this.layers.length; layerIndex++) {
          const layer = this.layers[layerIndex]
          const pixel = layer.layer[rowIndex][colIndex]

          if (['0', '1'].includes(pixel) || (layerIndex === this.layers.length - 1)) {
            visibleRawData.push(pixel)
            break
          }
        }
      }
    }

    return new Layer(this.width, this.height, visibleRawData)
  }

  getLayerWithFewestOfGivenPixel (num) {
    let lowestPixelCount = Infinity
    let result

    this.layers.forEach(layer => {
      const pixelCount = layer.getCountOfGivenPixel(num)

      if (lowestPixelCount > pixelCount) {
        result = layer 
        lowestPixelCount = pixelCount
      }
    })
    
    return result
  }
}

module.exports = Image
