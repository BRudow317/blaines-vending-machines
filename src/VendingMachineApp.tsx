/**
 * https://www.typescriptlang.org/docs/handbook/react.html
 */
import { useState } from "react";
import { Item, itemPrice, VendingMachine } from "./vending";
import "./index.css";

function VendingMachineApp() {
  const [instancedVM] = useState(() => {
    return new VendingMachine();
  });
  const [balance, setBalance] = useState(0);
  const [vendingBox, setVendingBox] = useState<string>("");

  function handleInsertMoney(cents: number) {
    try {
      const [newBalance, message] = instancedVM.insertMoney(cents);
      setBalance(newBalance);
      setVendingBox(message);
    } catch (error) {
      setVendingBox(
        `Insert failed: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
      console.error("Error inserting money: transaction voided", error);
    }
  }
  function refundMoney(cents: number) {
    try {
      instancedVM.setBalance(0);
      setBalance(0);
      setVendingBox(`Refunded ${cents} cents`);
    } catch (error) {
      console.error("Error inserting money: transaction voided", error);
    }
  }

  function handlePurchase(item: Item) {
    try {
      const result = instancedVM.purchase(item);
      const message = `${result.status} ${result.item ? `: Dispensed ${result.item}` : ""}`;
      setVendingBox(message);
      setBalance(instancedVM.getBalance());
    } catch (error) {
      setVendingBox(
        `Purchase failed: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
      console.error("Error processing purchase: transaction voided", error);
    }
  }

  function handleRestock(item: Item, count: number) {
    try {
      const result = instancedVM.restock(item, count);
      setVendingBox(result.message);
      setBalance(instancedVM.getBalance());
    } catch (error) {
      setVendingBox(
        `Restock failed: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
      console.error("Error processing restock: transaction voided", error);
    }
  }

  return (
    <main>
      <h1>VendCo</h1>
      <form>
        <div id="inventory">
          <h2>Inventory</h2>
          <ul>
            {Object.entries(instancedVM.getInventory()).map(([item, count]) => (
              <li key={item}>
                {item}: {count}
              </li>
            ))}
          </ul>
        </div>
        <div id="current-balance">
          <h2>Current Balance: {balance}</h2>
          <input type="number" id="input-cents" placeholder="Insert cents" />
          <button
            type="button"
            onClick={() => {
              const input = document.getElementById(
                "input-cents",
              ) as HTMLInputElement;
              const cents = parseInt(input.value);
              handleInsertMoney(cents);
              input.value = "";
            }}
          >
            Insert Money
          </button>
        </div>

        <div>
          <h3>Select Item</h3>
          <select id="select-item" defaultValue={Item.CandyBar}>
            <option id="candybar" value={Item.CandyBar}>
              Candy Bar: {itemPrice[Item.CandyBar]} cents
            </option>
            <option id="soda" value={Item.Soda}>
              Soda: {itemPrice[Item.Soda]} cents
            </option>
            <option id="coffee" value={Item.Coffee}>
              Coffee: {itemPrice[Item.Coffee]} cents
            </option>
            <option id="plush" value={Item.PlushKeychain}>
              Plush Keychain: {itemPrice[Item.PlushKeychain]} cents
            </option>
            <option id="scratch" value={Item.NonWinningScratchOffTicket}>
              Non-Winning Scratch-Off Ticket:{" "}
              {itemPrice[Item.NonWinningScratchOffTicket]} cents
            </option>
          </select>

          <button
            type="button"
            onClick={() => {
              const select = document.getElementById(
                "select-item",
              ) as HTMLSelectElement;
              handlePurchase(select.value as Item);
            }}
          >
            Purchase
          </button>
          <button
            type="button"
            onClick={() => {
              refundMoney(balance);
            }}
          >
            Refund
          </button>
        </div>

        <div id="vending-box">
          <h2>Vending Box</h2>
          <p>{vendingBox}</p>
        </div>

        <div id="maintenance">
          <h2>Other Options</h2>
          <select id="restock-item" defaultValue={Item.CandyBar}>
            <option id="candybar-restock" value={Item.CandyBar}>
              Restock: Candy Bar
            </option>
            <option id="soda-restock" value={Item.Soda}>
              Restock: Soda
            </option>
            <option id="coffee-restock" value={Item.Coffee}>
              Restock: Coffee
            </option>
            <option id="plush-restock" value={Item.PlushKeychain}>
              Restock: Plush Keychain
            </option>
            <option
              id="scratch-restock"
              value={Item.NonWinningScratchOffTicket}
            >
              Restock: Non-Winning Scratch-Off Ticket
            </option>
          </select>
          <input type="number" id="restock-count" placeholder="Restock Count" />
          <button
            type="button"
            onClick={() => {
              const select = document.getElementById(
                "restock-item",
              ) as HTMLSelectElement;
              const input = document.getElementById(
                "restock-count",
              ) as HTMLInputElement;
              const count = parseInt(input.value);
              handleRestock(select.value as Item, count);
              input.value = "";
            }}
          >
            Restock
          </button>

          <section>
            <button
              type="button"
              onClick={() => {
                instancedVM.setBalance(0);
                setBalance(0);
                setVendingBox("Machine reset: balance cleared");
              }}
            >
              Reset Machine
            </button>
          </section>
        </div>
      </form>
    </main>
  );
}

export default VendingMachineApp;
