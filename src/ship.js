export default function createShip(length, name) {
  let hitsRemaining = length;

  function hit() {
    hitsRemaining--;
  }

  function isSunk() {
    return hitsRemaining === 0;
  }

  return {
    length,
    hit,
    name,
    get hitsRemaining() {
      return hitsRemaining;
    },
    isSunk,
  };
}
