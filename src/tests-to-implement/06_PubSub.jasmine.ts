import { PubSub } from '../tests-to-implement/06_PubSub'
import { promisify } from 'util';

describe('PubSub', () => {

  describe('subscribe', () => {
    beforeEach(function () {
      jasmine.clock().install();
    })
  
    afterEach(function() {
      jasmine.clock().uninstall();
    })
  
    it('calls subscription callback when publish occurs on channel', async () => {
      // Arrange
      let sut = new PubSub();
      let payloadSent = "";
      sut.subscribe("channel1", (payload) => payloadSent = payload);

      // Act
      await sut.publish("channel1", "hello");
      jasmine.clock().tick(600);
      // Assert
      expect(payloadSent).toEqual("hello");
    })

    it('calls all subscription callbacks when publish occurs on channel', async () => {
      // Arrange
      let sut = new PubSub();
      let payloadsSent: String[] = [];
      sut.subscribe("channel1", (payload) => payloadsSent.push(payload));
      sut.subscribe("channel1", (payload) => payloadsSent.push(payload));
      sut.subscribe("channel1", (payload) => payloadsSent.push(payload));

      // Act
      await sut.publish("channel1", "hello");
      jasmine.clock().tick(600);
      // Assert
      expect(payloadsSent).toEqual(['hello', 'hello', 'hello']);
    })
  })

  describe('subscribe promise', () => {
    it('calls subscription callback when publish occurs on channel', async () => {
      // Arrange
      let sut = new PubSub();
      let payloadSent = "";
      let callback: (...params: any[]) => any = (s) => s;
      let callbackPromise = new Promise((resolve, reject) => {
        callback = (payload:string) => {
          payloadSent = payload;
          resolve(payloadSent);
        };
      });
     
      sut.subscribe("channel1", callback);
      // Act
      await sut.publish("channel1", "hello");

      // Assert
      await expectAsync(callbackPromise).toBeResolved();
      expect(payloadSent).toEqual("hello");
    })

    it('calls all subscription callbacks when publish occurs on channel', async () => {
      // Arrange
      let sut = new PubSub();
      let payloadsSent: string[] = [];
      let callback1: (...params: any[]) => any = (s) => s;
      let callback2: (...params: any[]) => any = (s) => s;
      let callbackPromise1 = new Promise((resolve, reject) => {
        callback1 = (payload:string) => {
          payloadsSent.push(payload);
          resolve(payload);
        };
      });
      let callbackPromise2 = new Promise((resolve, reject) => {
        callback2 = (payload:string) => {
          payloadsSent.push(payload);
          resolve(payload);
        };
      });

      sut.subscribe("channel1", callback1);
      sut.subscribe("channel1", callback2);
      // Act
      await sut.publish("channel1", "hello");

      // Assert
      await expectAsync(callbackPromise1).toBeResolved();
      await expectAsync(callbackPromise2).toBeResolved();
      expect(payloadsSent).toEqual(['hello', 'hello']);
    })
  })
})
