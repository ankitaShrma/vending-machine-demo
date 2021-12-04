const Machine = require("./machine");
const log = require("../../commons/logger");

const State = {
  ready: async (body = {}) => {
    // check current state
    const { action, amountLeft } = body;
    const machine = new Machine();
    return machine.init(action, amountLeft);
  },
  currencyInserted: async (body = {}) => {
    const { action, state, currency } = body;
    // insert currency to select item in this state
    const machine = new Machine();
    machine.setCurrency(currency);
    await machine.setState(state);
    const nextStateDef = await machine.gotoNextState(action);
    return machine.dispenseChange(nextStateDef);
  },
  itemDispensed: async (body = {}) => {
    const { action, state, currency, product, quantity, amountLeft } = body;
    // insert currency to select item in this state
    const machine = new Machine();
    machine.setCurrency(currency, amountLeft);
    await machine.setState(state);

    await machine.gotoNextState(action);
    return machine.dispenseItem(product, quantity, amountLeft);
  },
  changeDispensed: async (body = {}) => {
    const { action, state, product, change, amountLeft } = body;
    // return change in this state
    const machine = new Machine();
    await machine.setState(state);

    const nextStateDef = await machine.gotoNextState(action);
    // note that changeDispense being related to itemDispense will need to get data from that state: can remove this state as well
    return machine.dispenseChange(nextStateDef, product, change, amountLeft);
  },
  transactionAborted: async (body = {}) => {
    const { action, state, product, currency, amountLeft } = body;
    // return change in this state
    const machine = new Machine();
    await machine.setState(state);
    machine.setCurrency(currency, amountLeft);
    if (product) await machine.setProduct(product);
    const nextStateDef = await machine.gotoNextState(action);
    return machine.dispenseChange(nextStateDef, product);
  },
  // this refund can be obsolete -- state after transactionAborted to add if needed in stateDefinition
  refund: async (body = {}) => {
    const { state, product, change, amountLeft } = body;
    // return change in this state
    const machine = new Machine();
    const nextState = await machine.gotoNextState(state);
    // note that refund being related to transactionAborted will need to get data from that state
    return { nextState, product, change, amountLeft };
  },
};
module.exports = State;
