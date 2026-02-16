/**
 * Default tests.
 * @usage npx vitest run ./tests.ts
 */

import { Item, VendingMachine } from "./vending";

function it(description: string, fn: () => void) {
  try {
    fn();
    console.log(description, "✅");
  } catch (e) {
    console.log(description, "❌", e instanceof Error ? e.message : e);
  }
}

function expect(cond: any, msg = "expectation failed") {
  if (!cond) throw new Error(msg);
}

// added use of vending to get the linter to stop yelling at me.
// also changed local to constant for my linter tests
(function () {
  it("can be instantiated with a call", () => {
    const vending = new VendingMachine();
    if (!vending) throw new Error("Failed to instantiate VendingMachine");
    else return true;
  });
  // set vending and output to constants
  it("initializes with proper inventory", () => {
    const vending = new VendingMachine();
    const output = vending.getInventory();

    return (
      output[Item.CandyBar] === 10 &&
      output[Item.Soda] === 12 &&
      output[Item.Coffee] === 300 &&
      output[Item.PlushKeychain] === 4 &&
      output[Item.NonWinningScratchOffTicket] === 17
    );
  });

  it("can purchase an item", () => {
    const vending = new VendingMachine();
    vending.insertMoney(300);
    const { item, status } = vending.purchase(Item.Coffee);
    expect(status == "success");
    return item === Item.Coffee;
  });

  it("returns { error } if not enough money to purchase an item", () => {
    const vending = new VendingMachine();
    vending.insertMoney(220);
    const { item, status } = vending.purchase(Item.Coffee);
    expect(status == "error");
    return item == null;
  });
})();
