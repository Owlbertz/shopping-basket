import { Inventory } from './inventory';
import { SaleDealManager } from './saleDealManager';
import * as Deals from './deals';
import { BasketFactory } from './basketFactory';

const inventory = new Inventory();
inventory.init();

const saleDealManager = new SaleDealManager();
const basketFactory = new BasketFactory(inventory, saleDealManager);

// Add deals
// Comment out a deal to check how the other one behaves
saleDealManager.addDeal('Buy 1 get 1 free A0002', Deals.BuyOneGetOneFreeA0002);
saleDealManager.addDeal('10% off A0001', Deals.Get10PercentDiscountA0001);

// Shopping for user A
const basket = basketFactory.create();

basket.scan('A0002');
basket.scan('A0001');
basket.scan('A0002');

console.log(`Total: ${basket.total().toFixed(2)} €`);
