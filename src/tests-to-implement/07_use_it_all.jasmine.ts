import { InMemoryCache } from "../dependencies/InMemoryCache"
import { ItemRepository } from "../dependencies/ItemRepository"
import { ItemProcessor } from "../tests-to-implement/07_use_it_all"
import { PubSub, PubSubChannels } from "./06_PubSub"

describe('ItemProcessor', () => {
  beforeEach(function() {
    jasmine.clock().uninstall();
  })
  afterEach(function() {
    jasmine.clock().uninstall();
  })

  let createSut = function(repo = new ItemRepository(), cache = new InMemoryCache()) {
    let sut = new ItemProcessor(cache, repo);
    return sut;
  }
  
  let createItem = function() {
    return {
      id: '1',
      name: 'testName',
      price: 10,
      description: 'description',
      created: new Date(),
    }
  }

  describe('processItems', () => {
    it('will not process items if processing is already busy', async () => {
      // Arrange
      let pubsub = PubSub.getInstance();
      let spy = spyOn(pubsub, 'publish');

      let repo = new ItemRepository();
      let item = createItem();
      spyOn(repo, 'getAll').and.returnValue([item]);
      let sut = createSut(repo);

      // Act
      let p1 = sut.processItems();
      let p2 = sut.processItems();
      let p3 = sut.processItems();
      await Promise.all([p1, p2, p3]);
      // Assert
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(PubSubChannels.itemUpdated, item);
    })

    describe('given single unprocessed item', () => {
      xit('updates the cache with the item', async () => {
        // Arrange
        // Act
        // Assert
      })

      xit('publishes an item updated message', async () => {
        // Arrange
        // Act
        // Assert
      })

      xit('does not process items that have already been processed', async () => {
        // Arrange
        // Act
        // Assert
      })
    })

    describe('given newly added unprocessed items', () => {
      it('processes all newly added items every x seconds', async () => {
        // Arrange
        jasmine.clock().install();
        let pubsub = PubSub.getInstance();
        var callback1 = jasmine.createSpy();
        var callback1WasCalledTwice = callBackWasCalledTwice(callback1);
        pubsub.subscribe(PubSubChannels.itemUpdated, callback1);
        
        let repo = new ItemRepository();
        let item1 = createItem();
        let item2 = createItem();
        spyOn(repo, 'getAll').and.returnValues([item1],[item2]);
        let sut = createSut(repo);
        // Act
        console.log("processing items")
        await sut.processItems();
        jasmine.clock().tick(6000);
        jasmine.clock().uninstall();
        console.log("clock ticked, should process  items");
        // Assert
        await callback1WasCalledTwice;
      })
    })

    async function callBackWasCalledTwice(callback: jasmine.Spy) {
      let count = 0;
      return new Promise<void>((resolve => {
        callback.and.callFake((payload) => {
          count += 1;
          console.log('callback called with ' + payload.id + '; call ' + count)
          if (count >= 2) {
            resolve();
          }
        })
      })) 
    }

    describe('given multiple unprocessed items', () => {
      xit('updates the cache with the item', async () => {
        // Arrange
        // Act
        // Assert
      })

      xit('publishes an item updated message', async () => {
        // Arrange
        // Act
        // Assert
      })
      
      xit('does not process items that have already been processed', async () => {
        // Arrange
        // Act
        // Assert
      })
    })
  })
})
