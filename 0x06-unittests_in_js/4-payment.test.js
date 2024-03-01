const sinon = require('sinon');
const Utils = require('./utils');
const { expect } = require('chai');
const sendPaymentRequestToApi = require('./4-payment');

describe('sendPaymentRequestToApi', () => {
  it('sendPaymentRequestToApi calls console.log with the right arguments', () => {
    const chux = sinon.spy(console);
    const test = sinon.stub(Utils, 'calculateNumber');

    test.returns(10);
    sendPaymentRequestToApi(100, 20);
    expect(test.calledWith('SUM', 100, 20)).to.be.true;
    expect(test.callCount).to.be.equal(1);
    expect(chux.log.calledWith('The total is: 10')).to.be.true;
    expect(chux.log.callCount).to.be.equal(1);
    test.restore();
    chux.log.restore();
  });
});
