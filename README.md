# Baskets and discounts

This is my solution for the [Shopping Basket Coding Challenge](https://gist.github.com/N3mezis/e058340930a385d4d4aac513cd0f1c1a).

## Commands

- `npm start` to run the calculations based on `src/index.ts`
- `npm test` to run the tests

## API
See `src/index.ts` for the usage.
Run with `npm start`.

### Create a new basket
```ts
const basket = new Basket(inventory, saleDealManager);
```

### Add items to the basket
```ts
basket.scan('A0002');
```

### Get total
```
console.log(`Total User B: ${basketUserB.total().toFixed(2)} €`);
```

### Add discounts
Discounts can be added dynamically by providing functions that determine the discounted price of the given item.
Discounts do not stack. Only the lowest resulting price from any of the active discounts will be used.

```ts
saleDealManager.addDeal('Everything now is 1 €', (item, items, index) => {
    return 1;
});
```
- `item` is the item that is currently being evaluated.
- `items` is the list of all items in the basket.
- `index` is the position of the current item within the list of items