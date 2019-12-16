function amplifiedControllerSoftware (integers) {
  let index = 0
  let instruction = integers[index]
  
  while (instruction !== '99') {
    index = handleInstruction(instruction, integers, index + 1)
    instruction = integers[index]
  }
}

function handleInstruction(instruction, integers, index) {
  const { instructionOpcode, parameterModes } = getInstructionDetails(instruction)

  switch (instructionOpcode) {
    case '1': return add(parameterModes, integers, index)
    case '2': return multiply(parameterModes, integers, index)
    case '3': return input(integers, index)
    case '4': return output(integers, index)
    case '5': return jumpIfTrue(parameterModes, integers, index)
    case '6': return jumpIfFalse(parameterModes, integers, index)
    case '7': return lessThan(parameterModes, integers, index)
    case '8': return equals(parameterModes, integers, index)
    default: break;
  }
}

function jumpIfTrue(parameterModes, integers, index) {
  return jump(parameterModes, integers, index, (value) => value !== 0)
}

function jumpIfFalse(parameterModes, integers, index) {
  return jump(parameterModes, integers, index, (value) => value === 0)
}

function jump(parameterModes, integers, index, validateCondition) {
  const parameterModesIndex = parameterModes.length - 1
  const parameter1 = integers[index]
  const parameter2 = integers[index + 1]
  const mode1 = parameterModes[parameterModesIndex]
  const mode2 = parameterModes[parameterModesIndex - 1]
  const value1 = getActualValue(mode1, parameter1, integers)
  const value2 = getActualValue(mode2, parameter2, integers)

  if (validateCondition(value1)) {
    return value2
  }

  return index + 2
}

function lessThan(parameterModes, integers, index) {
  return compare(parameterModes, integers, index, (value1, value2) => value1 < value2)
}

function equals(parameterModes, integers, index) {
  return compare(parameterModes, integers, index, (value1, value2) => value1 === value2)
}

function compare(parameterModes, integers, index, validateCondition) {
  const parameterModesIndex = parameterModes.length - 1
  const parameter1 = integers[index]
  const parameter2 = integers[index + 1]
  const parameter3 = integers[index + 2]
  const mode1 = parameterModes[parameterModesIndex]
  const mode2 = parameterModes[parameterModesIndex - 1]
  const value1 = getActualValue(mode1, parameter1, integers)
  const value2 = getActualValue(mode2, parameter2, integers)

  if (validateCondition(value1, value2)) {
    integers[parameter3] = '1'
  } else {
    integers[parameter3] = '0'
  }

  return index + 3
}

function add(parameterModes, integers, index) {
  return handleBinaryOperation(parameterModes, integers, index, (operand1, operand2) => operand1 + operand2)
}


function multiply(parameterModes, integers, index) {
  return handleBinaryOperation(parameterModes, integers, index, (operand1, operand2) => operand1 * operand2)
}

function handleBinaryOperation(parameterModes, integers, index, operation) {
  const parameterModesIndex = parameterModes.length - 1
  const parameter1 = integers[index]
  const parameter2 = integers[index + 1]
  const parameter3 = integers[index + 2]
  const mode1 = parameterModes[parameterModesIndex]
  const mode2 = parameterModes[parameterModesIndex - 1]
  const operand1 = getActualValue(mode1, parameter1, integers)
  const operand2 = getActualValue(mode2, parameter2, integers)
  const result = operation(operand1, operand2)
  integers[parameter3] = result.toString()
  
  return index + 3
}

function input(integers, index) {
  const parameter = integers[index]
  integers[parameter] = '5'

  return index + 1
}

function output(integers, index) {
  const parameter = integers[index]
  console.log(integers[parameter])

  return index + 1
}

function getActualValue(mode = '0', parameter, integers) {
  switch (mode) {
    case '0': return Number.parseInt(integers[parameter])
    case '1': return Number.parseInt(parameter)
    default: break;
  }
}

function getInstructionDetails(instruction) {
  return {
    instructionOpcode: instruction[instruction.length - 1],
    parameterModes: instruction.substring(0, instruction.length - 2)
  }
}

module.exports = amplifiedControllerSoftware
