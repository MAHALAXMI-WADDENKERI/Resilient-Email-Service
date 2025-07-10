const A = require('./providers/MockProviderA');
const B = require('./providers/MockProviderB');
const { trackStatus } = require('./utils/statusTracker');
const rateLimiter = require('./utils/rateLimiter');
const logger = require('./utils/logger');
const circuitBreaker = require('./utils/circuitBreaker');
const queue = require('./utils/queue');

const sentEmails = new Set();

class EmailService {
  constructor() {
    this.providers = [A, B];
  }

  async sendEmail(email) {
    if (sentEmails.has(email.id)) return { status: 'duplicate' };
    if (!rateLimiter.allow()) return { status: 'rate_limited' };

    queue.enqueue(email);
    while (queue.hasNext()) {
      const nextEmail = queue.dequeue();

      for (let provider of this.providers) {
        if (!circuitBreaker.canRequest()) {
          logger.info(`Circuit breaker open. Skipping provider: ${provider.name}`);
          continue;
        }

        try {
          await this.retry(provider.send, nextEmail, 3);
          sentEmails.add(nextEmail.id);
          trackStatus(nextEmail.id, 'sent', provider.name);
          logger.info(`Email ${nextEmail.id} sent via ${provider.name}`);
          return { status: 'sent', provider: provider.name };
        } catch (err) {
          circuitBreaker.recordFailure();
          logger.error(`${provider.name} failed: ${err.message}`);
          trackStatus(nextEmail.id, 'failed', provider.name);
        }
      }
    }

    return { status: 'failed' };
  }

  async retry(fn, email, times) {
    let delay = 100;
    for (let i = 0; i < times; i++) {
      try {
        return await fn(email);
      } catch (err) {
        if (i === times - 1) throw err;
        logger.info(`Retrying...`);
        await new Promise((res) => setTimeout(res, delay));
        delay *= 2;
      }
    }
  }
}

module.exports = EmailService;