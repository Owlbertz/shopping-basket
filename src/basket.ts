import { IInventory } from './inventory';
import { ISaleDealManager } from './saleDealManager';

type Item = {
  name: string;
  price: number;
};

export interface IBasket {
  /**
   * Adds an item to the basket.
   * Throws if no item with the given name exists.
   *
   * @param {string} itemName Name of the item to add.
   * @memberof IBasket
   */
  scan(itemName: string): void;
  /**
   * Returns the total sum of prices for all products in the basket.
   * Applies sales deals.
   *
   * @return {*} The total price.
   * @memberof IBasket
   */
  total(): number;
}
/**
 * Class that keeps track of the items within a users basket.
 *
 * @export
 * @class Basket
 */
export class Basket {
  private items: Item[];
  private inventory: IInventory;
  private saleDealManager: ISaleDealManager;

  constructor(inventory: IInventory, saleDealManager: ISaleDealManager) {
    this.items = new Array<Item>();
    this.inventory = inventory;
    this.saleDealManager = saleDealManager;
  }

  /**
   * Adds an item to the basket.
   * Throws if no item with the given name exists.
   *
   * @param {string} itemName Name of the item to add.
   * @memberof Basket
   */
  scan(itemName: string) {
    const item = this.inventory.getItem(itemName);
    if (!item) {
      throw new Error('Invalid itemName');
    }
    this.items.push(item);
  }

  /**
   * Returns the total sum of prices for all products in the basket.
   * Applies sales deals using SaleDealManager.
   *
   * @return {*} The total price.
   * @memberof Basket
   */
  total() {
    return this.items.reduce(
      (prev, curr, index, arr) => prev + this.saleDealManager.applyDealsToItem(curr, arr, index),
      0
    );
  }
}
