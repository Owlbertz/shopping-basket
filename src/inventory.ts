export type Item = {
  name: string;
  price: number;
};

export type InventoryFileItem = [string, number];

export interface IInventory {
  /**
   * Initializes the inventory.
   *
   * @memberof IInventory
   */
  init(): void;

  /**
   * Returns the item with the given name.
   * Null if no item is found.
   *
   * @param {string} itemName Name of the item to look for.
   * @return {*} The item with the given name, null if not found.
   * @memberof IInventory
   */
  getItem(itemName: string): Item | null;
}

/**
 * Class to keep track of the inventory.
 *
 * @export
 * @class Inventory
 */
export class Inventory implements IInventory {
  private items?: Item[];

  /**
   * Initializes the inventory and loads the items.
   *
   * @memberof Inventory
   */
  init() {
    this.items = this.loadItems();
  }

  /**
   * Returns the item with the given name.
   * Null if no item is found.
   *
   * @param {string} itemName Name of the item to look for.
   * @return {*} The item with the given name, null if not found.
   * @memberof Inventory
   */
  getItem(itemName: string) {
    const item = this.getAllItems().find((item) => item.name === itemName);

    if (!item) {
      return null;
    }

    return item;
  }

  /**
   * Returns all items.
   *
   * @private
   * @return {*}
   * @memberof Inventory
   */
  private getAllItems() {
    if (!this.items) {
      throw new Error('Inventory not initialized');
    }

    return this.items;
  }

  /**
   * Loades the items from the file.
   *
   * @private
   * @return {*}  {Item[]}
   * @memberof Inventory
   */
  private loadItems(): Item[] {
    // TODO: Could be more sophisticated by making it configurable, allowing other sources like databases, etc.
    const fileItems = require('../data/inventory.json') as InventoryFileItem[];
    return fileItems.map((fileItem) => ({ name: fileItem[0], price: fileItem[1] }) as Item);
  }
}
