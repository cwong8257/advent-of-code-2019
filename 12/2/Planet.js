class Planet {
  constructor (name, moons) {
    this.name = name
    this.moons = [...moons]
  }

  incrementStepInTime() {
    this.applyGravityToAllMoons()
    this.applyVelocityToAllMoons()
  }

  applyGravityToAllMoons () {
    for (let i = 0; i < this.moons.length - 1; i++) {
      for (let j = i + 1; j < this.moons.length; j++) {
        const moon1 = this.moons[i]
        const moon2 = this.moons[j]
  
        moon1.applyGravity(moon2)
      }
    }
  }

  applyVelocityToAllMoons () {
    this.moons.forEach((moon) => moon.applyVelocity())
  }

  doesCurrentStateMatchPreviousState () {
    let result = true

    for (let i = 0; i < this.moons.length; i++) {
      const moon = this.moons[i]

      if (!moon.doesCurrentStateMatchPreviousState()) {
        result = false
      }
    }

    return result
  }

  getMoonStates () {
    return this.moons.reduce((moons, { name, position, velocity }) => ({
      ...moons,
      [name]: {
        position,
        velocity
      }
    }), {})
  }
}

module.exports = Planet
