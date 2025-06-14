export default function createPlayer(board, ships = []) {
  let availableShips = ships;

  function attack(opponent, x, y) {
    opponent.getBoard().receiveAttack(x, y);
  }

  function placeShip(ship, x, y, direction = "horizontal") {
    board.placeShip(ship, x, y, direction);
    availableShips = availableShips.filter((el) => el.name != ship.name);
  }

  function getAvailableShips() {
    return availableShips;
  }

  function getBoard() {
    return board;
  }

  return {
    getBoard,
    placeShip,
    attack,
    getAvailableShips,
  };
}
