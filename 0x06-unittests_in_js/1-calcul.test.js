const assert = require('assert');
const calculateNumber = require('./1-calcul');

describe('calculateNumber', () => {
  describe('type == "SUM"', () => {
    it('equal positive numbers', () => {
      assert.strictEqual(calculateNumber('SUM', 5.0, 5.0), 10);
    });

    it('equal positive numbers (alternate)', () => {
      assert.strictEqual(calculateNumber('SUM', 3.3, 2.7), 6);
    });

    it('equal negative numbers', () => {
      assert.strictEqual(calculateNumber('SUM', -5.0, -5.0), -10);
    });

    it('equal negative numbers (alternate)', () => {
      assert.strictEqual(calculateNumber('SUM', -3.3, -2.7), -6);
    });

    it('negative and positive numbers', () => {
      assert.strictEqual(calculateNumber('SUM', -5.0, 5.0), 0);
    });

    it('positive and negative numbers', () => {
      assert.strictEqual(calculateNumber('SUM', 5.0, -5.0), 0);
    });

    it('0 and 0', () => {
      assert.strictEqual(calculateNumber('SUM', 0.0, 0.0), 0);
    });
  });

  describe('type == "SUBTRACT"', () => {
    it('equal positive numbers', () => {
      assert.strictEqual(calculateNumber('SUBTRACT', 5.0, 5.0), 0);
    });

    it('equal positive numbers (alternate)', () => {
      assert.strictEqual(calculateNumber('SUBTRACT', 2.4, 1.7), 0);
    });

    it('equal negative numbers', () => {
      assert.strictEqual(calculateNumber('SUBTRACT', -5.0, -5.0), 0);
    });

    it('equal negative numbers (alternate)', () => {
      assert.strictEqual(calculateNumber('SUBTRACT', -2.4, -1.7), 0);
    });

    it('negative and positive numbers', () => {
      assert.strictEqual(calculateNumber('SUBTRACT', -5.0, 5.0), -10.0);
    });

    it('positive and negative numbers', () => {
      assert.strictEqual(calculateNumber('SUBTRACT', 5.0, -5.0), 10.0);
    });

    it('0 and 0', () => {
      assert.strictEqual(calculateNumber('SUBTRACT', 0.0, 0.0), 0);
    });
  });
});

