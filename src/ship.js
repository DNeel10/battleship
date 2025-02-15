export default function createShip(length) {
  let hitsRemaining = length;

  function hit() {
    hitsRemaining--;
  }

  function isSunk() {
    return hitsRemaining === 0;
  }

  return {
    hit,
    get hitsRemaining() {
      return hitsRemaining;
    },
    isSunk,
  };
}
