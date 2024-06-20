import * as Deals from './deals';
import { Item } from './inventory';

describe('Deals', () => {
  describe('BuyOneGetOneFreeA0001()', () => {
    it('gives no discount if item is not A0002', () => {
      const dealFn = Deals.BuyOneGetOneFreeA0002;
      const item = {
        price: 1,
        name: 'AnotherProduct',
      } as Item;
      const items = [item];

      expect(dealFn(item, items, 0)).toEqual(item.price);
    });
    it('gives no discount if only one item A0002 is present', () => {
      const dealFn = Deals.BuyOneGetOneFreeA0002;
      const item = {
        price: 1,
        name: 'A0002',
      } as Item;
      const items = [item];

      expect(dealFn(item, items, 0)).toEqual(item.price);
    });
    it('gives discount if two items A0002 are present', () => {
      const dealFn = Deals.BuyOneGetOneFreeA0002;
      const item = {
        price: 1,
        name: 'A0002',
      } as Item;
      const item2 = {
        price: 1,
        name: 'A0002',
      } as Item;
      const items = [item, item2];

      expect(dealFn(item2, items, 1)).toEqual(0);
    });
    it('gives discount if multiple items A0002 are present', () => {
      const dealFn = Deals.BuyOneGetOneFreeA0002;
      const item = {
        price: 1,
        name: 'A0002',
      } as Item;
      const item2 = {
        price: 1,
        name: 'A0002',
      } as Item;
      const item3 = {
        price: 1,
        name: 'AnotherProduct',
      } as Item;
      const item4 = {
        price: 1,
        name: 'A0002',
      } as Item;
      const items = [item, item2, item3, item4];

      expect(dealFn(item, items, 0)).toEqual(item.price);
      expect(dealFn(item2, items, 1)).toEqual(0);
      expect(dealFn(item3, items, 2)).toEqual(item3.price);
      expect(dealFn(item4, items, 3)).toEqual(item4.price);
    });
  });

  describe('Get10PercentDiscountA0001()', () => {
    it('gives no discount if item is not A0001', () => {
      const dealFn = Deals.Get10PercentDiscountA0001;
      const item = {
        price: 1,
        name: 'AnotherProduct',
      } as Item;
      const items = [item];

      expect(dealFn(item, items, 0)).toEqual(item.price);
    });
    it('gives discount if item is A0001', () => {
      const dealFn = Deals.Get10PercentDiscountA0001;
      const item = {
        price: 1,
        name: 'A0001',
      } as Item;
      const items = [item];

      expect(dealFn(item, items, 0)).toEqual(item.price * 0.9);
    });
    it('gives discount if multiple items A0001 are present', () => {
      const dealFn = Deals.Get10PercentDiscountA0001;
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
        name: 'AnotherProduct',
      } as Item;
      const item4 = {
        price: 1,
        name: 'A0001',
      } as Item;
      const items = [item, item2, item3, item4];

      expect(dealFn(item, items, 0)).toEqual(item.price * 0.9);
      expect(dealFn(item2, items, 1)).toEqual(item2.price * 0.9);
      expect(dealFn(item3, items, 2)).toEqual(item3.price);
      expect(dealFn(item4, items, 3)).toEqual(item4.price * 0.9);
    });
  });
});
