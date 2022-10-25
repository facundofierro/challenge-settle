import config from '../../src/config';

const sampleData = {
  PAYLOAD: {
    method: 'GET',
    url: '/rates?fee=0.01&pairs=EURUSD,EURARS',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${config.server.apiKey}`,
    },
  },
  FX_RESPONSE: {
    data: {
      success: true,
      timestamp: 1620000000,
      base: 'EUR',
      rates: { USD: 1.123, ARS: 123.45 },
    },
  },
  RESPONSE: [
    {
      error: undefined,
      fee: 0.01,
      feeAmmount: 0.0112,
      originalRate: 1.123,
      pair: {
        from: 'EUR',
        to: 'USD',
      },
      rate: 1.1342,
    },
    {
      error: undefined,
      fee: 0.01,
      feeAmmount: 1.2345,
      originalRate: 123.45,
      pair: {
        from: 'EUR',
        to: 'ARS',
      },
      rate: 124.6845,
    },
  ],
};

export default sampleData;
