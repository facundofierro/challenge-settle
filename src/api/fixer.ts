import axios, { AxiosRequestConfig } from 'axios';
import {
  CurrencySymbol, FixerResponse, Pair, PairInfo,
} from '../typings';
import config from '../config';

const { url, key } = config.api.fixer;

// Group base symbols and set of symbols to get rates
// To avoid multiple requests to the API
// Example input: [{ from: 'EUR', to: 'USD' }, { from: 'EUR', to: 'ARS' }]
// Example result: [{ base: 'EUR', pairs: ['USD', 'ARS'] }]
const groupFixerPairs = (pairs: Pair[]) => {
  const baseCurrencies = pairs.map((pair) => pair.from);
  const uniqueBaseCurrencies = [...new Set(baseCurrencies)];
  const fixerPairs = uniqueBaseCurrencies.map((base) => {
    const symbols = pairs
      .filter((pair) => pair.from === base)
      .map((pair) => pair.to);
    return { base, symbols };
  });
  console.log('Grouped pairs: ', fixerPairs);
  return fixerPairs;
};

// Get rates from Fixer API
// Example: [{ base: 'EUR', pairs: ['USD', 'ARS'] }]
// Example of fixer result:
// { success: true, timestamp: 1620000000, base: 'EUR',
//   rates: { USD: 1.123, ARS: 123.45 } }
export const getFixerRate = async (base: CurrencySymbol, symbols: CurrencySymbol[]) => {
  const fixerUrl = `${url}?access_key=${key}&base=${base}&symbols=${symbols.join(',')}`;
  console.log('fetch: ', fixerUrl);
  const requesConfig: AxiosRequestConfig = {
    headers: {
      'Content-Type': 'application/json',
      apikey: key,
    },
  };
  const fixerResponse = await axios.get(fixerUrl, requesConfig) as FixerResponse;
  // If the pair is not allowed, reconstruct the response with base and symbols
  if (fixerResponse.data.error?.code === 105) {
    return {
      ...fixerResponse,
      data: {
        ...fixerResponse.data,
        rates: Object.fromEntries(symbols.map((symbol) => [symbol, undefined])),
        base,
      },
    } as unknown as FixerResponse;
  }
  return fixerResponse;
};

// Convert fixer response ungrouped pairs
// Example input:
//   { base: 'EUR', pairs: ['USD', 'ARS'] }
// Example of fixer result:
//   { success: true, timestamp: 1620000000, base: 'EUR',
//     rates: { USD: 1.123, ARS: 123.45 } }
// Example of result:
//   { pair: { from: 'EUR', to: 'USD' }, originalRate: 1.123 }
//   { pair: { from: 'EUR', to: 'ARS' }, originalRate: 123.45 }
const fixerResponseToPairInfo = (fixerResponse: FixerResponse, tryReverse: boolean) => {
  const {
    base, rates, success, error,
  } = fixerResponse.data;
  // If error, return the error or inverse pairs if error.code === 105
  if (!success && tryReverse) {
    const reversedPairs = Object.entries(rates || []).map(([to]) => ({
      pair: { from: to as CurrencySymbol, to: base as CurrencySymbol },
      reversed: error?.code === 105 ? true : undefined,
    }));
    return reversedPairs as PairInfo[];
  }
  // Ungroup pairs
  const pairsInfo = Object.entries(rates || {}).map(([to, originalRate]) => {
    const pair = { from: base, to };
    return { pair, originalRate, error } as PairInfo;
  });
  return pairsInfo as PairInfo[];
};

// Process reversed pairs
const processReversedPairs = async (_pairsInfo: PairInfo[]) => {
  const resultPairsInfo = _pairsInfo.filter((pairInfo) => !pairInfo.reversed);
  const reversedPairs = _pairsInfo.filter((pairInfo) => pairInfo.reversed);
  const pairsToProcess = groupFixerPairs(reversedPairs.map((pairInfo) => pairInfo.pair));
  await Promise.all(
    pairsToProcess.map(async (pairToProcess) => {
      const response = await getFixerRate(pairToProcess.base, pairToProcess.symbols);
      const pairsInfo = fixerResponseToPairInfo(response, false);
      const reversedInfo = pairsInfo.map((pairInfo) => ({
        ...pairInfo,
        pair: { from: pairInfo.pair.to, to: pairInfo.pair.from },
        originalRate: pairInfo.originalRate ? 1 / pairInfo.originalRate : undefined,
      }));
      resultPairsInfo.push(...reversedInfo);
    }),
  );
  return resultPairsInfo;
};

// Get rates from Fixer API
export const getFixerRates = async (pairs: Pair[]) => {
  const pairsInfo:PairInfo[] = [];
  const fixerPairs = groupFixerPairs(pairs);
  await Promise.all(
    fixerPairs.map(async (fixerPair) => {
      const { base, symbols } = fixerPair;
      const response = await getFixerRate(base, symbols);
      console.log('response', response.data);
      const pairInfo = fixerResponseToPairInfo(response, true);
      pairsInfo.push(...pairInfo);
    }),
  );
  console.log('pairsInfo', pairsInfo);
  const pairsInfoWithReversed = await processReversedPairs(pairsInfo);
  console.log('pairsInfoWithReversed', pairsInfoWithReversed);
  return pairsInfoWithReversed;
};
