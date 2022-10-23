/* eslint-disable no-unused-expressions */
import {
  describe, it, beforeEach, afterEach,
} from 'mocha';
import { expect } from 'chai';
import sinon from 'sinon';
import axios from 'axios';

import { DEFAULT_RESPONSE, DEFAULT_PAYLOAD, DEFAULT_FX_RESPONSE } from './sampleData';
import app from '../src/app';

describe('Get rates test', async () => {
  beforeEach((done) => {
    app.init();
    done();
  });
  afterEach((done) => {
    app.stop().then(() => done());
  });

  it('index responds', async () => {
    const aStub = sinon.stub(axios, 'get').resolves(Promise.resolve(DEFAULT_FX_RESPONSE));

    const rates = await app.server.inject(DEFAULT_PAYLOAD);
    expect(rates?.statusCode).to.equal(200);
    expect(rates?.result).to.deep.equal(DEFAULT_RESPONSE);
    expect(aStub.calledOnce).to.be.true;
  });
});
