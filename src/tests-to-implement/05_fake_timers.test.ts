import { describe, it, beforeEach, afterEach } from 'mocha'
import { expect } from 'chai'
import sinon from 'sinon'
import { generateDayMessage } from '../tests-to-implement/05_fake_timers'

describe('generateDayMessage', () => {

  it('returns a message containing the current time', () => {
    // Arrange
    const clock = sinon.useFakeTimers();
    clock.setSystemTime(new Date(2021, 4, 23, 16, 27, 30));
    // Act
    var result = generateDayMessage();
    // Assert
    expect(result).contains('4:27:30 PM');
  })

  it('returns a message containing the current time after some time has elapsed', () => {
    // Arrange
    const clock = sinon.useFakeTimers();
    clock.setSystemTime(new Date(2021, 4, 23, 16, 27, 30));
    clock.tick(5000)
    // Act
    var result = generateDayMessage();
    // Assert
    expect(result).contains('4:27:35 PM');
  })

  it('returns a message containing "Monday" on Mondays', () => {
    // Arrange
    const clock = sinon.useFakeTimers();
    clock.setSystemTime(new Date(2021, 3, 19, 8));
    // Act
    var result = generateDayMessage();
    // Assert
    expect(result).contains('Monday');
  })

  it('returns a message containing "Tuesday" on Tuesdays', () => {
    // Arrange
    const clock = sinon.useFakeTimers();
    clock.setSystemTime(new Date(2021, 3, 20, 8));
    // Act
    var result = generateDayMessage();
    // Assert
    expect(result).contains('Tuesday');
  })

  it('returns a message containing "Wednesday" on Wednesdays', () => {
    // Arrange
    const clock = sinon.useFakeTimers();
    clock.setSystemTime(new Date(2021, 3, 21, 8));
    // Act
    var result = generateDayMessage();
    // Assert
    expect(result).contains('Wednesday');
  })

  it('returns a message containing "Thursday" on Thursdays', () => {
    // Arrange
    const clock = sinon.useFakeTimers();
    clock.setSystemTime(new Date(2021, 3, 22, 8));
    // Act
    var result = generateDayMessage();
    // Assert
    expect(result).contains('Thursday');
  })

  it('returns a message containing "Friday" on Fridays', () => {
    // Arrange
    const clock = sinon.useFakeTimers();
    clock.setSystemTime(new Date(2021, 3, 23, 8));
    // Act
    var result = generateDayMessage();
    // Assert
    expect(result).contains('Friday');
  })

  it('returns a message containing "Saturday" on Saturdays', () => {
    // Arrange
    const clock = sinon.useFakeTimers();
    clock.setSystemTime(new Date(2021, 3, 24, 8));
    // Act
    var result = generateDayMessage();
    // Assert
    expect(result).contains('Saturday');
  })

  it('returns a message containing "Sunday" on Sundays', () => {
    // Arrange
    const clock = sinon.useFakeTimers();
    clock.setSystemTime(new Date(2021, 3, 25, 8));
    // Act
    var result = generateDayMessage();
    // Assert
    expect(result).contains('Sunday');
  })
})
