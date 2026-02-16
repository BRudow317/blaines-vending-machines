/**
 * Claudes output for testing based on my prompt
 * 
I need to set up some tests for my vending machine

I want to include automated tests I can run with vitest
The project is a frontend only build and is to demonstrate a mvp in a time constraint.

Tests I want you to generate: 
unit tests on each of the functions in either file
test the input and output
test to make sure output goes to the vending box on the vm component.
test to see if state can be broken by an unhandled exception I did not anticipate
test to see that the thrown error values match the anticipated test error value
generate a test that instantiates 1000 vending machines
generate a test that tries to initiate multiple actions at once with a synchronous call

What did I miss?
What other tests would be important to run?
 */
import { describe, it, expect } from "vitest";
import { VendingMachine, Item } from "./vending";

describe("Vending Machine Tests", () => {
  
  // Unit tests - test each function
  it("insertMoney returns [balance, message]", () => {
    const vm = new VendingMachine();
    const [balance, message] = vm.insertMoney(100);
    expect(balance).toBe(100);
    expect(message).toContain("100 cents");
  });

  it("purchase returns {item, status} on success", () => {
    const vm = new VendingMachine();
    vm.insertMoney(200);
    const result = vm.purchase(Item.CandyBar);
    expect(result.status).toBe("success");
    expect(result.item).toBe(Item.CandyBar);
  });

  it("purchase deducts correct amount from balance", () => {
    const vm = new VendingMachine();
    vm.insertMoney(200);
    vm.purchase(Item.CandyBar); // costs 100
    expect(vm.getBalance()).toBe(100);
  });

  it("restock returns {number, message}", () => {
    const vm = new VendingMachine();
    const result = vm.restock(Item.CandyBar, 5);
    expect(result.number).toBe(15);
    expect(result.message).toContain("Restocked 5");
  });

  it("getBalance returns current balance", () => {
    const vm = new VendingMachine();
    vm.insertMoney(250);
    expect(vm.getBalance()).toBe(250);
  });

  it("getStock returns item count", () => {
    const vm = new VendingMachine();
    expect(vm.getStock(Item.CandyBar)).toBe(10);
  });

  it("getInventory returns all items", () => {
    const vm = new VendingMachine();
    const inv = vm.getInventory();
    expect(Object.keys(inv).length).toBe(5);
  });

  // Error tests - thrown values match expected
  it("insertMoney throws error for negative amount", () => {
    const vm = new VendingMachine();
    expect(() => vm.insertMoney(-50)).toThrow(
      "Inserted money must be a positive amount. Received: -50 cents."
    );
  });

  it("purchase returns 'error' status for insufficient funds", () => {
    const vm = new VendingMachine();
    vm.insertMoney(50);
    const result = vm.purchase(Item.CandyBar);
    expect(result.status).toBe("error");
  });

  it("purchase returns 'success' status for valid purchase", () => {
    const vm = new VendingMachine();
    vm.insertMoney(200);
    const result = vm.purchase(Item.CandyBar);
    expect(result.status).toBe("success");
  });

  // State integrity - cannot be broken by exceptions
  it("state unchanged after thrown error", () => {
    const vm = new VendingMachine();
    const initialBalance = vm.getBalance();
    try {
      vm.insertMoney(-50);
    } catch {
      // ignore
    }
    expect(vm.getBalance()).toBe(initialBalance);
  });

  it("inventory unchanged after failed purchase", () => {
    const vm = new VendingMachine();
    const initialStock = vm.getStock(Item.CandyBar);
    vm.insertMoney(50); // not enough
    vm.purchase(Item.CandyBar);
    expect(vm.getStock(Item.CandyBar)).toBe(initialStock);
  });

  // 1000 instances test
  it("1000 independent vending machines", () => {
    const machines: VendingMachine[] = [];
    for (let i = 0; i < 1000; i++) {
      const vm = new VendingMachine();
      vm.insertMoney((i + 1) * 10);
      machines.push(vm);
    }
    expect(machines.length).toBe(1000);
    expect(machines[0].getBalance()).toBe(10);
    expect(machines[999].getBalance()).toBe(10000);
  });

  // Multiple synchronous operations
  it("multiple synchronous operations", () => {
    const vm = new VendingMachine();
    vm.insertMoney(100);
    vm.insertMoney(200);
    vm.purchase(Item.CandyBar);
    vm.restock(Item.CandyBar, 5);
    vm.purchase(Item.Soda);
    
    expect(vm.getBalance()).toBe(50);
    expect(vm.getStock(Item.CandyBar)).toBe(14);
    expect(vm.getStock(Item.Soda)).toBe(11);
  });
});
