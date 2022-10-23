import { Request, ResponseToolkit } from '@hapi/hapi';

export interface AppController{
    // eslint-disable-next-line no-unused-vars
    handler: (request: Request, response: ResponseToolkit) => Promise<any>;
    validations?: Object;
    plugins?: Object;
    options?: Object;
}

export type AppMethod = string

export type AppPath = string

export type AppRoute = [
    AppMethod,
    AppPath,
    AppController,
];

export type AppParams = {
    routes: AppRoute[]
    serverPort: number
}

export type CurrencySymbol = 'EUR' | 'USD' | 'ARS' | 'BRL';

export type CurrencyRates = {
    [key: string]: number
}

export type FixerResponse = {
    data: {
        success: boolean,
        timestamp?: number,
        base?: CurrencySymbol,
        rates?: CurrencyRates,
        error?: {
            code: number,
            type: string,
            info: string,
        },
    }
}

export type FixerPairs = {
    base: CurrencySymbol,
    pairs: CurrencySymbol[],
}

export type Pair = {
    from: CurrencySymbol,
    to: CurrencySymbol,
}

export type PairInfo = {
    pair: Pair,
    originalRate?: number,
    fee?: number,
    feeAmmount?: number,
    rate?: number,
    reversed?: boolean,
    error?: string,
    date?: string,
}
