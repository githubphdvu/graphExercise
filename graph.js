class Node {
    constructor(value, adjacent = new Set()) {
        this.value = value
        this.adjacent = adjacent
    }
}
class Graph {
    constructor() {
        this.nodes = new Set()
    }
    addVertex(vertex) {
        this.nodes.add(vertex)
    }
    addVertices(vertexArray) {//Add array of verticies to our graph
        for (let vertex of vertexArray) 
            this.addVertex(vertex)
    }
    addEdge(v1, v2) {
        v1.adjacent.add(v2)
        v2.adjacent.add(v1)
    }
    removeEdge(v1, v2) {
        v1.adjacent.delete(v2)
        v2.adjacent.delete(v1)
    }
    removeVertex(vertex) {
        for (let node of this.nodes) 
            if (node.adjacent.has(vertex)) 
                node.adjacent.delete(vertex)
        this.nodes.delete(vertex)
    }
    dfs(start) {
        const visited = new Set()
        const result = []
        function traverse(vertex) {
            if (!vertex) return null
            visited.add(vertex)
            result.push(vertex.value)            
            vertex.adjacent.forEach(neighbor=>{if (!visited.has(neighbor)) return traverse(neighbor)})//visit neighbors
        }
        traverse(start)
        return result
    }
    dfsIterative(start) {
        // Create an empty stack
        const stack = [start]
        const result = []
        const visited = new Set()
        let currentVertex
        // visit node
        visited.add(start)
        // while there are still neighbors to visit
        while (stack.length) {
            currentVertex = stack.pop()
            result.push(currentVertex.value)            
            currentVertex.adjacent.forEach(neighbor => {//visit neighbors and push onto stack
                if (!visited.has(neighbor)) {
                    visited.add(neighbor)
                    stack.push(neighbor)
                }
            })
        }
        return result
    }
    bfs(start) {
        // Create an empty queue
        const queue = [start]
        const result = []
        const visited = new Set()
        let currentVertex
        // visit node
        visited.add(start)
        // While there is still remaining vertices in queue
        while (queue.length) {
            currentVertex = queue.shift()
            result.push(currentVertex.value)            
            currentVertex.adjacent.forEach(neighbor => {// visit neighbors
                if (!visited.has(neighbor)) {
                    visited.add(neighbor)
                    queue.push(neighbor)
                }
            })
        }
        return result
    }
    shortestPath(start, end) {
        if (start === end) return [start.value]
        var queue = [start]
        let visited = new Set()
        let predecessors = {}
        let path = []
        while (queue.length) {
            let currentVertex = queue.shift()
            if (currentVertex === end) {
                let stop = predecessors[end.value]
                while (stop) {
                    path.push(stop)
                    stop = predecessors[stop]
                }
                path.unshift(start.value)
                path.reverse()
                return path
            }
            visited.add(currentVertex)
            for (let vertex of currentVertex.adjacent) {
                if (!visited.has(vertex)) {
                    predecessors[vertex.value] = currentVertex.value
                    queue.push(vertex)
                }
            }
        }
    }
}
//   A
//  / \
// B   C
// |   |
// D   E
const nodeA=new Node('A')
const nodeB=new Node('B')
const nodeC=new Node('C')
const nodeD=new Node('D')
const nodeE=new Node('E')

const graph=new Graph()

graph.addVertices([nodeA,nodeB,nodeC,nodeD,nodeE])
graph.addEdge(nodeA,nodeB)
graph.addEdge(nodeA,nodeC)
graph.addEdge(nodeB,nodeD)
graph.addEdge(nodeC,nodeE)

console.log(graph.dfs(nodeA))         // [ 'A', 'B', 'D', 'C', 'E' ]
console.log(graph.dfsIterative(nodeA))// [ 'A', 'C', 'E', 'B', 'D' ]
console.log(graph.bfs(nodeA))         // [ 'A', 'B', 'C', 'D', 'E' ]

module.exports = { Graph, Node }