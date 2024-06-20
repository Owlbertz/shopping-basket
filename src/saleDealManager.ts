import { Item } from './inventory';

export type DealFn = (item: Item, items: Item[], index: number) => number;

export interface ISaleDealManager {
  /**
   * Adds a deal that will be considered in `applyDealsToItem`.
   *
   * @param {string} name Name of the deal.
   * @param {DealFn} dealFn The function that defines the deal.
   * @memberof SaleDealManager
   */
  addDeal(name: string, dealFn: DealFn): void;

  /**
   * Applies the active sales deals to the given item's price.
   * Applies the lowest possible price achieved by applying every discount on its own.
   * Discounts do not stack.
   *
   * @param {Item} item Item to apply deal to.
   * @param {Item[]} allItems List of all items in the basket.
   * @param {number} index Position of the current item within the list of items.
   * @return {*} The discounted price.
   * @memberof SaleDealManager
   */
  applyDealsToItem(item: Item, allItems: Item[], index: number): number;
}

/**
 * Class that manages the active sales deeals.
 *
 * @export
 * @class SaleDealManager
 */
export class SaleDealManager implements ISaleDealManager {
  private deals: Map<string, DealFn>;

  constructor() {
    this.deals = new Map<string, DealFn>();
  }

  /**
   * Adds a deal that will be considered in `applyDealsToItem`.
   *
   * @param {string} name Name of the deal.
   * @param {DealFn} dealFn The function that defines the deal.
   * @memberof SaleDealManager
   */
  addDeal(name: string, dealFn: DealFn) {
    this.deals.set(name, dealFn);
  }

  /**
   * Applies the active sales deals to the given item's price.
   * Applies the lowest possible price achieved by applying every discount on its own.
   * Discounts do not stack.
   *
   * @param {Item} item Item to apply deal to.
   * @param {Item[]} allItems List of all items in the basket.
   * @param {number} index Position of the current item within the list of items.
   * @return {*} The discounted price.
   * @memberof SaleDealManager
   */
  applyDealsToItem(item: Item, allItems: Item[], index: number) {
    let discountedPrices = new Array<number>();
    this.deals.forEach((dealFn) => {
      discountedPrices.push(dealFn(item, allItems, index));
    });

    return Math.min(...discountedPrices);
  }
}
