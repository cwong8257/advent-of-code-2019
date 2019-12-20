const fs = require('fs')
const path = require('path')

const AmplifiedControllerSoftware = require('./AmplifiedControllerSoftware')

const STARTING_INPUT_SIGNAL = '1'

const inputs = fs.readFileSync(path.join(__dirname, 'input.txt')).toString().split(',')

const amplifiedControllerSoftware = new AmplifiedControllerSoftware(inputs)
amplifiedControllerSoftware.addInputValues([STARTING_INPUT_SIGNAL])
amplifiedControllerSoftware.calculateFinalOutput()
