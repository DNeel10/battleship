export default function createPlayer(board) {
  function attack(opponent, x, y) {
    opponent.board.receiveAttack(x, y);
  }

  function placeShip(ship, x, y, direction = "horizontal") {
    board.placeShip(ship, x, y, direction);
  }

  return {
    board,
    placeShip,
    attack,
  };
}
