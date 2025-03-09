export function renderGameBoard(gameboard, boardContainer) {
  const board = gameboard.getBoard();

  board.forEach((row, y) => {
    const gameRow = document.createElement("div");
    gameRow.classList.add("grid-row");
    boardContainer.appendChild(gameRow);
    row.forEach((cell, x) => {
      const gridCoordinate = document.createElement("button");
      gridCoordinate.textContent = "X";
      gridCoordinate.dataset.y = y;
      gridCoordinate.dataset.x = x;
      gridCoordinate.classList.add("grid-cell");
      gameRow.appendChild(gridCoordinate);
    });
  });
}

export function renderAvailableShips(ships, availableShipsContainer) {
  ships.forEach((ship) => {
    const shipName = document.createElement("p");
    shipName.textContent = ship.name;
    availableShipsContainer.appendChild(shipName);
  });
}
