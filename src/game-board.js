export default function createGameBoard() {
  const board = Array.from({ length: 10 }, () => {
    return Array.from({ length: 10 }, () => null);
  });

  function isCellValid(x, y) {
    return x >= 0 && x < 10 && y >= 0 && y < 10;
  }

  function isCellEmpty(x, y) {
    return board[y][x] === null;
  }

  function canPlaceShip(ship, x, y, direction = "horizontal") {
    for (let i = 0; i < ship.length; i++) {
      const newX = direction === "horizontal" ? x + i : x;
      const newY = direction === "veritcal" ? y + i : y;

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
    if (!isCellEmpty(x, y)) {
      return (board[y][x] = "Hit!");
    } else {
      return (board[y][x] = "Miss!");
    }
  }

  return {
    getBoard: () => {
      return board;
    },
    placeShip,
    receiveAttack,
  };
}
