import { describe, it } from 'mocha'
import { expect } from 'chai'
import sinon from 'sinon'
import { execute } from '../tests-to-implement/01_object_callback'

describe('object mock callback', () => {
  let createPayload = (amount = 10, id = "test") => {
    return {
      id: id,
      amount: amount,
      callback: (result: string) => {}
    }
  }

  describe('execute', () => {
    it('calls the callback', () => {
      // Arrange
      let payload = createPayload();
      let spy = sinon.spy(payload, 'callback');
      // Act
      execute(payload);
      // Assert
      expect(spy).called;
    })

    it('calls the callback once', () => {
      // Arrange
      let payload = createPayload();
      let spy = sinon.spy(payload, 'callback');
      // Act
      execute(payload);
      // Assert
      expect(spy).calledOnce;
    })

    it('calls the callback with correct value', () => {
      // Arrange
      let payload = createPayload(10, 'abcd');
      let spy = sinon.spy(payload, 'callback');
      // Act
      execute(payload);
      // Assert
      expect(spy).calledWith('100 for abcd');
    })
  })
})
