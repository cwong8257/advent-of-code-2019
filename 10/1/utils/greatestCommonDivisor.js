/**
 * Finds the greatest common divisor between two numbers
 * @param {Number} x first number
 * @param {Number} y second number
 * @returns {Number} greatest common divisor
 */
function greatestCommonDivisor (x, y) {
  if (x < 0) return greatestCommonDivisor(-x, y)
  if (y < 0) return greatestCommonDivisor(x, -y)
  if (x === 0) return y
  if (y === 0) return x
  if (x < y) return greatestCommonDivisor(y, x)

  const remainder = x % y

  return greatestCommonDivisor(y, remainder)
}

module.exports = greatestCommonDivisor