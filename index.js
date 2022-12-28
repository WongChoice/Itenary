class PriorityQueue {
    constructor(comparisonFn) {
      this.heap = [];
      this.comparisonFn = comparisonFn;
    }
  
    enqueue(element) {
      this.heap.push(element);
      this.siftUp();
    }
  
    dequeue() {
      if (this.heap.length <= 1) {
        return this.heap.pop();
      }
      const result = this.heap[0];
      this.heap[0] = this.heap.pop();
      this.siftDown();
      return result;
    }
  
    siftUp() {
      let index = this.heap.length - 1;
      while (index > 0) {
        const parentIndex = Math.floor((index - 1) / 2);
        if (this.comparisonFn(this.heap[index], this.heap[parentIndex]) < 0) {
          [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
          index = parentIndex;
        } else {
          break;
        }
      }
    }
  
    siftDown() {
      let index = 0;
      while (index < this.heap.length) {
        const leftChildIndex = 2 * index + 1;
        const rightChildIndex = 2 * index + 2;
        let minIndex = index;
        if (leftChildIndex < this.heap.length && this.comparisonFn(this.heap[leftChildIndex], this.heap[minIndex]) < 0) {
          minIndex = leftChildIndex;
        }
        if (rightChildIndex < this.heap.length && this.comparisonFn(this.heap[rightChildIndex], this.heap[minIndex]) < 0) {
          minIndex = rightChildIndex;
        }
        if (minIndex !== index) {
          [this.heap[index], this.heap[minIndex]] = [this.heap[minIndex], this.heap[index]];
          index = minIndex;
        } else {
          break;
        }
      }
    }
  }
  



function shortestPath(start, end, graph) {
    // Set up distances object, with start node having distance 0 and all other nodes having infinite distance
    const distances = {};
    for (const node of Object.keys(graph)) {
      distances[node] = node === start ? 0 : Infinity;
    }
  
    // Set up unvisited set
    const unvisited = new Set(Object.keys(graph));
  
    // Set up previous node tracking
    const previous = {};
  
    // Set up the priority queue
    const pq = new PriorityQueue((a, b) => distances[a] < distances[b]);
    pq.enqueue(start);
  
    // While there are still unvisited nodes
    while (unvisited.size > 0) {
      // Get the node with the smallest distance
      const current = pq.dequeue();
  
      // If we have reached the end node, return the path
      if (current === end) {
        return reconstructPath(previous, end);
      }
  
      // Mark the current node as visited
      unvisited.delete(current);
  
      // Update the distances of the current node's neighbors
      for (const neighbor of Object.keys(graph[current])) {
        const distance = distances[current] + graph[current][neighbor];
        if (distance < distances[neighbor]) {
          distances[neighbor] = distance;
          previous[neighbor] = current;
          pq.enqueue(neighbor);
        }
      }
    }
  
    // If we have exhausted the graph without finding the end node, there is no path
    return null;
  }
  
  function reconstructPath(previous, end) {
    const path = [end];
    let current = end;
    while (current in previous) {
      path.unshift(previous[current]);
      current = previous[current];
    }
    return path;
  }
  
  // Example usage
  const graph = {
    'a': { 'b': 1, 'c': 4 },
    'b': { 'c': 2, 'd': 5 },
    'c': { 'd': 1 },
    'd': {}
  };
  console.log(shortestPath('a', 'd', graph)); // ['a', 'b', 'c', 'd']
  