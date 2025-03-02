import initializeGame from "../game-controller";
import createGameBoard from "../game-board";
import createPlayer from "../player";
jest.mock("../player");
jest.mock("../game-board");

describe("game-controller module", () => {
  let game, mockPlayer1, mockPlayer2, mockBoard1, mockBoard2;

  beforeEach(() => {
    mockBoard1 = {
      placeShip: jest.fn(),
      receiveAttack: jest.fn(),
      getBoard: jest.fn(() => {
        Array(10).fill(Array(10).fill(null));
      }),
    };
    mockBoard2 = {
      placeShip: jest.fn(),
      receiveAttack: jest.fn(),
      getBoard: jest.fn(() => {
        Array(10).fill(Array(10).fill(null));
      }),
    };
    createGameBoard
      .mockReturnValueOnce(mockBoard1)
      .mockReturnValueOnce(mockBoard2);

    mockPlayer1 = {
      board: mockBoard1,
      attack: jest.fn(),
      placeShip: jest.fn(),
      getAvailableShips: jest.fn(() => [
        {
          length: 1,
          name: "mock",
        },
      ]),
    };

    mockPlayer2 = {
      board: mockBoard2,
      attack: jest.fn(),
      placeShip: jest.fn(),
      getAvailableShips: jest.fn(() => [
        {
          length: 1,
          name: "mock",
        },
      ]),
    };
    createPlayer
      .mockReturnValueOnce(mockPlayer1)
      .mockReturnValueOnce(mockPlayer2);

    game = initializeGame();
  });

  test("the game is initialized with two players", () => {
    expect(createPlayer).toHaveBeenCalledTimes(2);
    expect(createGameBoard).toHaveBeenCalledTimes(2);
  });
  describe("change Turn functionality", () => {
    test("players switch turns correctly", () => {
      expect(game.getCurrentPlayer()).toEqual(mockPlayer1);
      game.switchTurns();
      expect(game.getCurrentPlayer()).toEqual(mockPlayer2);
    });
    test("the game properly changes the phase of the game to attack", () => {
      game.changePhase();
      expect(game.getPhase()).toBe("attack");
    });
  });
  describe("phase change", () => {
    test("the game properly changes the phase from attack to placement", () => {
      game.changePhase(); // move from the initial placement phase to the attack phase
      expect(game.getPhase()).toBe("attack");
      game.changePhase(); // move from the new attack phase back to placement phase
      expect(game.getPhase()).toBe("placement");
    });
    test("the game does not change phases if ships are still available", () => {
      expect(() =>
        game.checkAndAdvancePhase([mockPlayer1, mockPlayer2])
      ).toThrow("All ships must be placed");
    });
    test("the game changes phases once all ships are placed", () => {
      mockPlayer1.getAvailableShips.mockImplementation(() => []);
      mockPlayer2.getAvailableShips.mockImplementation(() => []);
      game.checkAndAdvancePhase([mockPlayer1, mockPlayer2]);
      expect(game.getPhase()).toBe("attack");
    });
  });
});
