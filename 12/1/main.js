const fs = require('fs')
const path = require('path')

class Moon {
  constructor(name, position) {
    this.name = name
    this.position = position
    this.velocity = {
      x: 0,
      y: 0,
      z: 0
    }
  }

  applyVelocity () {
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
    this.position.z += this.velocity.z
  }

  calculatePotentialEnergy () {
    const { x, y, z } = this.position
    return Math.abs(x) + Math.abs(y) + Math.abs(z)
  }

  calculateKineticEnergy () {
    const { x, y, z } = this.velocity
    return Math.abs(x) + Math.abs(y) + Math.abs(z)
  }

  calculateTotalEnergy () {
    return this.calculatePotentialEnergy() * this.calculateKineticEnergy()
  }
}

const inputs = fs.readFileSync(path.join(__dirname, 'input.txt')).toString().split('\n')
const moonNames = ['Io', 'Europa', 'Ganymede', 'Callisto']
const moons = inputs.map((input, i) => {
  const csv = input.replace(/[a-z|<|>|=|\s]/g, '')
  const [x, y, z] = csv.split(',').map(numString => Number.parseInt(numString))
  return new Moon(moonNames[i], { x, y, z })
})

const STEPS = 1000

for (let i = 0; i < STEPS; i++) {
  applyGravityToAllMoons(moons)
  moons.forEach((moon) => moon.applyVelocity())
}

console.log(moons.reduce((totalEnergy, moon) => totalEnergy + moon.calculateTotalEnergy(), 0))

function applyGravityToAllMoons (moons) {
  for (let i = 0; i < moons.length - 1; i++) {
    for (let j = i + 1; j < moons.length; j++) {
      const moon1 = moons[i]
      const moon2 = moons[j]

      applyGravityBetweenTwoMoons(moon1, moon2)
    }
  }
}

function applyGravityBetweenTwoMoons (moon1, moon2) {
  if (moon1.position.x > moon2.position.x) {
    moon1.velocity.x--
    moon2.velocity.x++
  } else if (moon1.position.x < moon2.position.x) {
    moon1.velocity.x++
    moon2.velocity.x--
  }

  if (moon1.position.y > moon2.position.y) {
    moon1.velocity.y--
    moon2.velocity.y++
  } else if (moon1.position.y < moon2.position.y) {
    moon1.velocity.y++
    moon2.velocity.y--
  }

  if (moon1.position.z > moon2.position.z) {
    moon1.velocity.z--
    moon2.velocity.z++
  } else if (moon1.position.z < moon2.position.z) {
    moon1.velocity.z++
    moon2.velocity.z--
  }
}
