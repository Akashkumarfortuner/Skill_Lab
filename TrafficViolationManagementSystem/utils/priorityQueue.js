// utils/priorityQueue.js
class PriorityQueue {
  constructor() {
    this.queue = [];
  }

  enqueue(data, priority) {
    const newItem = { data, priority };
    let added = false;
    for (let i = 0; i < this.queue.length; i++) {
      if (this.queue[i].priority < priority) {
        this.queue.splice(i, 0, newItem);
        added = true;
        break;
      }
    }
    if (!added) {
      this.queue.push(newItem);
    }
  }

  dequeue() {
    return this.queue.shift(); // Removes the highest priority element
  }

  peek() {
    return this.queue[0]; // Returns the highest priority element without removing it
  }

  isEmpty() {
    return this.queue.length === 0;
  }
}

module.exports = PriorityQueue;
