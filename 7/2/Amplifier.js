class Amplifier {
  constructor (amplifiedControllerSoftware) {
    this.amplifiedControllerSoftware = amplifiedControllerSoftware
    this.inputSignal = null
  }

  calculateNextOutput () {
    this.amplifiedControllerSoftware.addInputValues([this.inputSignal])
    return this.amplifiedControllerSoftware.calculateNextOutput()
  }

  calculateFinalOutput () {
    this.amplifiedControllerSoftware.addInputValues([this.inputSignal])
    return this.amplifiedControllerSoftware.calculateFinalOutput()
  }

  setPhaseSetting (phaseSetting) {
    this.amplifiedControllerSoftware.addInputValues([phaseSetting])
  }

  setInputSignal (inputSignal) {
    this.inputSignal = inputSignal
  }

  reset () {
    this.amplifiedControllerSoftware.reset()
    this.inputSignal = null
  }
}

module.exports = Amplifier
