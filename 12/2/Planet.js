class Planet {
  constructor (name) {
    this.name = name
    this.moons = []
  }

  addMoons (moons) {
    this.moons.push(...moons)
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

  currentStateMatchesPreviousState () {
    const currentState = this.getCurrentState()

    return !!this.history[currentState]
  }

  getCurrentState () {
    this.moons
  }
}

module.exports = Planet
