const fs = require('fs')
const path = require('path')

const Image = require('./Image')

const inputs = fs.readFileSync(path.join(__dirname, 'input.txt')).toString().split('')
const image = new Image(25, 6, inputs)

const layer = image.getLayerWithFewestOfGivenPixel('0')

console.log(layer.getCountOfGivenPixel('1') * layer.getCountOfGivenPixel('2'))
