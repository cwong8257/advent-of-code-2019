const fs = require('fs')
const path = require('path')

const GraphNode = require('./GraphNode')

const orbits = fs.readFileSync(path.join(__dirname, 'input.txt')).toString().split('\n')
const cache = {}

orbits.forEach(orbit => {
  const [nodeName1, nodeName2] = parseOrbit(orbit)
  let node1 = cache[nodeName1]
  let node2 = cache[nodeName2]

  if (!node1) {
    node1 = new GraphNode(nodeName1)
    cache[nodeName1] = node1
  }

  if (!node2) {
    node2 = new GraphNode(nodeName2)
    cache[nodeName2] = node2
  }

  node1.addNeighbor(node2)
  node2.addNeighbor(node1)
})

let depth = 0
let index = 0
let currentNode = cache['YOU']
const queue = [...currentNode.neighbors]

currentNode.visited = true

let nodesLeftAtCurrentDepth = currentNode.neighbors.length
let nodesLeftAtNextDepth = 0

currentNode = queue[index]

while (currentNode.name !== 'SAN') {
  currentNode.neighbors.forEach(neighbor => {
    if (!neighbor.visited) {
      queue.push(neighbor)
      nodesLeftAtNextDepth++
    }
  })

  currentNode.visited = true
  nodesLeftAtCurrentDepth--

  if (nodesLeftAtCurrentDepth === 0) {
    nodesLeftAtCurrentDepth = nodesLeftAtNextDepth
    nodesLeftAtNextDepth = 0
    depth++
  }

  currentNode = queue[++index]
}

console.log(depth - 1)

function parseOrbit(orbit) {
  return orbit.split(')')
}
