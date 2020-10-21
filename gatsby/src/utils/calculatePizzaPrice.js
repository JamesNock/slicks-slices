const sizes = {
  S: 0.8,
  M: 1,
  L: 1.2,
};

export default function calculatePizzaPrice(cents, size) {
  return cents * sizes[size];
}
