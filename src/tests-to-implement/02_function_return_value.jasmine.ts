import { getAllItemsOnSale } from '../tests-to-implement/02_function_return_value'
import * as dependencies from "../dependencies/get_all";
import { Item } from "../dependencies/Item"

describe('function mock return value', () => {
  describe('getAllItemsOnSale', () => {

    let createItem = (price: number): Item => {
      return {
        id: "id",
        name: "name",
        price: price,
        description: "description",
        created: new Date()
      }
    }

    it('returns only prices under 10', async () => {
      // Arrange
      let includedItems = [createItem(8), createItem(9)];
      let items = [
        createItem(10),
        ...includedItems,
        createItem(12),
      ]
      spyOn(dependencies, 'getAll').and.returnValue(Promise.resolve(items));
      // Act
      let result = await getAllItemsOnSale()
      // Assert
      expect(result).toEqual(includedItems);
    })
  })
})
