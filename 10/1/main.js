const fs = require('fs')
const path = require('path')

const getGreatestCommonDivisor = require('./utils/greatestCommonDivisor')

const inputString = fs.readFileSync(path.join(__dirname, 'input.txt')).toString()
const grid = inputString.split('\n').map(row => row.split(''))

// Tracks the coordinates of each asteroid and the count of all other visible asteroids at any one
// asteroid
// e.g. { '0,0': 17 }
const countCache = {}

for (let currentRow = 0; currentRow < grid.length; currentRow++) {
  for (let currentCol = 0; currentCol < grid[0].length; currentCol++) {
    const current = grid[currentRow][currentCol]

    if (!isAsteroid(current)) continue

    // Set of all trajectories at which an asteroid has already been seen
    const trajectoryCache = {}
    const encodedCoordString = encodeCoordString(currentCol, currentRow)
    countCache[encodedCoordString] = 0
    
    for (let targetRow = 0; targetRow < grid.length; targetRow++) {
      for (let targetCol = 0; targetCol < grid[0].length; targetCol++) {
        if (targetRow === currentRow && targetCol === currentCol) continue

        const target = grid[targetRow][targetCol]

        if (!isAsteroid(target)) continue

        const deltaX = targetCol - currentCol
        const deltaY = targetRow - currentRow
        const greatestCommonFactor = getGreatestCommonDivisor(deltaX, deltaY)
        const trajectory = [deltaY / greatestCommonFactor, deltaX / greatestCommonFactor]
        
        // if slope already exists 
        if (trajectoryCache[trajectory]) continue

        // put slope in trajectoryCache
        trajectoryCache[trajectory] = true
        countCache[encodedCoordString]++
      }
    }
  }
}

let highestCount = 0
let highestCountCoordString

for (const coordString in countCache) {
  const count = countCache[coordString]

  if (highestCount < count) {
    highestCount = count
    highestCountCoordString = coordString
  }
}

console.log('highestCountCoordString', highestCountCoordString)
console.log('highestCount', highestCount)

/**
 * Encodes a pair of coordinates into two comma separated values
 * 
 * @example
 * encodeCoordString(7, 9) // returns '7,9'
 * 
 * @param {Number} x x coordinate
 * @param {Number} y y coordinate
 */
function encodeCoordString (x, y) {
  return `${x},${y}`
}

function isAsteroid (cell) {
  return cell === '#'
}
