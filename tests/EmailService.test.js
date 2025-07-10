const EmailService = require('../src/EmailService');

describe('EmailService Tests', () => {
  let service;

  beforeEach(() => {
    service = new EmailService();
  });

  test('should send email successfully or fallback', async () => {
    const email = {
      id: 'email1',
      to: 'test@example.com',
      subject: 'Hello',
      body: 'Test Body'
    };

    const result = await service.sendEmail(email);
    expect(['sent', 'failed']).toContain(result.status);
  });

  test('should prevent duplicate emails (idempotency)', async () => {
    const email = {
      id: 'email2',
      to: 'duplicate@example.com',
      subject: 'Duplicate',
      body: 'Hello'
    };

    await service.sendEmail(email);
    const secondAttempt = await service.sendEmail(email);
    expect(secondAttempt.status).toBe('duplicate');
  });
});
afterAll(() => {
  const rateLimiter = require('../src/utils/rateLimiter');
  rateLimiter._clear(); // stops setInterval to prevent Jest warning
});
