class Primary {
  constructor (name) {
    this.name = name
    this.satellites = []
  }

  addSatellite (satellite) {
    this.satellites.push(satellite)
  }
}

module.exports = Primary
