import { generateDayMessage } from '../tests-to-implement/05_fake_timers'

describe('generateDayMessage', () => {
  beforeEach(function () {
    jasmine.clock().install();
  })

  afterEach(function() {
    jasmine.clock().uninstall();
  })

  it('returns a message containing the current time', () => {
    // Arrange
    jasmine.clock().mockDate(new Date(2021, 4, 23, 16, 27, 30));
    // Act
    var result = generateDayMessage();
    // Assert
    expect(result).toContain('4:27:30 PM');
  })

  it('returns a message containing the current time after some time has elapsed', () => {
    // Arrange
    jasmine.clock().mockDate(new Date(2021, 4, 23, 16, 27, 30));
    jasmine.clock().tick(5000);
    
    // Act
    var result = generateDayMessage();
    // Assert
    expect(result).toContain('4:27:35 PM');
  })

  it('returns a message containing "Monday" on Mondays', () => {
    // Arrange
    jasmine.clock().mockDate(new Date(2021, 3, 19, 8));
    // Act
    var result = generateDayMessage();
    // Assert
    expect(result).toContain('Monday');
  })

  it('returns a message containing "Tuesday" on Tuesdays', () => {
    // Arrange
    jasmine.clock().mockDate(new Date(2021, 3, 20));
    // Act
    var result = generateDayMessage();
    // Assert
    expect(result).toContain('Tuesday');
  })

  it('returns a message containing "Wednesday" on Wednesdays', () => {
    // Arrange
    jasmine.clock().mockDate(new Date(2021, 3, 21));
    // Act
    var result = generateDayMessage();
    // Assert
    expect(result).toContain('Wednesday');
  })

  it('returns a message containing "Thursday" on Thursdays', () => {
    // Arrange
    jasmine.clock().mockDate(new Date(2021, 3, 22));
    // Act
    var result = generateDayMessage();
    // Assert
    expect(result).toContain('Thursday');
  })

  it('returns a message containing "Friday" on Fridays', () => {
    // Arrange
    jasmine.clock().mockDate(new Date(2021, 3, 23));
    // Act
    var result = generateDayMessage();
    // Assert
    expect(result).toContain('Friday');
  })

  it('returns a message containing "Saturday" on Saturdays', () => {
    // Arrange
    jasmine.clock().mockDate(new Date(2021, 3, 24));
    // Act
    var result = generateDayMessage();
    // Assert
    expect(result).toContain('Saturday');
  })

  it('returns a message containing "Sunday" on Sundays', () => {
    // Arrange
    jasmine.clock().mockDate(new Date(2021, 3, 25));
    // Act
    var result = generateDayMessage();
    // Assert
    expect(result).toContain('Sunday');
  })
})
