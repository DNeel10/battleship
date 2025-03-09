import createPlayer from "./player";
import createGameBoard from "./game-board";
import createShip from "./ship";
import { renderGameBoard, displayAvailableShips } from "./display";

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

  function generateShips() {
    return [
      createShip(5, "Carrier"),
      createShip(4, "Battleship"),
      createShip(3, "Cruiser"),
      createShip(3, "Submarine"),
      createShip(2, "Destroyer"),
    ];
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

  function playGame() {
    const player1Container = document.getElementById("player1-gameboard");
    const player2Container = document.getElementById("player2-gameboard");
    renderGameBoard(board1, player1Container);
    renderGameBoard(board2, player2Container);
  }

  return {
    switchTurns,
    getCurrentPlayer,
    changePhase,
    getPhase,
    checkAndAdvancePhase,
    playGame,
  };
}
