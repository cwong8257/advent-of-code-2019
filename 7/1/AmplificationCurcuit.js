class AmplificationCurcuit {
  constructor (amplifiers) {
    this.amplifiers = amplifiers
  }

  calculateOutput(startingInputSignal) {
    let inputSignal = startingInputSignal
    let output

    for (const amplifier of this.amplifiers) {
      amplifier.setInputSignal(inputSignal)
      output = amplifier.calculateOutput()
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
}

module.exports = AmplificationCurcuit
