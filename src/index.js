import initializeGame from "./game-controller";
import createUIController from "./ui-controller";
import "./style.css";

const game = initializeGame();
const ui = createUIController(game);

ui.startGame();
