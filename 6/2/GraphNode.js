class GraphNode {
  constructor (name) {
    this.name = name
    this.visited = false
    this.neighbors = []
  }

  addNeighbor (node) {
    this.neighbors.push(node)
  }
}

module.exports = GraphNode
