export default function createPlayer(board) {
  function attack(opponent, x, y) {
    opponent.board.receiveAttack(x, y);
  }

  return {
    board,
    attack,
  };
}
