class AmplifiedControllerSoftware {
  constructor (integers) {
    this.integers = integers
    this.inputValuesIndex = 0
    this.inputValues = []
    this.outputValue = null
  }

  static getInstructionDetails(instruction) {
    return {
      instructionOpcode: instruction[instruction.length - 1],
      parameterModes: instruction.substring(0, instruction.length - 2)
    }
  }

  calculateOutput (inputValues) {
    this.inputValues = inputValues
    let index = 0
    let instruction = this.integers[index]
    
    while (instruction !== '99') {
      index = this.handleInstruction(instruction, index + 1)
      instruction = this.integers[index]
    }

    this.inputValuesIndex = 0
        
    return this.outputValue
  }

  handleInstruction (instruction, index) {
    const { instructionOpcode, parameterModes } = AmplifiedControllerSoftware.getInstructionDetails(instruction)
  
    switch (instructionOpcode) {
      case '1': return this.add(parameterModes, index)
      case '2': return this.multiply(parameterModes, index)
      case '3': return this.input(index)
      case '4': return this.output(index)
      case '5': return this.jumpIfTrue(parameterModes, index)
      case '6': return this.jumpIfFalse(parameterModes, index)
      case '7': return this.lessThan(parameterModes, index)
      case '8': return this.equals(parameterModes, index)
      default: break;
    }
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
    const inputValue = this.inputValues[this.inputValuesIndex]
    const parameter = this.integers[index]
    this.integers[parameter] = inputValue.toString()

    this.inputValuesIndex++
  
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
