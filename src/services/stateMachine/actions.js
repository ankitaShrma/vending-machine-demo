const constants = require("../../commons/constants");
const log = require("../../commons/logger");
const Product = require("../../db/models/product");
const { getStateDefinition } = require("../stateDefinition");

const actions = {
  nextState: async (current, next) => {
    const currentStateDef = await getStateDefinition({ state: current });
    if (current === next) return currentStateDef;
    const allowedNextStates =
      currentStateDef.actions && currentStateDef.actions.map(a => a.state);
    const givenNextStateDef = await getStateDefinition({ state: next });
    if (!allowedNextStates.includes(next)) {
      throw new Error(
        `${currentStateDef.description} Unable to ${givenNextStateDef.message}`
      );
    }
    return givenNextStateDef;
  },
  getState: async state => await getStateDefinition({ state }),
  removeProduct: async (name, quantity = 1) => {
    return Product.findOneAndUpdate(
      { name },
      { $inc: { quantity: quantity } },
      { new: true }
    );
  },
  getProduct: async name => {
    let product = await Product.findOne({ name });
    if (!product) throw new Error("Product not found in stock: " + name);
    product = product && product.toJSON();
    return product;
  },
  checkProductStock: async (name, quantity) => {
    let product = await Product.findOne({ name });
    if (!product) throw new Error("Product not found in stock: " + name);
    let msg;
    product = product && product.toJSON();

    if (product.quantity < quantity) msg = constants.errorMsg;
    else msg = constants.successMsg;
    return { ...product, msg };
  },
};
module.exports = actions;
