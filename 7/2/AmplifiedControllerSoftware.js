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

  setInstructionDetails(instruction) {
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
    const index = this.integersIndex + 1

    switch (this.instructionOpcode) {
      case '1': return this.add(this.parameterModes, index)
      case '2': return this.multiply(this.parameterModes, index)
      case '3': return this.input(index)
      case '4': return this.output(index)
      case '5': return this.jumpIfTrue(this.parameterModes, index)
      case '6': return this.jumpIfFalse(this.parameterModes, index)
      case '7': return this.lessThan(this.parameterModes, index)
      case '8': return this.equals(this.parameterModes, index)
      default: break;
    }
  }

  reset () {
    this.integersIndex = 0
    this.inputValues = []
    this.outputValue = null
    this.hasHalted = false
  }

  add (parameterModes, index) {
    return this.handleBinaryOperation(parameterModes, index, (operand1, operand2) => operand1 + operand2)
  }

  multiply (parameterModes, index) {
    return this.handleBinaryOperation(parameterModes, index, (operand1, operand2) => operand1 * operand2)
  }
  
  handleBinaryOperation (parameterModes, index, operation) {
    const parameterModesIndex = parameterModes.length - 1
    const parameter1 = this.integers[index]
    const parameter2 = this.integers[index + 1]
    const parameter3 = this.integers[index + 2]
    const mode1 = parameterModes[parameterModesIndex]
    const mode2 = parameterModes[parameterModesIndex - 1]
    const operand1 = this.getActualValue(mode1, parameter1)
    const operand2 = this.getActualValue(mode2, parameter2)
    const result = operation(operand1, operand2)
    this.integers[parameter3] = result.toString()
    
    return index + 3
  }

  getActualValue (mode = '0', parameter) {
    switch (mode) {
      case '0': return Number.parseInt(this.integers[parameter])
      case '1': return Number.parseInt(parameter)
      default: break;
    }
  }

  input (index) {
    const inputValue = this.inputValues.shift()
    const parameter = this.integers[index]
    this.integers[parameter] = inputValue.toString()

    return index + 1
  }

  output (index) {
    const parameter = this.integers[index]
    this.outputValue = Number.parseInt(this.integers[parameter])
  
    return index + 1
  }

  jumpIfTrue (parameterModes, index) {
    return this.jump(parameterModes, index, (value) => value !== 0)
  }

  jumpIfFalse (parameterModes, index) {
    return this.jump(parameterModes, index, (value) => value === 0)
  }

  lessThan (parameterModes, index) {
    return this.compare(parameterModes, index, (value1, value2) => value1 < value2)
  }

  equals(parameterModes, index) {
    return this.compare(parameterModes, index, (value1, value2) => value1 === value2)
  }

  jump (parameterModes, index, validateCondition) {
    const parameterModesIndex = parameterModes.length - 1
    const parameter1 = this.integers[index]
    const parameter2 = this.integers[index + 1]
    const mode1 = parameterModes[parameterModesIndex]
    const mode2 = parameterModes[parameterModesIndex - 1]
    const value1 = this.getActualValue(mode1, parameter1, this.integers)
    const value2 = this.getActualValue(mode2, parameter2, this.integers)
  
    if (validateCondition(value1)) {
      return value2
    }
  
    return index + 2
  }

  compare (parameterModes, index, validateCondition) {
    const parameterModesIndex = parameterModes.length - 1
    const parameter1 = this.integers[index]
    const parameter2 = this.integers[index + 1]
    const parameter3 = this.integers[index + 2]
    const mode1 = parameterModes[parameterModesIndex]
    const mode2 = parameterModes[parameterModesIndex - 1]
    const value1 = this.getActualValue(mode1, parameter1)
    const value2 = this.getActualValue(mode2, parameter2)
  
    if (validateCondition(value1, value2)) {
      this.integers[parameter3] = '1'
    } else {
      this.integers[parameter3] = '0'
    }
  
    return index + 3
  }
}





module.exports = AmplifiedControllerSoftware
