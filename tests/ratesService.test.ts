/* eslint-disable no-unused-expressions */
import {
  describe, it, beforeEach, afterEach,
} from 'mocha';
import { expect } from 'chai';
import sinon from 'sinon';
import axios from 'axios';

import SAMPLE_BASE_EUR from './sampleData/caseBaseEUR';
import SAMPLE_REVERSE from './sampleData/caseReverse';
import app from '../src/app';

describe('Get rates test', async () => {
  beforeEach((done) => {
    app.init();
    app.registerRoutes();
    done();
  });
  afterEach((done) => {
    sinon.restore();
    app.stop().then(() => done());
  });

  it('returns rates', async () => {
    const { PAYLOAD, FX_RESPONSE, RESPONSE } = SAMPLE_BASE_EUR;

    const aStub = sinon.stub(axios, 'get').resolves(Promise.resolve(FX_RESPONSE));

    const rates = await app.server.inject(PAYLOAD);

    expect(rates?.statusCode).to.equal(200);
    expect(rates?.result).to.deep.equal(RESPONSE);
    expect(aStub.calledOnce).to.be.true;
  });

  it('returns reverses currencies', async () => {
    const {
      PAYLOAD, FX_RESPONSE_1, FX_RESPONSE_2, RESPONSE,
    } = SAMPLE_REVERSE;

    sinon.stub(axios, 'get')
      .onFirstCall()
      .resolves(Promise.resolve(FX_RESPONSE_1))
      .onSecondCall()
      .resolves(Promise.resolve(FX_RESPONSE_2));

    const rates = await app.server.inject(PAYLOAD);
    expect(rates?.result).to.deep.equal(RESPONSE);
    expect(rates?.statusCode).to.equal(200);
  });
});
