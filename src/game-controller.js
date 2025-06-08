import createPlayer from "./player";
import createGameBoard from "./game-board";
import createShip from "./ship";

function generateShips() {
  return [
    createShip(5, "Carrier"),
    createShip(4, "Battleship"),
    createShip(3, "Cruiser"),
    createShip(3, "Submarine"),
    createShip(2, "Destroyer"),
  ];
}

export function autoPlaceShips(player) {
  const board = player.getBoard();
  const ships = player.getAvailableShips();
  const directions = ["horizontal", "vertical"];

  ships.forEach((ship) => {
    let placed = false;

    while (!placed) {
      const direction =
        directions[Math.floor(Math.random() * directions.length)];
      const x = Math.floor(Math.random() * 10);
      const y = Math.floor(Math.random() * 10);

      try {
        player.placeShip(ship, x, y, direction);
        placed = true;
      } catch (error) {}
    }
  });
}

export default function initializeGame() {
  const board1 = createGameBoard();
  const board2 = createGameBoard();
  const ships1 = generateShips();
  const ships2 = generateShips();
  const player1 = createPlayer(board1, ships1);
  const player2 = createPlayer(board2, ships2);

  const gameState = {
    currentPlayer: player1,
    phase: "placement",
  };

  function getPlayers() {
    return [player1, player2];
  }

  function getBoards() {
    return [board1, board2];
  }

  function switchTurns() {
    gameState.currentPlayer =
      gameState.currentPlayer === player1 ? player2 : player1;
  }

  function getCurrentPlayer() {
    return gameState.currentPlayer;
  }

  function changePhase() {
    gameState.phase = gameState.phase === "placement" ? "attack" : "placement";
  }

  function getPhase() {
    return gameState.phase;
  }

  function checkAndAdvancePhase(players) {
    if (players.some((player) => player.getAvailableShips().length !== 0)) {
      throw new Error("All ships must be placed");
    } else {
      changePhase();
    }
  }

  return {
    switchTurns,
    getCurrentPlayer,
    getPlayers,
    getBoards,
    changePhase,
    getPhase,
    checkAndAdvancePhase,
    autoPlaceShips,
  };
}
