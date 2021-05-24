import { describe, it } from 'mocha'
import { expect } from 'chai'
import sinon from 'sinon'
import { ItemPriceAdjusterVersion2 } from '../tests-to-implement/04_class_dependency_initialized_within_sut'
import { PricingService } from '../dependencies/PricingService'

describe('ItemPriceAdjusterVersion2', () => {
    
  let createItem = (price: number): Item => {
    return {
      id: "id",
      name: "name",
      price: price,
      description: "description",
      created: new Date()
    }
  }

  let createSut = () => {
    return new ItemPriceAdjusterVersion2();
  }

  describe('price is less than 100', () => {
    it('marks item price up by the markup percentage', async () => {
      // Arrange
      let item = createItem(30);
      let sut = createSut();
      sinon.stub(sut['pricingService'], 'getMarkUpPercentage').resolves(100);
      // Act
      let adjustedItem = await sut.adjustPrice(item);
      // Assert
      expect(adjustedItem.price).eqls(60);
    })
  })

  describe('price is greater than 100', () => {
    it('marks item price down by the markdown percentage', async () => {
      // Arrange
      let item = createItem(140);
      let sut = createSut();
      sinon.stub(sut['pricingService'], 'getMarkDownPercentage').resolves(50);
      // Act
      let adjustedItem = await sut.adjustPrice(item);
      // Assert
      expect(adjustedItem.price).eqls(70);
    })
  })

  describe('price is equal to 100', () => {
    it('will not alter the price', async () => {
      // Arrange
      let item = createItem(100);
      let sut = createSut();
      // Act
      let adjustedItem = await sut.adjustPrice(item);
      // Assert
      expect(adjustedItem.price).eqls(100);
    })
  })
})
