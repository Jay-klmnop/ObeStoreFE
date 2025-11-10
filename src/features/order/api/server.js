import express from 'express';
import got from 'got';
import { Buffer } from 'node:buffer';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/confirm', async (req, res) => {
  const { paymentKey, orderId, amount } = req.body;

  const widgetSecretKey = 'test_gsk_docs_OaPz8L5KdmQXkzRz3y47BMw6';
  const encryptedSecretKey = 'Basic ' + Buffer.from(widgetSecretKey + ':').toString('base64');

  try {
    const response = await got.post('https://api.tosspayments.com/v1/payments/confirm', {
      headers: {
        Authorization: encryptedSecretKey,
        'Content-Type': 'application/json',
      },
      json: { orderId, amount, paymentKey },
      responseType: 'json',
    });

    console.log(response.body);
    res.status(response.statusCode).json(response.body);
  } catch (error) {
    console.log(error.response?.body);
    res.status(error.response?.statusCode || 500).json(error.response?.body || {});
  }
});

app.listen(4242, () => console.log(`✅ 서버 실행 중: http://localhost:4242`));
