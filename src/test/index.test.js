// require all the test files here
// TESTs for nextState function
const Machine = require("../services/stateMachine/machine");
const stateDefinitions = require("../db/models/stateDefinition");
const { nextState } = require("../services/stateMachine/actions");
jest.mock("../commons/logger/index.js", () => {
  return jest.fn(() => console.log);
});
jest.mock("../services/stateMachine/actions", () => ({
  ...jest.requireActual("../services/stateMachine/actions"),
  checkProductStock: () =>
    jest.fn().mockReturnValue({
      _id: 1,
      name: "Coke",
      quantity: 9,
      cost: 20,
      msg: "success",
    }),
}));
jest.mock("../db/models/product", () => {
  return {
    findOneAndUpdate: () => {
      return {
        _id: 1,
        name: "Coke",
        quantity: 9,
        cost: 20,
      };
    },
    findOne: () => {
      return {
        _id: 1,
        name: "Coke",
        quantity: 10,
        cost: 20,
      };
    },
  };
});
describe("Action", function () {
  test("Next State should throw error when stateDefinition is not part of action", async function () {
    const unknownState = "unknown";
    try {
      await nextState("ready", unknownState);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error).toHaveProperty(
        "message",
        `State not found for query: {"state":"${unknownState}"}`
      );
    }
  });
  test("Next State should only return when state is part of next action and throw error when it is not next action", async function () {
    const state = "ready";
    const stateDef = stateDefinitions.find(s => s.state === state);
    const nextStateActions = stateDef.actions;
    const nextStateDef = stateDefinitions.find(
      s => s.state === nextStateActions[0].state
    );
    const wrongNextStateDef = stateDefinitions.find(
      s => s.state === nextStateDef.actions[0].state
    );
    try {
      let next = await nextState("ready", nextStateActions[0].state);
      expect(next).toEqual(nextStateDef);
      await nextState("ready", nextStateDef.actions[0].state);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error).toHaveProperty(
        "message",
        `${stateDef.description} Unable to ${wrongNextStateDef.message}`
      );
    }
  });
  test("Proper change and amount calculation when change is dispensed", async function () {
    const machine = new Machine();
    await machine.setState("currencyInserted");
    machine.setCurrency(25);

    await machine.gotoNextState("itemDispensed");
    const result = await machine.dispenseItem("Coke", 1, 80);
    expect(result).toHaveProperty("change", 5);
    expect(result).toHaveProperty("amountLeft", 60);
  });
});
