import { Basket } from './basket';
import { IInventory } from './inventory';
import { ISaleDealManager } from './saleDealManager';

export class BasketFactory {
  private inventory: IInventory;
  private saleDealManager: ISaleDealManager;

  constructor(inventory: IInventory, saleDealManager: ISaleDealManager) {
    this.inventory = inventory;
    this.saleDealManager = saleDealManager;
  }

  create() {
    return new Basket(this.inventory, this.saleDealManager);
  }
}
