const queue = [];

function enqueue(email) {
  queue.push(email);
}

function dequeue() {
  return queue.shift();
}

function hasNext() {
  return queue.length > 0;
}

module.exports = {
  enqueue,
  dequeue,
  hasNext,
};