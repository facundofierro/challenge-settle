export const DEFAULT_PAYLOAD = {
  method: 'post',
  url: '/rates',
  payload: {
    pairs: ['EURUSD', 'EURARS'],
  },
};

export const DEFAULT_FX_RESPONSE = {
  data: {
    success: true,
    timestamp: 1620000000,
    base: 'EUR',
    rates: { USD: 1.123, ARS: 123.45 },
  },
};

export const DEFAULT_RESPONSE = [
  {
    fee: 0.01,
    feeAmmount: 0.01,
    originalRate: 1.123,
    pair: {
      from: 'EUR',
      to: 'USD',
    },
    rate: 1.13,
  },
  {
    fee: 0.01,
    feeAmmount: 1.23,
    originalRate: 123.45,
    pair: {
      from: 'EUR',
      to: 'ARS',
    },
    rate: 124.68,
  },
];
