// linter flagging enum: 
// https://www.typescriptlang.org/docs/handbook/enums.html
export enum Item {
  CandyBar = "CandyBar",
  Soda = "Soda",
  Coffee = "Coffee",
  PlushKeychain = "PlushKeychain",
  NonWinningScratchOffTicket = "NonWinningScratchOffTicket",
}

// made price an enum as its constant and follows patterns
export enum itemPrice {
  CandyBar = 100,
  Soda = 150,
  Coffee = 300,
  PlushKeychain = 3700,
  NonWinningScratchOffTicket = 0
};


export class VendingMachine {
  private _inventory: Record<Item, number>;
  private _prices: Record<Item, number>;
  private _balance: number;

  constructor() {
    this._inventory = {
      [Item.CandyBar]: 10,
      [Item.Soda]: 12,
      [Item.Coffee]: 300,
      [Item.PlushKeychain]: 4,
      [Item.NonWinningScratchOffTicket]: 17,
    };

    this._prices = {
      [Item.CandyBar]: itemPrice.CandyBar,
      [Item.Soda]: itemPrice.Soda,
      [Item.Coffee]: itemPrice.Coffee,
      [Item.PlushKeychain]: itemPrice.PlushKeychain,
      [Item.NonWinningScratchOffTicket]: itemPrice.NonWinningScratchOffTicket,
    };

    this._balance = 0;

  }

  getStock(item: Item) {
    console.log(this._inventory[item]);
    return this._inventory[item];
  }
  getBalance(): number{
    return this._balance;
  }
  getInventory(): Record<Item, number> {
    return this._inventory;
  }
  setStock(item: Item, count: number) {
    this._inventory[item] = count;
  }
  setBalance(amount: number) {
    this._balance = amount;
  }
  setInventory(inventory: Record<Item, number>) {
    this._inventory = inventory;
  }


  insertMoney(cents: number): [number, string] {
    let message = "";
    if (cents <= 0) {
      message = `Inserted money must be a positive amount. Received: ${cents} cents.`;
      throw new Error(message);
    }
    this._balance += cents;
    message = `Inserted ${cents} cents. Current balance: ${this._balance} cents.`;
    return [this._balance, message];
  }

  restock(item: Item, count: number): {number: number, message: string} {
    let message ="";
    if (count < 0) {
      message = "Can't restock a negative value.";
      return {number: this._inventory[item], message};
    }
    this._inventory[item] += count;
    message = `Restocked ${count} ${item}(s). Current stock: ${this._inventory[item]}.`;
    return { number: this._inventory[item], message };
  }

  printStock() {
    console.log("===========");
    for (const item in this._inventory) {
      //linter flagging the bad syntax, updating to use the type
      console.log(item, this._inventory[item as Item]);
    }
    console.log("===========");
  }

  purchase(item: Item): { item: Item | null, status: string } {
    const price = this._prices[item];
    const stock = this._inventory[item];
    let status ="";
    if (stock <= 0) {
      status = `Sorry, ${item} is out of stock.`;
      return { item: null, status };
    }

    if (this._balance < price) {
      status = "error";//expected test value
      return { item: null, status };
    }

    // Process the purchase
    this._inventory[item] -= 1;
    this._balance -= price;
    status = "success"; //expected test value
    console.log(
      `${status} : ${item} : ${this._balance}`
    );
    return { item, status };
  }
}
