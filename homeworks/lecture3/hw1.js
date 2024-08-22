/**
 * there are unlimited numbers of 1c, 5c, 25c, 50c
 * pick 48 coins to have 1 dollar
 * print out 2 solutions
 */
function pickCoins() {
  // implement here
  let solutions = [];

  for (let n1 = 0; n1 <= 48; n1++) {
    for (let n5 = 0; n5 <= 48 - n1; n5++) {
      for (let n25 = 0; n25 <= 48 - n1 - n5; n25++) {
        let n50 = 48 - n1 - n5 - n25;
        let total = n1 * 1 + n5 * 5 + n25 * 25 + n50;
        if (total == 48) {
          solutions.push({ n1: n1, n5: n5, n25: n25, n50: n50 });
          if (solutions.length == 2) {
            break;
          }
        }
      }
      if (solutions.length == 2) break;
    }
    if (solutions.length == 2) break;
  }
}
