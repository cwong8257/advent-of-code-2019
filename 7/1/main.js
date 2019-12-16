const fs = require('fs')
const path = require('path')

const AmplifiedControllerSoftware = require('./AmplifiedControllerSoftware')
const Amplifier = require('./Amplifier')
const { permutations } = require('./utils')

const inputs = fs.readFileSync(path.join(__dirname, 'input.txt')).toString().split(',')

const amplifiedControllerSoftware = new AmplifiedControllerSoftware(inputs)
const amplifier = new Amplifier(amplifiedControllerSoftware)
let maxOutput = -Infinity
const sequences = permutations([0, 1, 2, 3, 4])

for (let i = 0; i < sequences.length; i++) {
  const sequence = sequences[i]

  let inputSignal = 0
  let output

  for (let j = 0; j < sequence.length; j++) {
    const phaseSetting = sequence[j]

    amplifier.setPhaseSetting(phaseSetting)
    amplifier.setInputSignal(inputSignal)
    output = amplifier.calculateOutput()
    inputSignal = output
  }

  if (maxOutput < output) {
    maxOutput = output
  }
}

console.log(maxOutput)
