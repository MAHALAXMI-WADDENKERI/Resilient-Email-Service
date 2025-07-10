const log = {};

function trackStatus(id, status, provider) {
  log[id] = { status, provider, time: new Date() };
  console.log(`[${id}] ${status} via ${provider}`);
}

module.exports = { trackStatus, log };
