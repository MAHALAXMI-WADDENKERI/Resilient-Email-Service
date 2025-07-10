const express = require('express');
const EmailService = require('./EmailService');

const app = express();
const service = new EmailService();
app.use(express.json());

app.post('/send-email', async (req, res) => {
  const result = await service.sendEmail(req.body);
  res.json(result);
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));

