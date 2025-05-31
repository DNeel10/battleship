export function renderGameBoard(gameboard, boardContainer, handleCellClick) {
  const board = gameboard.getBoard();

  boardContainer.innerHTML = "";

  board.forEach((row, y) => {
    const gameRow = document.createElement("div");
    gameRow.classList.add("grid-row");
    boardContainer.appendChild(gameRow);
    row.forEach((cell, x) => {
      const gridCoordinate = document.createElement("button");
      gridCoordinate.textContent = " ";
      gridCoordinate.dataset.y = y;
      gridCoordinate.dataset.x = x;
      gridCoordinate.classList.add("grid-cell");

      const cellValue = board[y][x];

      if (
        cellValue &&
        typeof cellValue === "object" &&
        typeof cellValue.hit === "function"
      ) {
        gridCoordinate.classList.add("ship-cell");
      }
      gridCoordinate.addEventListener("click", () => {
        handleCellClick(x, y);
      });

      gameRow.appendChild(gridCoordinate);
    });
  });
}

export function renderAvailableShips(
  ships,
  availableShipsContainer,
  handleSelectShip,
  getOrientation
) {
  availableShipsContainer.innerHTML = "";

  ships.forEach((ship) => {
    const shipButton = document.createElement("button");
    shipButton.textContent = ship.name;
    shipButton.addEventListener("click", () => {
      handleSelectShip(ship);
    });
    availableShipsContainer.appendChild(shipButton);
  });
}
