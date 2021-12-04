require("dotenv").config();
const mongoose = require("mongoose");

const Product = require("./models/product");

mongoose.connect(process.env.MONGO_URL);
const products = [
  {
    name: "Coke",
    type: "drinks",
    quantity: 10,
    cost: 20,
  },
  {
    name: "Pepsi",
    type: "drinks",
    quantity: 10,
    cost: 25,
  },
  { name: "Dew", type: "drinks", quantity: 10, cost: 30 },
];

async function dropCollection() {
  console.log("Removing Product collection");
  await Product.remove();
  console.log("Success!");
}

async function seed() {
  console.log("Seeding Product");
  try {
    await Product.insertMany(products);
    console.log("Success!");
  } catch (error) {
    console.log("Error:" + error);
  }
}
async function doBoth() {
  await dropCollection();
  await seed();
  process.exit(0);
}

doBoth();
