import { Item } from './inventory';
import { SaleDealManager } from './saleDealManager';

describe('SaleDealManager', () => {
  describe('applyDealsToItem()', () => {
    it('applies the given deals and returns the lower price', () => {
      const saleDealManager = new SaleDealManager();

      const testDealFn = jest.fn((item, items, index) => {
        return 999;
      });
      const testDealFn2 = jest.fn((item, items, index) => {
        return 1;
      });
      saleDealManager.addDeal('Test', testDealFn);
      saleDealManager.addDeal('Test2', testDealFn2);

      const item = {
        price: 1,
        name: 'A0001',
      } as Item;
      const item2 = {
        price: 1,
        name: 'A0001',
      } as Item;
      const item3 = {
        price: 1,
        name: 'A0001',
      } as Item;
      const items = [item, item2, item3];

      expect(saleDealManager.applyDealsToItem(item, items, 0)).toEqual(1);
      expect(testDealFn).toHaveBeenCalledWith(item, items, 0);
    });
  });
});
