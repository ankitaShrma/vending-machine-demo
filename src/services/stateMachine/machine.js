// Assumption: there is just 1 machine where all the transactions are being done
const Actions = require("./actions");
const constants = require("../../commons/constants");

const formatReturnValue = (state, product, change, amountLeft) => {
  return { state, product, change, amountLeft };
};
const totalAmount = 100; // note that this is being saved here for now. Later on, we can move to db for users
const Machine = function () {
  let currentStateDef,
    dispensingProduct = {};
  let currencyInserted,
    changeToReturn = 0;
  let currentState;
  let amountLeft;
  this.init = async (state, amountLeft) => {
    // init basically means to set machine as ready
    if (!state) state = constants.initState;
    currentStateDef = await Actions.nextState(state, constants.initState);
    amountLeft = amountLeft || totalAmount;
    return formatReturnValue(
      currentStateDef,
      dispensingProduct,
      changeToReturn,
      amountLeft
    );
  };
  this.setState = async givenState => {
    currentState = givenState || (currentStateDef && currentStateDef.state);
  };
  this.setCurrency = (given, amount) => {
    currencyInserted = given;
    changeToReturn = given;
    amountLeft = amount ? amount : totalAmount - given;
  };
  this.setProduct = async productName => {
    dispensingProduct = await Actions.getProduct(productName);
  };
  this.abort = async () => {
    // abort transaction and return everything
    changeToReturn = currencyInserted;
    amountLeft += changeToReturn;
    return formatReturnValue(
      currentStateDef,
      dispensingProduct,
      changeToReturn,
      amountLeft
    );
  };
  this.calculateChange = (value, quantity = 1) => {
    value = value * quantity;
    if (value > currencyInserted)
      throw new Error("Not enough money to dispense item");
    const change = currencyInserted - value;
    amountLeft += change;
    return { change, left: amountLeft };
  };
  this.dispenseItem = async (productName, quantity, amountLeft) => {
    // check if in stock
    const result = await Actions.checkProductStock(productName, quantity);
    if (result.msg === constants.errorMsg) {
      let err = new Error(
        `Product not enough in stock: ${productName}, quantity: ${result.quantity}`
      );
      err.product = result;
      throw err;
    }
    dispensingProduct = await Actions.removeProduct(productName, quantity);
    const productCost = dispensingProduct && dispensingProduct.cost;
    const { left, change } = this.calculateChange(productCost, quantity);
    return formatReturnValue(currentStateDef, dispensingProduct, change, left);
  };
  this.dispenseChange = (
    state = currentStateDef,
    product = dispensingProduct,
    change = changeToReturn,
    amount = amountLeft
  ) => formatReturnValue(state, product, change, amount);

  this.gotoNextState = async next => {
    if (!currentState) throw new Error("Machine not initialized");
    const nextStateDef = await Actions.nextState(currentState, next);
    currentStateDef = nextStateDef;
    return nextStateDef;
  };
};

module.exports = Machine;
