export default function createShip(length) {
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
    get hitsRemaining() {
      return hitsRemaining;
    },
    isSunk,
  };
}
