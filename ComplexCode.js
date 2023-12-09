/* Filename: ComplexCode.js

   Description: This code implements a complex and sophisticated algorithm for finding the shortest path in a weighted directed graph using the Dijkstra's algorithm.

   The algorithm works as follows:
   1. Initialize the starting vertex with distance 0 and all other vertices with distance infinity.
   2. Create a priority queue to store vertices and their distances.
   3. While the priority queue is not empty:
      a. Extract the vertex with the minimum distance from the priority queue.
      b. For each adjacent vertex, calculate the new distance as the sum of the current vertex distance and the weight of the edge.
      c. If the new distance is smaller than the current distance, update the distance and set the previous vertex.
      d. Add the vertex and its new distance to the priority queue.
   4. After the algorithm finishes, the shortest path from the starting vertex to any other vertex can be obtained by traversing the previous vertex pointers backwards.

   Note: This code assumes the graph is represented using an adjacency matrix and the vertices are numbered starting from 0.
*/

// Graph class represents the weighted directed graph
class Graph {
  constructor(numVertices) {
    this.numVertices = numVertices;
    this.adjMatrix = new Array(numVertices).fill(null).map(() => new Array(numVertices).fill(Infinity));
  }
  
  // Add directed edge with weight between two vertices
  addEdge(source, destination, weight) {
    if (source >= 0 && source < this.numVertices && destination >= 0 && destination < this.numVertices) {
      this.adjMatrix[source][destination] = weight;
    }
  }
  
  // Dijkstra's algorithm for finding the shortest path from source to all other vertices
  dijkstra(source) {
    const distance = new Array(this.numVertices).fill(Infinity);
    const visited = new Array(this.numVertices).fill(false);
    const previous = new Array(this.numVertices).fill(-1);
    
    distance[source] = 0;
    
    const priorityQueue = new PriorityQueue();
    priorityQueue.enqueue(source, 0);
    
    while (!priorityQueue.isEmpty()) {
      const { vertex: currentVertex } = priorityQueue.dequeue();
      
      visited[currentVertex] = true;
      
      for (let destination = 0; destination < this.numVertices; destination++) {
        if (!visited[destination] && this.adjMatrix[currentVertex][destination] !== Infinity) {
          const newDistance = distance[currentVertex] + this.adjMatrix[currentVertex][destination];
          
          if (newDistance < distance[destination]) {
            distance[destination] = newDistance;
            previous[destination] = currentVertex;
            priorityQueue.enqueue(destination, newDistance);
          }
        }
      }
    }
    
    return { distance, previous };
  }
}

// Priority queue data structure with enqueue and dequeue operations
class PriorityQueue {
  constructor() {
    this.items = [];
  }
  
  // Enqueue item with priority
  enqueue(item, priority) {
    const queueElement = { item, priority };
    let added = false;
    
    for (let i = 0; i < this.items.length; i++) {
      if (queueElement.priority < this.items[i].priority) {
        this.items.splice(i, 0, queueElement);
        added = true;
        break;
      }
    }
    
    if (!added) {
      this.items.push(queueElement);
    }
  }
  
  // Dequeue item with highest priority (minimum value)
  dequeue() {
    if (this.isEmpty()) {
      return null;
    }
    return this.items.shift();
  }
  
  // Check if the queue is empty
  isEmpty() {
    return this.items.length === 0;
  }
}

// Creating and using the graph
const graph = new Graph(5);
graph.addEdge(0, 1, 6);
graph.addEdge(0, 3, 1);
graph.addEdge(1, 2, 5);
graph.addEdge(1, 3, 2);
graph.addEdge(1, 4, 2);
graph.addEdge(2, 1, 1);
graph.addEdge(3, 2, 1);
graph.addEdge(3, 4, 4);
graph.addEdge(4, 0, 2);
graph.addEdge(4, 2, 8);

const sourceVertex = 0;
const { distance, previous } = graph.dijkstra(sourceVertex);

console.log(`Shortest paths from vertex ${sourceVertex}:`);
for (let vertex = 0; vertex < graph.numVertices; vertex++) {
  if (sourceVertex !== vertex) {
    let path = `${vertex}`;
    let previousVertex = previous[vertex];
    while (previousVertex !== -1) {
      path = `${previousVertex} -> ` + path;
      previousVertex = previous[previousVertex];
    }
    console.log(`Vertex ${sourceVertex} to ${vertex}: Distance: ${distance[vertex]}, Path: ${sourceVertex} -> ${path}`);
  }
}