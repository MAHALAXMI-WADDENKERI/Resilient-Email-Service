const FAILURE_THRESHOLD = 3;
const COOLDOWN_TIME = 10000;

let failureCount = 0;
let lastFailureTime = 0;
let isOpen = false;

function recordFailure() {
  failureCount++;
  lastFailureTime = Date.now();
  if (failureCount >= FAILURE_THRESHOLD) {
    isOpen = true;
  }
}

function reset() {
  failureCount = 0;
  isOpen = false;
}

function canRequest() {
  if (!isOpen) return true;
  const now = Date.now();
  if (now - lastFailureTime > COOLDOWN_TIME) {
    reset();
    return true;
  }
  return false;
}

module.exports = {
  canRequest,
  recordFailure,
  reset,
};