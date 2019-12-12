const fs = require('fs')
const path = require('path')

const inputs = fs.readFileSync(path.join(__dirname, 'input.txt')).toString().split(',')
let index = 0
let instruction = inputs[index]

while (instruction !== '99') {
  index = handleInstruction(instruction, inputs, index + 1)
  instruction = inputs[index]
}

function handleInstruction(instruction, inputs, index) {
  const { instructionOpcode, parameterModes } = getInstructionDetails(instruction)

  switch (instructionOpcode) {
    case '1': return add(parameterModes, inputs, index)
    case '2': return multiply(parameterModes, inputs, index)
    case '3': return input(inputs, index)
    case '4': return output(inputs, index)
    case '5': return jumpIfTrue(parameterModes, inputs, index)
    case '6': return jumpIfFalse(parameterModes, inputs, index)
    case '7': return lessThan(parameterModes, inputs, index)
    case '8': return equals(parameterModes, inputs, index)
    default: break;
  }
}

function jumpIfTrue(parameterModes, inputs, index) {
  return jump(parameterModes, inputs, index, (value) => value !== 0)
}

function jumpIfFalse(parameterModes, inputs, index) {
  return jump(parameterModes, inputs, index, (value) => value === 0)
}

function jump(parameterModes, inputs, index, validateCondition) {
  const parameterModesIndex = parameterModes.length - 1
  const parameter1 = inputs[index]
  const parameter2 = inputs[index + 1]
  const mode1 = parameterModes[parameterModesIndex]
  const mode2 = parameterModes[parameterModesIndex - 1]
  const value1 = getActualValue(mode1, parameter1, inputs)
  const value2 = getActualValue(mode2, parameter2, inputs)

  if (validateCondition(value1)) {
    return value2
  }

  return index + 2
}

function lessThan(parameterModes, inputs, index) {
  return compare(parameterModes, inputs, index, (value1, value2) => value1 < value2)
}

function equals(parameterModes, inputs, index) {
  return compare(parameterModes, inputs, index, (value1, value2) => value1 === value2)
}

function compare(parameterModes, inputs, index, validateCondition) {
  const parameterModesIndex = parameterModes.length - 1
  const parameter1 = inputs[index]
  const parameter2 = inputs[index + 1]
  const parameter3 = inputs[index + 2]
  const mode1 = parameterModes[parameterModesIndex]
  const mode2 = parameterModes[parameterModesIndex - 1]
  const value1 = getActualValue(mode1, parameter1, inputs)
  const value2 = getActualValue(mode2, parameter2, inputs)

  if (validateCondition(value1, value2)) {
    inputs[parameter3] = '1'
  } else {
    inputs[parameter3] = '0'
  }

  return index + 3
}

function add(parameterModes, inputs, index) {
  return handleBinaryOperation(parameterModes, inputs, index, (operand1, operand2) => operand1 + operand2)
}


function multiply(parameterModes, inputs, index) {
  return handleBinaryOperation(parameterModes, inputs, index, (operand1, operand2) => operand1 * operand2)
}

function handleBinaryOperation(parameterModes, inputs, index, operation) {
  const parameterModesIndex = parameterModes.length - 1
  const parameter1 = inputs[index]
  const parameter2 = inputs[index + 1]
  const parameter3 = inputs[index + 2]
  const mode1 = parameterModes[parameterModesIndex]
  const mode2 = parameterModes[parameterModesIndex - 1]
  const operand1 = getActualValue(mode1, parameter1, inputs)
  const operand2 = getActualValue(mode2, parameter2, inputs)
  const result = operation(operand1, operand2)
  inputs[parameter3] = result.toString()
  
  return index + 3
}

function input(inputs, index) {
  const parameter = inputs[index]
  inputs[parameter] = '5'

  return index + 1
}

function output(inputs, index) {
  const parameter = inputs[index]
  console.log(inputs[parameter])

  return index + 1
}

function getActualValue(mode = '0', parameter, inputs) {
  switch (mode) {
    case '0': return Number.parseInt(inputs[parameter])
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
