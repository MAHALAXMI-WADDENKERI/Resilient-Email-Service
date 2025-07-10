# Resilient-Email-Service
Resilient Email Service A fault-tolerant email sending simulation built with JavaScript. Features include retry logic with exponential backoff, provider fallback, rate limiting, idempotency, status tracking, circuit breaker, and a basic in-memory queue — all tested and cleanly structured.


This project demonstrates how to build a fault-tolerant email sending system using JavaScript. Instead of using real email providers, it mocks two services and showcases smart handling of failures, retries, rate limits, and more — all while following clean code and SOLID principles.

---

## 🚀 Features

- 🔁 **Retry with Exponential Backoff**: Automatically retries failed requests.
- 🔄 **Fallback Provider**: Switches to another provider when one fails.
- 🛑 **Idempotency**: Prevents duplicate email sending.
- 📈 **Rate Limiting**: Max 5 emails per minute.
- 📊 **Status Tracking**: Logs success/failure of each email.
- 🧵 **Queue System**: Sequential processing of email jobs.
- ⚠️ **Circuit Breaker**: Temporarily disables failing providers.

---

## 📁 Folder Structure

```
/resilient-email-service
├── src/
│   ├── EmailService.js
│   ├── index.js                  # Entry point
│   ├── providers/                # Two mock email providers
│   └── utils/                    # Helpers: logger, rate limiter, etc.
├── tests/
│   └── EmailService.test.js      # Unit tests
├── package.json
├── .gitignore
├── README.md
```

---

## 🔧 Setup Instructions

1. **Clone the repo**
```bash
git clone https://github.com/YOUR_USERNAME/resilient-email-service.git
cd resilient-email-service
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the API server**
```bash
node src/index.js
```

4. **Run unit tests**
```bash
npm test
```

---

## 🔌 API – Send Email

**POST** `/send-email`

### 📤 Request Body

```json
{
  "id": "email1",
  "to": "test@example.com",
  "subject": "Hello",
  "body": "This is a test email"
}
```

### ✅ Sample Response

```json
{
  "status": "sent",
  "provider": "ProviderA"
}
```

---

## 🧠 Assumptions

- The `id` is used to ensure no duplicates (idempotency).
- Each provider has a 50% failure rate (simulated).
- Max 5 emails per minute can be sent.
- After 3 consecutive failures, the circuit breaker kicks in.

---

## 🧪 Test It Yourself

- ✅ Send the same `id` → should return `"duplicate"`
- ✅ Exceed 5 emails quickly → will return `"rate_limited"`
- ✅ Simulate failure → observe fallback or circuit breaker

---

## 📦 What's Included

- Clean, well-documented codebase
- Minimal external dependencies
- Unit tests
- SOLID principle structure
- Terminal-based logging and tracking

---