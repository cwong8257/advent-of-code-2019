const fs = require('fs')
const path = require('path')

const Moon = require('./Moon')
const Planet = require('./Planet')

const STEPS = 4686774924

console.log(nBodyProblem())

function nBodyProblem () {
  const inputs = fs.readFileSync(path.join(__dirname, 'input.txt')).toString().split('\n')
  const moonNames = ['Io', 'Europa', 'Ganymede', 'Callisto']
  const moons = inputs.map((input, i) => {
    const csv = input.replace(/[a-z|<|>|=|\s]/g, '')
    const [x, y, z] = csv.split(',').map(numString => Number.parseInt(numString))
    return new Moon(moonNames[i], { x, y, z })
  })

  const jupiter = new Planet('Jupiter')

  jupiter.addMoons(moons)
  
  let i
  
  for (i = 0; i < STEPS; i++) {
    jupiter.incrementStepInTime()

    if (jupiter.currentStateMatchesPreviousState()) {
      return i
    }
  }

  return 'done'
}
