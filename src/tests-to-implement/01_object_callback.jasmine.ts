import { execute, Payload } from '../tests-to-implement/01_object_callback'

describe('object mock callback', () => {
  describe('execute', () => {
    
    let createPayload = (callback: (result: string) => void, amount = 10, id = "test") => {
      return {
        id: id,
        amount: amount,
        callback: callback
      }
    }

    it('calls the callback', () => {
      // Arrange
      let called = false;
      let payload = createPayload(() => { called = true });
      // Act
      execute(payload);
      // Assert
      expect(called).toBeTrue();
    })

    it('calls the callback once', () => {
      // Arrange
      let callCount = 0;
      let payload = createPayload(() => { callCount += 1 });
      // Act
      execute(payload);
      // Assert
      expect(callCount).toEqual(1);
    })

    it('calls the callback with correct value', () => {
      // Arrange
      let actual = "";
      let payload = createPayload((result: string) => { actual = result; }, 5, "Hello");
      // Act
      execute(payload);
      // Assert
      expect(actual).toEqual("50 for Hello");
    })
  })
})
