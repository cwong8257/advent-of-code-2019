class Amplifier {
  constructor (amplifiedControllerSoftware) {
    this.amplifiedControllerSoftware = amplifiedControllerSoftware
    this.phaseSetting = null
    this.inputSignal = null
  }

  calculateOutput () {
    return this.amplifiedControllerSoftware.calculateOutput([this.phaseSetting, this.inputSignal])
  }

  setPhaseSetting (phaseSetting) {
    if (typeof phaseSetting === 'number') {
      return this.phaseSetting = phaseSetting.toString()
    }

    this.phaseSetting = phaseSetting
  }

  setInputSignal (inputSignal) {
    if (typeof inputSignal === 'number') {
      return this.inputSignal = inputSignal.toString()
    }

    this.inputSignal = inputSignal
  }
}

module.exports = Amplifier
