import createShip from "../ship";

describe("ship module", () => {
  test("the factory function to create a ship is defined", () => {
    expect(createShip()).toBeDefined;
  });
  test("the function returns an object", () => {
    expect(createShip()).toBeInstanceOf(Object);
  });
  test("the returned object has the length property", () => {
    expect(createShip(4)).toHaveProperty("length", 4);
  });
});
