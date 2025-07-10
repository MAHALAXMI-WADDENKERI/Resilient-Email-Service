let sentCount = 0;
const LIMIT = 5;
const WINDOW_MS = 60000;

let interval=setInterval(() => (sentCount = 0), WINDOW_MS);

module.exports = {
  allow: () => {
    if (sentCount >= LIMIT) return false;
    sentCount++;
    return true;
  },
  _clear: () => clearInterval(interval),
};