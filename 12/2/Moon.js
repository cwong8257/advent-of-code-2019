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

  applyGravity(moon) {
    if (this.position.x > moon.position.x) {
      this.velocity.x--
      moon.velocity.x++
    } else if (this.position.x < moon.position.x) {
      this.velocity.x++
      moon.velocity.x--
    }
  
    if (this.position.y > moon.position.y) {
      this.velocity.y--
      moon.velocity.y++
    } else if (this.position.y < moon.position.y) {
      this.velocity.y++
      moon.velocity.y--
    }
  
    if (this.position.z > moon.position.z) {
      this.velocity.z--
      moon.velocity.z++
    } else if (this.position.z < moon.position.z) {
      this.velocity.z++
      moon.velocity.z--
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

module.exports = Moon
