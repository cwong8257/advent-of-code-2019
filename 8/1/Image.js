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
