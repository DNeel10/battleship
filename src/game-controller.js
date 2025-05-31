import createPlayer from "./player";
import createGameBoard from "./game-board";
import createShip from "./ship";
import {
  renderGameBoard,
  displayAvailableShips,
  renderAvailableShips,
} from "./display";

export default function initializeGame() {
  const board1 = createGameBoard();
  const board2 = createGameBoard();
  const ships1 = generateShips();
  const ships2 = generateShips();
  const player1 = createPlayer(board1, ships1);
  const player2 = createPlayer(board2, ships2);

  const player1ShipsContainer = document.getElementById("player1-controls");
  const player2ShipsContainer = document.getElementById("player2-controls");

  let selectedShip = null;
  let orientation = "horizontal";
  const getOrientation = () => orientation;

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

  function handleSelectShip(ship) {
    selectedShip = ship;
  }

  function createCellClickHandler(player, board, container, shipsContainer) {
    const handleCellClick = function (x, y) {
      if (!selectedShip) {
        console.log("No Selected Ship");
        return;
      }

      try {
        player.placeShip(selectedShip, x, y, orientation);
        selectedShip = null;

        renderGameBoard(board, container, handleCellClick);
        renderAvailableShips(
          player.getAvailableShips(),
          shipsContainer,
          handleSelectShip,
          orientation
        );
      } catch (error) {
        console.log(error.message);
      }
    };

    return handleCellClick;
  }

  function setup() {
    const player1Container = document.getElementById("player1-gameboard");
    const player2Container = document.getElementById("player2-gameboard");
    const orientationToggleButton =
      document.getElementById("orientation-toggle");

    orientationToggleButton.addEventListener("click", (e) => {
      e.preventDefault;
      console.log("clicked");
      orientation = orientation === "horizontal" ? "vertical" : "horizontal";
      orientationToggleButton.textContent = `Direction: ${orientation}`;
    });

    const player1Handler = createCellClickHandler(
      player1,
      board1,
      player1Container,
      player1ShipsContainer,
      getOrientation
    );

    renderGameBoard(board1, player1Container, player1Handler);
    renderAvailableShips(
      ships1,
      player1ShipsContainer,
      handleSelectShip,
      getOrientation
    );
  }

  function playGame() {
    setup();
  }

  return {
    playGame,
  };
}
