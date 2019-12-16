const fs = require('fs')
const path = require('path')

const amplifiedControllerSoftware = require('./amplifiedControllerSoftware')

const inputs = fs.readFileSync(path.join(__dirname, 'input.txt')).toString().split(',')

amplifiedControllerSoftware(inputs)
