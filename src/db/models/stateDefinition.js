module.exports = [
  {
    state: "ready",
    description: "Machine is ready to perform actions.",
    message: "ready machine",
    actions: [
      {
        state: "currencyInserted",
      },
    ],
    deleted: false,
  },
  {
    state: "currencyInserted",
    description: "Machine is collecting currency.",
    message: "collect currency",
    actions: [
      {
        state: "transactionAborted",
      },
      {
        state: "itemDispensed",
      },
    ],
    deleted: false,
  },
  {
    state: "itemDispensed",
    description: "Machine is dispensing item.",
    message: "despense item",
    actions: [
      {
        state: "changeDispensed",
      },
    ],
    deleted: false,
  },
  {
    state: "changeDispensed",
    description: "Machine is dispensing currency change.",
    message: "dispense currency change",
    actions: [
      {
        state: "ready",
      },
    ],
    deleted: false,
  },
  {
    state: "transactionAborted",
    description: "Machine is aborting transaction.",
    message: "abort transaction",
    actions: [
      {
        state: "ready",
      },
    ],
    deleted: false,
  },
  {
    state: "refund",
    description: "Machine is returning inserted currency.",
    message: "return inserted currency",
    actions: [
      {
        state: "ready",
      },
    ],
    deleted: false,
  },
];
