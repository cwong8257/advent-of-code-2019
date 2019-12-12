const fs = require('fs')
const path = require('path')

const Primary = require('./Primary')

const orbits = fs.readFileSync(path.join(__dirname, 'input.txt')).toString().split('\n')
const cache = {}

orbits.forEach(orbit => {
  const [primaryName, satelliteName] = parseOrbit(orbit)
  let primary = cache[primaryName]
  let satellite = cache[satelliteName]

  if (!primary) {
    primary = new Primary(primaryName)
    cache[primaryName] = primary
  }

  if (!satellite) {
    satellite = new Primary(satelliteName)
    cache[satelliteName] = satellite
  }

  primary.addSatellite(satellite)
})

let index = 0
let totalOrbits = 0
let satellitesLeftOnCurrentLevel = 1
let satellitesLeftOnNextLevel = 0
let orbitsPerSatellite = 1
const queue = [cache['COM']]
let current = queue[index]

while (current) {
  queue.push(...current.satellites)
  satellitesLeftOnCurrentLevel--
  satellitesLeftOnNextLevel += current.satellites.length
  
  if (!satellitesLeftOnCurrentLevel) {
    satellitesLeftOnCurrentLevel = satellitesLeftOnNextLevel
    satellitesLeftOnNextLevel = 0
    totalOrbits += satellitesLeftOnCurrentLevel * orbitsPerSatellite
    orbitsPerSatellite++
  }

  index++
  current = queue[index]
}

console.log(totalOrbits)

function parseOrbit(orbit) {
  return orbit.split(')')
}
