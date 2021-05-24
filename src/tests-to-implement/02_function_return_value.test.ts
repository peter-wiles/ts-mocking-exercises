import { describe, it } from 'mocha'
import { expect } from 'chai'
import sinon from 'sinon'
import { getAllItemsOnSale } from '../tests-to-implement/02_function_return_value'
import { Item } from "../dependencies/Item"
import * as dependencies from "../dependencies/get_all";

describe('function mock return value', () => {
  
  let createItem = (price: number): Item => {
    return {
      id: "id",
      name: "name",
      price: price,
      description: "description",
      created: new Date()
    }
  }

  describe('getAllItemsOnSale', () => {
    it('returns only prices under 10', async () => {
      // Arrange
      let includedItems = [createItem(8), createItem(9)];
      let items = [
        createItem(10),
        ...includedItems,
        createItem(12),
      ]
      sinon.stub(dependencies, 'getAll').resolves(items);
      // Act
      let result = await getAllItemsOnSale()
      // Assert
      expect(result).to.eql(includedItems);

    })
  })
})
