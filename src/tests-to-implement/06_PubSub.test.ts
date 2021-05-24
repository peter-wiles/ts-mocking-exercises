import { describe, it } from 'mocha'
import { default as sinon } from 'sinon'
import { expect } from 'chai'
import { PubSub } from '../tests-to-implement/06_PubSub'

describe('PubSub', () => {
  describe('subscribe', () => {
    it('calls subscription callback when publish occurs on channel', async () => {
      // Arrange
      const clock = sinon.useFakeTimers();
      let sut = new PubSub();
      let payloadSent = "";
      sut.subscribe("channel1", (payload) => payloadSent = payload);

      // Act
      await sut.publish("channel1", "hello");
      clock.tick(600);
      // Assert
      expect(payloadSent).eqls("hello");
    })

    it('calls all subscription callbacks when publish occurs on channel', async () => {
      // Arrange
      const clock = sinon.useFakeTimers();
      let sut = new PubSub();
      var callback1 = sinon.stub();
      var callback1WasCalled = callBackWasCalled(callback1);

      var callback2 = sinon.stub();
      var callback2WasCalled = callBackWasCalled(callback2);
      
      sut.subscribe("channel1", callback1);
      sut.subscribe("channel1", callback2);
      // Act
      await sut.publish("channel1", "hello");
      clock.tick(1000);
      
      // Assert
      await callback1WasCalled;
      expect(callback1).calledWith("hello");
      await callback2WasCalled;
      expect(callback2).calledWith("hello");
    })

    async function callBackWasCalled(callback: sinon.SinonStub) {
      return new Promise<void>((resolve => {
        callback.callsFake((payload) =>
          resolve()
        )
      })) 
    }
  })
})
