import { Inventory, InventoryFileItem } from './inventory';

const mockedItems = [['TestItem1', 10]] as InventoryFileItem[];
jest.mock('../data/inventory.json', () => mockedItems);

describe('Inventory', () => {
  describe('init()', () => {
    it('loads the inventory items', () => {
      const inventory = new Inventory();

      inventory.init();
    });
  });

  describe('getItem()', () => {
    it('throws an error when not initialized', () => {
      const inventory = new Inventory();

      expect(() => inventory.getItem('Test')).toThrow('Inventory not initialized');
    });
    it('returns the given item', () => {
      const inventory = new Inventory();
      inventory.init();

      const name = mockedItems[0][0];
      const result = inventory.getItem(name);

      expect(result?.name).toEqual(name);
    });
    it('returns null if no item is found', () => {
      const inventory = new Inventory();
      inventory.init();

      const result = inventory.getItem('InvalidName');

      expect(result).toEqual(null);
    });
  });
});
