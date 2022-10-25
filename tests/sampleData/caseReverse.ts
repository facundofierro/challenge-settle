import config from '../../src/config';

const sampleData = {
  PAYLOAD: {
    method: 'GET',
    url: '/rates?fee=0.1&pairs=USDEUR',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${config.server.apiKey}`,
    },
  },
  FX_RESPONSE_1: {
    data: {
      success: false,
      timestamp: 1620000000,
      error: { code: 105, type: 'base_currency_access_restricted' },
    },
  },
  FX_RESPONSE_2: {
    data: {
      success: true,
      timestamp: 1620000000,
      base: 'EUR',
      rates: { USD: 0.8904 },
    },
  },
  RESPONSE: [
    {
      fee: 0.1,
      feeAmmount: 0.1123,
      originalRate: 1.1230907457322552,
      pair: {
        from: 'USD',
        to: 'EUR',
      },
      rate: 1.2354,
      error: undefined,
    },
  ],
};

export default sampleData;
