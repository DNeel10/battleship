import createPlayer from "./player";
import createGameBoard from "./game-board";
import createShip from "./ship";

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
    console.log("Chcking if all ships are placed");
    players.forEach((player, index) => {
      console.log(
        `player ${index + 1}: available ships`,
        player.getAvailableShips()
      );
    });
    if (players.some((player) => player.getAvailableShips().length !== 0)) {
      console.log("🚨 Phase should NOT change: Ships are still available!");
      throw new Error("All ships must be placed");
    } else {
      console.log("🚨 Phase should change: Ships are all placed!");
      changePhase();
    }
  }

  return {
    switchTurns,
    getCurrentPlayer,
    changePhase,
    getPhase,
    checkAndAdvancePhase,
  };
}
