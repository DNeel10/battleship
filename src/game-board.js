export default function createGameBoard() {
  const board = Array.from({ length: 10 }, () => {
    return Array.from({ length: 10 }, () => null);
  });

  const sunkShips = [];

  function isCellValid(x, y) {
    return x >= 0 && x < 10 && y >= 0 && y < 10;
  }

  function isCellEmpty(x, y) {
    return board[y][x] === null;
  }

  function isCellAttackable(x, y) {
    if (!board[y][x]) return true;
    if (board[y][x].status === "Miss" || board[y][x].status === "Hit")
      return false;
    return true;
  }

  function getBoard() {
    return board;
  }

  function getSunkShips() {
    return sunkShips;
  }

  function canPlaceShip(ship, x, y, direction = "horizontal") {
    for (let i = 0; i < ship.length; i++) {
      const newX = direction === "horizontal" ? x + i : x;
      const newY = direction === "vertical" ? y + i : y;

      if (!isCellValid(newX, newY) || !isCellEmpty(newX, newY)) {
        return false;
      }
    }
    return true;
  }

  function placeShip(ship, x, y, direction = "horizontal") {
    if (!canPlaceShip(ship, x, y, direction)) {
      throw new Error("Invalid Placement");
    }
    for (let i = 0; i < ship.length; i++) {
      const newX = direction === "horizontal" ? x + i : x;
      const newY = direction === "vertical" ? y + i : y;
      board[newY][newX] = ship;
    }
  }

  function receiveAttack(x, y) {
    if (!isCellValid(x, y)) {
      throw new Error("Invalid Selection");
    }
    if (!isCellAttackable(x, y)) {
      throw new Error("Already Attacked");
    }

    if (!isCellEmpty(x, y)) {
      let ship = board[y][x];

      ship.hit();
      board[y][x] = { status: "Hit", ship };
      if (ship.isSunk()) {
        sunkShips.push(ship);
        return board[y][x];
      }
      return board[y][x];
    } else {
      return (board[y][x] = { status: "Miss" });
    }
  }

  return {
    getBoard,
    getSunkShips,
    placeShip,
    receiveAttack,
  };
}
