import createPlayer from "../player";
jest.mock("../game-board");
jest.mock("../ship");

describe("player module", () => {
  test("createPlayer creates a player object", () => {
    expect(createPlayer()).toBeInstanceOf(Object);
  });
});
describe("attack method", () => {
  let player1, player2, board1, board2, ships1, ships2;
  beforeEach(() => {
    board1 = {
      placeShip: jest.fn(),
      receiveAttack: jest.fn(),
      getBoard: jest.fn(() => Array(10).fill(Array(10).fill(null))),
    };
    board2 = {
      placeShip: jest.fn(),
      receiveAttack: jest.fn(),
      getBoard: jest.fn(() => Array(10).fill(Array(10).fill(null))),
    };

    player1 = createPlayer(board1, ships1);
    player2 = createPlayer(board2, ships2);
  });
  test("the attack method calls receive attack on the opponents board", () => {
    player1.attack(player2, 1, 1);
    expect(board2.receiveAttack).toHaveBeenCalledWith(1, 1);
  });
});

describe("placeShip method", () => {
  let player1, board1, mockShip, mockAvailableShips;
  beforeEach(() => {
    board1 = {
      placeShip: jest.fn(),
      receiveAttack: jest.fn(),
      getBoard: jest.fn(() => Array(10).fill(Array(10).fill(null))),
    };
    mockShip = {
      length: 1,
      name: "mock",
    };
    mockAvailableShips = [mockShip];
    player1 = createPlayer(board1, mockAvailableShips);
  });
  test("placing a ship triggers the placeship method on the board object", () => {
    player1.placeShip(mockShip, 1, 1);
    expect(board1.placeShip).toHaveBeenCalledWith(mockShip, 1, 1, "horizontal");
  });
  test("placing a ship removes it from the available ships array", () => {
    player1.placeShip(mockShip, 2, 2);
    expect(player1.getAvailableShips()).not.toContain(mockShip);
  });
});
