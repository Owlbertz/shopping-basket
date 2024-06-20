import { DealFn } from './saleDealManager';

export const BuyOneGetOneFreeA0002: DealFn = (item, items, index) => {
  if (item.name !== 'A0002') {
    return item.price;
  }

  const indices = items.map((i, idx) => (i.name === 'A0002' ? idx : null)).filter((i) => i !== null);

  let isFree = false;

  for (let i = 0; i <= index; i++) {
    const position = indices.findIndex((idx) => idx === index);
    if (position % 2 === 1) {
      isFree = true;
      break;
    }
  }

  if (isFree) {
    return 0;
  }
  return item.price;
};

export const Get10PercentDiscountA0001: DealFn = (item, items, index) => {
  if (item.name !== 'A0001') {
    return item.price;
  }

  return item.price * 0.9;
};
