const { addNestedKeysToObject } = require('./utils')

class Moon {
  constructor(name, position) {
    this.name = name
    this.position = position
    this.velocity = {
      x: 0,
      y: 0,
      z: 0
    }
    this.state = [position.x, position.y, position.z, 0, 0, 0]
    this.history = {}

    addNestedKeysToObject(this.history, this.state)
  }

  static positionMapping = {
    x: 0,
    y: 1,
    z: 2
  }

  static velocityMapping = {
    x: 3,
    y: 4,
    z: 5
  }

  applyGravity (moon) {
    if (this.position.x > moon.position.x) {
      this.changeVelocity('x', -1)
      moon.changeVelocity('x', 1)
    } else if (this.position.x < moon.position.x) {
      this.changeVelocity('x', 1)
      moon.changeVelocity('x', -1)
    }
  
    if (this.position.y > moon.position.y) {
      this.changeVelocity('y', -1)
      moon.changeVelocity('y', 1)
    } else if (this.position.y < moon.position.y) {
      this.changeVelocity('y', 1)
      moon.changeVelocity('y', -1)
    }
  
    if (this.position.z > moon.position.z) {
      this.changeVelocity('z', -1)
      moon.changeVelocity('z', 1)
    } else if (this.position.z < moon.position.z) {
      this.changeVelocity('z', 1)
      moon.changeVelocity('z', -1)
    }
  }

  applyVelocity () {
    this.changePosition('x', this.velocity.x)
    this.changePosition('y', this.velocity.y)
    this.changePosition('z', this.velocity.z)
  }

  changePosition (direction, amount) {
    this.position[direction] += amount

    this.state[Moon.positionMapping[direction]] += amount
  }

  changeVelocity (direction, amount) {
    this.velocity[direction] += amount

    this.state[Moon.velocityMapping[direction]] += amount
  }

  doesCurrentStateMatchPreviousState () {
    let history = this.history

    for (let index = 0; index < this.state.length; index++) {
      let currentAxis = this.state[index]

      if (!history[currentAxis]) {
        addNestedKeysToObject(history, this.state, index)
        return false
      }

      history = history[currentAxis]
    }

    return true
  }
}

module.exports = Moon
