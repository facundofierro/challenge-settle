import NodeCache from 'node-cache';
import { Pair, PairInfo } from '../typings';
import { getFixerRates } from '../api/fixer';
import config from '../config';

const cache = new NodeCache();

/*
* Parse pairs from string to object
* @param {string[]} pairs
* @returns {Pair[]}
* @example
* parsePairs(['EURUSD', 'EURARS'])
* // => [{ from: 'EUR', to: 'USD' }, { from: 'EUR', to: 'ARS' }]
*/
const parsePairs = (pairs: string[]) => {
  const pairsParsed = pairs.map((pair) => {
    // Split pairs names. Example 'EURUSD' to ['EUR', 'USD']
    const [from, to] = pair.match(/.{1,3}/g) || [];
    return { from, to };
  }) as Pair[];
  return pairsParsed;
};

// Applies fee, feeAmmount and rate
const applyFee = (pairInfo: PairInfo, _fee: number) => {
  const fee = _fee || config.app.defaultFee;
  const { originalRate } = pairInfo;
  if (!originalRate) return pairInfo;
  const feeAmmount = Number((originalRate * fee).toFixed(4));
  const rate = Number((originalRate + feeAmmount).toFixed(4));
  return {
    ...pairInfo, fee, feeAmmount, rate,
  };
};

// Save pairs info in cache
const savePairsInfo = (pairsInfo: PairInfo[]) => {
  console.log('Saving pairs info in cache');
  const today = (new Date()).setHours(0, 0, 0, 0).toLocaleString();
  const currentPairs = cache.get('pairsInfo') as PairInfo[];
  const pairsFromToday = currentPairs?.filter((pairInfo) => pairInfo.date === today) || [];
  const pairsToStore = pairsInfo.map((pairInfo) => ({ ...pairInfo, date: today }));
  cache.set('pairsInfo', [...pairsFromToday, ...pairsToStore]);
};

// Get rates from cache
const getRatesFromCache = (pairs: Pair[], fee: number) => {
  const today = (new Date()).setHours(0, 0, 0, 0).toLocaleString();
  const currentPairs = cache.get('pairsInfo') as PairInfo[];
  const pairsFromToday = currentPairs?.filter((pairInfo) => pairInfo.date === today) || [];
  const pairsInCache: PairInfo[] = [];
  const pairsNotInCache: Pair[] = [];
  pairs.forEach((pair) => {
    const pairInfo = pairsFromToday.find((_pairInfo) => {
      const { from, to } = pair;
      const { pair: { from: _from, to: _to } } = _pairInfo;
      return (from === _from && to === _to);
    });
    if (pairInfo) {
      pairsInCache.push(pairInfo);
    } else {
      pairsNotInCache.push(pair);
    }
  });
  console.log('Pairs in cache:', pairsInCache.length);
  console.log('Pairs not in cache:', pairsNotInCache.length);
  // apply fee to pairs in cache
  const pairsInCacheWithFee = pairsInCache.map((pairInfo) => applyFee(pairInfo, fee));
  console.log('Pairs in cache with fee:', pairsInCacheWithFee);
  return { pairsInCacheWithFee, pairsNotInCache };
};

// Main function to get rates
const getRates = async (pairs: string[], fee: number) => {
  const pairsParsed = parsePairs(pairs);
  const { pairsInCacheWithFee, pairsNotInCache } = getRatesFromCache(pairsParsed, fee);
  const pairsInfo = await getFixerRates(pairsNotInCache);
  savePairsInfo(pairsInfo);
  const pairsWithFee = pairsInfo.map((pair: PairInfo) => applyFee(pair, fee));
  console.log('pairsWithFee', pairsWithFee);
  return [...pairsInCacheWithFee, ...pairsWithFee];
};

export default getRates;
