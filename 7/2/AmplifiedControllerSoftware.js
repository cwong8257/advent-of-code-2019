class AmplifiedControllerSoftware {
  constructor (integers) {
    this.integers = integers
    this.integersIndex = 0
    this.inputValues = []
    this.outputValue = null
    this.instructionOpcode = ''
    this.parameterModes = ''
    this.hasHalted = false
  }

  setInstructionDetails (instruction) {
    this.instructionOpcode = instruction[instruction.length - 1],
    this.parameterModes = instruction.substring(0, instruction.length - 2)
  }

  addInputValues (inputValues) {
    this.inputValues.push(...inputValues)
  }

  calculateNextOutput () {
    // get the instruction
    let instruction = this.getInstruction()
    this.setInstructionDetails(instruction)

    while (instruction !== '99') {
      // do the instruction
      this.integersIndex = this.handleInstruction()

      // if the instruction was 4, stop
      if (this.instructionOpcode === '4') {
        return this.outputValue
      }

      instruction = this.getInstruction()
      this.setInstructionDetails(instruction)
    }

    this.hasHalted = true

    return this.outputValue
  }

  calculateFinalOutput () {
    while (!this.hasHalted) {
      this.calculateNextOutput()
    }

    return this.outputValue
  }

  getInstruction () {
    return this.integers[this.integersIndex]
  }

  handleInstruction () {
    switch (this.instructionOpcode) {
      case '1': return this.add()
      case '2': return this.multiply()
      case '3': return this.input()
      case '4': return this.output()
      case '5': return this.jumpIfTrue()
      case '6': return this.jumpIfFalse()
      case '7': return this.lessThan()
      case '8': return this.equals()
      default: break;
    }
  }

  reset () {
    this.integersIndex = 0
    this.inputValues = []
    this.outputValue = null
    this.hasHalted = false
  }

  add () {
    return this.handleBinaryOperation((operand1, operand2) => operand1 + operand2)
  }

  multiply () {
    return this.handleBinaryOperation((operand1, operand2) => operand1 * operand2)
  }
  
  handleBinaryOperation (operation) {
    const parameter1 = this.integers[this.integersIndex + 1]
    const parameter2 = this.integers[this.integersIndex + 2]
    const parameter3 = this.integers[this.integersIndex + 3]
    const mode1 = this.parameterModes[this.parameterModes.length - 1]
    const mode2 = this.parameterModes[this.parameterModes.length - 2]
    const operand1 = this.getActualValue(mode1, parameter1)
    const operand2 = this.getActualValue(mode2, parameter2)
    const result = operation(operand1, operand2)
    this.integers[parameter3] = result.toString()
    
    return this.integersIndex + 4
  }

  getActualValue (mode = '0', parameter) {
    switch (mode) {
      case '0': return Number.parseInt(this.integers[parameter])
      case '1': return Number.parseInt(parameter)
      default: break;
    }
  }

  input () {
    const inputValue = this.inputValues.shift()
    const parameter = this.integers[this.integersIndex + 1]
    this.integers[parameter] = inputValue.toString()

    return this.integersIndex + 2
  }

  output () {
    const parameter = this.integers[this.integersIndex + 1]
    this.outputValue = Number.parseInt(this.integers[parameter])
  
    return this.integersIndex + 2
  }

  jumpIfTrue () {
    return this.jump((value) => value !== 0)
  }

  jumpIfFalse () {
    return this.jump((value) => value === 0)
  }

  lessThan () {
    return this.compare((value1, value2) => value1 < value2)
  }

  equals () {
    return this.compare((value1, value2) => value1 === value2)
  }

  jump (validateCondition) {
    const parameter1 = this.integers[this.integersIndex + 1]
    const parameter2 = this.integers[this.integersIndex + 2]
    const mode1 = this.parameterModes[this.parameterModes.length - 1]
    const mode2 = this.parameterModes[this.parameterModes.length - 2]
    const value1 = this.getActualValue(mode1, parameter1, this.integers)
    const value2 = this.getActualValue(mode2, parameter2, this.integers)
  
    if (validateCondition(value1)) {
      return value2
    }
  
    return this.integersIndex + 3
  }

  compare (validateCondition) {
    const parameter1 = this.integers[this.integersIndex + 1]
    const parameter2 = this.integers[this.integersIndex + 2]
    const parameter3 = this.integers[this.integersIndex + 3]
    const mode1 = this.parameterModes[this.parameterModes.length - 1]
    const mode2 = this.parameterModes[this.parameterModes.length - 2]
    const value1 = this.getActualValue(mode1, parameter1)
    const value2 = this.getActualValue(mode2, parameter2)
  
    if (validateCondition(value1, value2)) {
      this.integers[parameter3] = '1'
    } else {
      this.integers[parameter3] = '0'
    }
  
    return this.integersIndex + 4
  }
}

module.exports = AmplifiedControllerSoftware
