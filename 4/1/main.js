


function secureContainer() {
  const LOWER_RANGE = 206938
  const UPPER_RANGE = 679128
  const possiblePasswords = []

  for (let password = LOWER_RANGE; password <= UPPER_RANGE; password++) {
    if (validatePassword(password)) {
      possiblePasswords.push(password)
    }
  }
  
  return possiblePasswords.length

  function validatePassword(password) {
    const numString = password.toString()

    return validateTwoAdjacentDigits(numString) && validateIncreasingLeftToRight(numString)
  }

  function validateTwoAdjacentDigits(numString) {
    for (let i = 0; i < numString.length - 1; i++) {
      const left = numString[i]
      const right = numString[i + 1]

      if (left === right) {
        return true
      }
    }

    return false
  }

  function validateIncreasingLeftToRight(numString) {
    for (let i = 0; i < numString.length - 1; i++) {
      const left = numString[i]
      const right = numString[i + 1]

      if (left > right) {
        return false
      }
    }

    return true
  }
}

console.log(secureContainer())