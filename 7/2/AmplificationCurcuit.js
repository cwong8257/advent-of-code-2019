class AmplificationCurcuit {
  constructor (amplifiers, { mode = 'SEQUENTIAL'} = {}) {
    this.amplifiers = amplifiers
    this.mode = mode
  }

  calculateOutput(startingInputSignal) {
    switch (this.mode) {
      case 'SEQUENTIAL': return this.calculateFinalOutput(startingInputSignal)
      case 'FEEDBACK': return this.calculateFeedbackOutput(startingInputSignal)
    }
  }

  calculateFeedbackOutput(startingInputSignal) {
    let inputSignal = startingInputSignal
    let output
    let index = 0
    let lastAmplifer = this.amplifiers[this.amplifiers.length - 1]

    while (!lastAmplifer.amplifiedControllerSoftware.hasHalted) {

      const arrayIndex = index % this.amplifiers.length
      const amplifier = this.amplifiers[arrayIndex]
      amplifier.setInputSignal(inputSignal)
      output = amplifier.calculateNextOutput()
      inputSignal = output
      index++
    }

    return lastAmplifer.amplifiedControllerSoftware.outputValue
  }

  calculateFinalOutput(startingInputSignal) {
    let inputSignal = startingInputSignal
    let output

    for (const amplifier of this.amplifiers) {
      amplifier.setInputSignal(inputSignal)
      output = amplifier.calculateFinalOutput()
      inputSignal = output
    }

    return output
  }

  setAmplifiers (amplifiers) {
    this.amplifiers = amplifiers
  }

  setPhaseSettings (phaseSettings) {
    phaseSettings.forEach((phaseSetting, i) => this.amplifiers[i].setPhaseSetting(phaseSetting))
  }

  reset () {
    this.amplifiers.forEach((amplifier) => amplifier.reset())
  }
}

module.exports = AmplificationCurcuit
