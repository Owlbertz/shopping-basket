import { Basket } from './basket';
import { Inventory, Item } from './inventory';
import { SaleDealManager } from './saleDealManager';
import { BasketFactory } from './basketFactory';

describe('BasketFactory', () => {
  const testData = [
    { name: 'TestItem-A', price: 10.0 },
    { name: 'TestItem-B', price: 1.0 },
  ] as Item[];
  const mockedInventory = {
    getAllItems: jest.fn(() => testData),
    getItem: jest.fn((itemName: string) => testData[0]),
    init: jest.fn(),
  } as any as jest.Mocked<Inventory>;

  const mockedSaleDealManager = {
    applyDealToItem: jest.fn((item) => item.price),
  } as any as jest.Mocked<SaleDealManager>;

  describe('create()', () => {
    it('creates a new basket', () => {
      const basketFactory = new BasketFactory(mockedInventory, mockedSaleDealManager);

      const result = basketFactory.create();

      expect(result).toBeInstanceOf(Basket);
    });
  });
});
