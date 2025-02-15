import createShip from "../ship";

describe("ship module", () => {
  test("the factory function to create a ship is defined", () => {
    expect(createShip()).toBeDefined;
  });
  test("the function returns an object", () => {
    expect(createShip()).toBeInstanceOf(Object);
  });
  test("the created ship object has a hitsRemaining property", () => {
    const ship = createShip(4);

    expect(ship).toHaveProperty("hitsRemaining", 4);
  });
  test("the created ship object has a hit() function", () => {
    const ship = createShip(4);

    expect(ship).toHaveProperty("hit");
  });
  test("the hit function increments the 'hit' property of the object", () => {
    const ship = createShip(4);
    ship.hit();

    expect(ship.hitsRemaining).toBe(3);
  });
  test("the ship isSunk when hitsRemaining falls to 0", () => {
    const ship = createShip(2);
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });
  test("the isSunk method returns false if the ship has hits remaining", () => {
    const ship = createShip(2);
    ship.hit();
    expect(ship.isSunk()).toBe(false);
  });
});
