const { Error } = require("mongoose");
const StateService = require("../../../../services/stateMachine");

const initMachine = async (req, res, next) => {
  try {
    const data = await StateService.ready({ ...req.body, ...req.params });
    res.send(data);
  } catch (err) {
    next(err);
  }
};

const nextState = async (req, res, next) => {
  try {
    const action = req.params.action;
    if (!StateService[action]) throw new Error("Invalid action: " + action);
    const data = await StateService[action]({ ...req.body, ...req.params });
    res.send(data);
  } catch (err) {
    next(err);
  }
};

module.exports = { initMachine, nextState };
