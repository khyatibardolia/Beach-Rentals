import objectPath from 'object-path';

export const calculateTotal = (d, selectedQty = 1, social_media) => {
  const amount = calculateDays(d);
  const qty = parseInt(selectedQty);
  const fuelCharge = (objectPath.get(d, 'fuel_charge') === '15' || objectPath.get(d, 'fuel_charge') === 15) ||
    (objectPath.get(d, 'fuel_id') === '1' || objectPath.get(d, 'fuel_id') === 1);
  const obj = {total: 0, subTotal: 0, salesTax: 0};
  if (d.type === '2' || d.type === 2) {
    obj.total = (parseFloat(amount) * qty).toFixed(2);
  } else {
    obj.total = (parseFloat(amount) + (fuelCharge ? 15.00 : 0.00)).toFixed(2);
  }
  obj.amount = parseFloat(amount);
  obj.itemTotal = parseFloat(obj.total);
  obj.subTotal += parseFloat(obj.itemTotal);
  obj.salesTax = (((obj.subTotal).toFixed(2) * objectPath.get(social_media, [0, 'value'])) / 100).toFixed(2);
  return obj;
};

const calculateDays = (item) => {
  let amount = 0;
  const days = item.totalNights;
  if(item.type === 1 || item.type === '1') {
    //Product type: Golf Cart
    if (days === 1) {
      amount = parseFloat(objectPath.get(item, 'day_price'));
    } else if (days === 2) {
      amount = parseFloat(objectPath.get(item, 'two_day_price'));
    } else if (days === 3) {
      amount = parseFloat(objectPath.get(item, 'three_day_price'));
    } else if (days === 4) {
      amount = parseFloat(objectPath.get(item, 'four_day_price'));
    } else if (days === 5) {
      amount = parseFloat(objectPath.get(item, 'five_day_price'));
    } else if (days === 6 || days === 7) {
      amount = parseFloat(objectPath.get(item, 'week_price'));
    } else if (days > 7) {
      amount = (parseFloat(objectPath.get(item, 'week_price'))) + ((days - 7) * objectPath.get(item, 'extra_price'));
    }
  } else {
    if (days === 1){
      amount = parseFloat(objectPath.get(item, 'day_price'));
    } else if (days === 2){
      amount = parseFloat(objectPath.get(item, 'two_day_price'));
    } else if (days === 3 || days === 4 || days === 5 || days === 6 || days === 7){
      amount = parseFloat(objectPath.get(item, 'week_price'));
    } else if (days > 7){
      amount = (parseFloat(objectPath.get(item, 'week_price'))) + ((days - 7) * objectPath.get(item, 'extra_price'));
    }
  }
  return amount;
};
