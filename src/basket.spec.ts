import { Basket } from './basket';
import { IInventory, Inventory, Item } from './inventory';
import { ISaleDealManager } from './saleDealManager';

describe('Basket', () => {
  const testData = [
    { name: 'TestItem-A', price: 10.0 },
    { name: 'TestItem-B', price: 1.0 },
  ] as Item[];
  const mockedInventory: jest.Mocked<IInventory> = {
    getItem: jest.fn((itemName: string) => testData[0]),
    init: jest.fn(),
  };

  const mockedSaleDealManager: jest.Mocked<ISaleDealManager> = {
    applyDealsToItem: jest.fn((item, items, index) => item.price),
    addDeal: jest.fn(),
  };

  describe('scan()', () => {
    it('scans a valid item', () => {
      const basket = new Basket(mockedInventory, mockedSaleDealManager);

      basket.scan(testData[0].name);

      const total = basket.total();
      expect(total).toEqual(testData[0].price);
    });
    it('does not scan an invalid item', () => {
      const basket = new Basket(mockedInventory, mockedSaleDealManager);

      mockedInventory.getItem.mockReturnValueOnce(null);

      expect(() => basket.scan('InvalidItemName')).toThrow('Invalid item');
    });
  });

  describe('total()', () => {
    it('return 0 for an empty basket', () => {
      const basket = new Basket(mockedInventory, mockedSaleDealManager);

      const total = basket.total();
      expect(total).toEqual(0);
    });
    it('return correct value for an item', () => {
      const basket = new Basket(mockedInventory, mockedSaleDealManager);

      basket.scan(testData[0].name);

      const total = basket.total();
      expect(total).toEqual(testData[0].price);
    });
    it('return correct value for multiple item', () => {
      const basket = new Basket(mockedInventory, mockedSaleDealManager);

      mockedInventory.getItem.mockReturnValueOnce(testData[0]);
      basket.scan(testData[0].name);
      mockedInventory.getItem.mockReturnValueOnce(testData[1]);
      basket.scan(testData[1].name);
      mockedInventory.getItem.mockReturnValueOnce(testData[0]);
      basket.scan(testData[0].name);

      const total = basket.total();
      expect(total).toEqual(testData[0].price + testData[1].price + testData[0].price);
    });
  });
});
