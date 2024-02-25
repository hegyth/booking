export function totalPrice(checkIn, checkOut, price) {
  const differenc = Math.abs(new Date(checkIn) - new Date(checkOut));
  const days = differenc / 86400000;
  const total = days * price;
  return total;
}
