export function renderGameBoard(
  gameboard,
  boardContainer,
  handleCellClick,
  isPlayerBoard = false
) {
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
        if (isPlayerBoard) {
          gridCoordinate.classList.add("ship-cell");
        }
      } else if (cell === "hit") {
        gridCoordinate.classList.add("hit-cell");
        gridCoordinate.textContent = "X";
      } else if (cell === "miss") {
        gridCoordinate.classList.add("miss-cell");
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
  handleSelectShip
) {
  availableShipsContainer.innerHTML = "";

  ships.forEach((ship) => {
    const shipButton = document.createElement("button");
    shipButton.classList.add("ship-btn");
    shipButton.textContent = ship.name;
    shipButton.addEventListener("click", () => {
      handleSelectShip(ship);
    });
    availableShipsContainer.appendChild(shipButton);
  });
}
