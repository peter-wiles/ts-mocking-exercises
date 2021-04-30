import { ItemPriceAdjuster } from '../tests-to-implement/03_class_dependency_injected_into_sut'
import { Item } from "../dependencies/Item"
import { PricingService } from '../dependencies/PricingService'

describe('ItemPriceAdjuster', () => {
  
  let createItem = (price: number): Item => {
    return {
      id: "id",
      name: "name",
      price: price,
      description: "description",
      created: new Date()
    }
  }

  let createSut = (pricingService: PricingService = new PricingService()) => {
    return new ItemPriceAdjuster(pricingService);
  }

  describe('price is less than 100', () => {
    it('marks item price up by the markup percentage', async () => {
      // Arrange
      let item = createItem(99);
      let pricingService = new PricingService();
      spyOn(pricingService, 'getMarkUpPercentage').and.resolveTo(100);
      let sut = createSut(pricingService);
      // Act
      let adjustedItem = await sut.adjustPrice(item);
      // Assert
      expect(adjustedItem.price).toEqual(198);
    })
  })

  describe('price is greater than 100', () => {
    it('marks item price down by the markdown percentage', async () => {
      // Arrange
      let item = createItem(102);
      let pricingService = new PricingService();
      spyOn(pricingService, 'getMarkDownPercentage').and.resolveTo(50);
      let sut = createSut(pricingService);
      // Act
      let adjustedItem = await sut.adjustPrice(item);
      // Assert
      expect(adjustedItem.price).toEqual(51);
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
      expect(adjustedItem.price).toEqual(100);
    })
  })
})
