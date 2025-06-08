import { renderGameBoard, renderAvailableShips } from "./display";
import initializeGame from "./game-controller";

export default function createUIController(game) {
  const player1Container = document.getElementById("player1-gameboard");
  const player1ShipsContainer = document.getElementById("player1-controls");
  const orientationToggleButton = document.getElementById("orientation-toggle");

  const player2Container = document.getElementById("player2-gameboard");
  const player2ShipsContainer = document.getElementById("player2-controls");
  let player2Handler;

  let selectedShip = null;
  let orientation = "horizontal";

  const getOrientation = () => orientation;

  function handleSelectShip(ship) {
    selectedShip = ship;
  }

  function createCellClickHandler(player, board, container, shipsContainer) {
    return function handleCellClick(x, y) {
      if (!selectedShip) {
        console.log("No Selected Ship");
        return;
      }

      try {
        player.placeShip(selectedShip, x, y, orientation);
        selectedShip = null;

        renderGameBoard(board, container, handleCellClick, true);
        renderAvailableShips(
          player.getAvailableShips(),
          shipsContainer,
          handleSelectShip
        );

        const [player1, player2] = game.getPlayers();
        game.checkAndAdvancePhase([player1, player2]);

        if (game.getPhase() === "attack") {
          startAttackPhase(player1, player2);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
  }

  function startAttackPhase(player1, player2) {
    player1ShipsContainer.innerHTML = "";
    orientationToggleButton.style.display = "none";

    renderGameBoard(
      player2.getBoard(),
      player2Container,
      player2Handler,
      false
    );
  }

  function setupUI() {
    orientationToggleButton.addEventListener("click", (e) => {
      e.preventDefault;
      console.log("clicked");
      orientation = orientation === "horizontal" ? "vertical" : "horizontal";
      orientationToggleButton.textContent = `Direction: ${orientation}`;
    });

    const [player1, player2] = game.getPlayers();
    const [board1, board2] = game.getBoards();
    const player1Handler = createCellClickHandler(
      player1,
      board1,
      player1Container,
      player1ShipsContainer,
      getOrientation
    );

    renderGameBoard(board1, player1Container, player1Handler, true);
    renderAvailableShips(
      player1.getAvailableShips(),
      player1ShipsContainer,
      handleSelectShip
    );

    player2Handler = createCellClickHandler(
      player2,
      board2,
      player2Container,
      player2ShipsContainer,
      getOrientation
    );
  }

  function startGame() {
    const [player1, player2] = game.getPlayers();
    game.autoPlaceShips(player2);

    setupUI();
  }

  return { setupUI, startGame };
}
