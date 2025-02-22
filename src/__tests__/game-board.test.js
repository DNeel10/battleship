import createGameBoard from "../game-board";
import createShip from "../ship";

describe("gameBoard module", () => {
  let game;
  beforeEach(() => {
    game = createGameBoard();
  });
  describe("board creation", () => {
    test("all gameboard cells are null when first initiated", () => {
      const board = game.getBoard();
      const allNull = board.every((row) => row.every((cell) => cell === null));
      expect(allNull).toBe(true);
    });
  });
  describe("place ships", () => {
    test("ships with length 1 can be placed on the game board", () => {
      const ship = createShip(1);
      const board = game.getBoard();
      game.placeShip(ship, 0, 0);
      expect(board[0][0]).not.toBe(null);
    });
    test("ships with length 1 only take up one space on the board", () => {
      const ship = createShip(1);
      const board = game.getBoard();
      game.placeShip(ship, 0, 0);
      expect(board[0][0]).not.toBe(null);
      expect(board[0][1]).toBe(null);
    });
    test("ships with length 2 can be placed on the game board", () => {
      const ship = createShip(2);
      const board = game.getBoard();
      game.placeShip(ship, 0, 0);
      expect(board[0][0]).not.toBe(null);
      expect(board[0][1]).not.toBe(null);
    });
    test("ships can be placed in coordinates throughout the board", () => {
      const ship = createShip(2);
      const board = game.getBoard();
      game.placeShip(ship, 2, 2);
      expect(board[2][2]).not.toBe(null);
      expect(board[2][3]).not.toBe(null);
    });
    test("ships cannot be placed outside the bounds of the gameBoard", () => {
      const ship = createShip(3);
      expect(() => game.placeShip(ship, 9, 9)).toThrow("Invalid Placement");
    });
    test("ships can be placed vertically on the gameboard", () => {
      const ship = createShip(2);
      const board = game.getBoard();
      game.placeShip(ship, 0, 0, "vertical");
      expect(board[0][0]).not.toBe(null);
      expect(board[1][0]).not.toBe(null);
      expect(board[2][0]).toBe(null);
    });
    test("ships cannot be placed where a ship already is", () => {
      const ship = createShip(2);
      const ship2 = createShip(2);
      game.placeShip(ship, 0, 0, "horizontal");
      expect(() => game.placeShip(ship, 0, 0)).toThrow("Invalid Placement");
    });
  });
  describe("receive attack function", () => {
    test("the board can receive an attack at a location", () => {
      expect(game.receiveAttack(0, 0)).toBeDefined;
    });
    test("the board can report a miss", () => {
      const board = game.getBoard();
      game.receiveAttack(0, 0);
      // expect(game.receiveAttack(0, 0)).toEqual({ status: "Miss" });
      expect(board[0][0].status).toEqual("Miss");
    });
    test("the board can report a hit", () => {
      const ship = createShip(2);

      game.placeShip(ship, 1, 1);
      expect(game.receiveAttack(1, 1)).toEqual({ status: "Hit", ship });
    });
    test("cannot receive attacks outside the bounds of the gameBoard", () => {
      expect(() => game.receiveAttack(10, 10)).toThrow("Invalid Selection");
    });
    test("a hit decrements the hitsRemaining counter on a ship", () => {
      const ship = createShip(2);
      game.placeShip(ship, 1, 1);
      game.receiveAttack(1, 1);
      expect(ship).toHaveProperty("hitsRemaining", 1);
    });
    test("a cell that has been hit cannot be attacked again", () => {
      const ship = createShip(2);
      game.placeShip(ship, 1, 1);
      game.receiveAttack(1, 1);
      expect(() => game.receiveAttack(1, 1)).toThrow("Already Attacked");
    });
  });
  describe("Sunk Ships", () => {
    let ship1, ship2;

    beforeEach(() => {
      ship1 = createShip(1);
      ship2 = createShip(1);
      game.placeShip(ship1, 1, 1);
      game.placeShip(ship2, 2, 2);
      game.receiveAttack(1, 1);
      game.receiveAttack(2, 2);
    });

    test("game tracks multiple ships sinking", () => {
      expect(game.getSunkShips().length).toEqual(2);
    });
    test("game can identify individual sunk ships", () => {
      expect(game.getSunkShips()).toContain(ship1);
      expect(game.getSunkShips()).toContain(ship2);
    });
  });
  describe("Game Over", () => {
    let ship1, ship2;

    beforeEach(() => {
      ship1 = createShip(1);
      ship2 = createShip(1);
      game.placeShip(ship1, 1, 1);
      game.placeShip(ship2, 2, 2);
    });

    test("gameOver returns false when ships are still remaining", () => {
      game.receiveAttack(1, 1);
      expect(game.gameOver()).toBe(false);
    });

    test("game returns 'game over' when all ships are sunk", () => {
      game.receiveAttack(1, 1);
      game.receiveAttack(2, 2);
      expect(game.gameOver()).toBe(true);
    });
  });
});
