const fs = require('fs')
const path = require('path')

const Image = require('./Image')

const inputs = fs.readFileSync(path.join(__dirname, 'input.txt')).toString().split('')
const image = new Image(25, 6, inputs)
const layer = image.getVisibleLayer()
layer.print()