const fs = require('fs')
const path = require('path')

const AmplifiedControllerSoftware = require('./AmplifiedControllerSoftware')
const Amplifier = require('./Amplifier')
const AmplificationCurcuit = require('./AmplificationCurcuit')
const { permutations } = require('./utils')

const AMPS_COUNT = 5
const STARTING_INPUT_SIGNAL = 0
const amplifiers = []
let maxOutput = -Infinity

const inputs = fs.readFileSync(path.join(__dirname, 'input.txt')).toString().split(',')

for (let i = 0; i < AMPS_COUNT; i++) {
  const amplifiedControllerSoftware = new AmplifiedControllerSoftware(inputs)
  const amplifier = new Amplifier(amplifiedControllerSoftware)
  amplifiers.push(amplifier)
}

const amplificationCurcuit = new AmplificationCurcuit(amplifiers)
const sequences = permutations([0, 1, 2, 3, 4])

for (const sequence of sequences) {
  amplificationCurcuit.setPhaseSettings(sequence)
  const output = amplificationCurcuit.calculateOutput(STARTING_INPUT_SIGNAL)

  if (maxOutput < output) {
    maxOutput = output
  }
}

console.log(maxOutput)
