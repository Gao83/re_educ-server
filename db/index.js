// ℹ️ package responsible to make the connection with mongodb
// https://www.npmjs.com/package/mongoose
const mongoose = require("mongoose");

// ℹ️ Sets the MongoDB URI for our app to have access to it.
// If no env has been set, we dynamically set it to whatever the folder name was upon the creation of the app

const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost/Education-App";

mongoose
  .connect(MONGO_URI)
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });

//STRIPE

// const express = require("express");
// const app = express();
// require("dotenv").config();
// const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);
// const bodyParser = require("body-parser");
// const cors = require("cors");
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(cors());
// app.post("/stripe/charge", cors(), async (req, res) => {
//   console.log("stripe-routes.js 9 | route reached", req.body);
//   let { amount, id } = req.body;
//   console.log("stripe-routes.js 10 | amount and id", amount, id);
//   try {
//     const payment = await stripe.paymentIntents.create({
//       amount: amount,
//       currency: "USD",
//       description: "Your Company Description",
//       payment_method: id,
//       confirm: true,
//     });
//     console.log("stripe-routes.js 19 | payment", payment);
//     res.json({
//       message: "Payment Successful",
//       success: true,
//     });
//   } catch (error) {
//     console.log("stripe-routes.js 17 | error", error);
//     res.json({
//       message: "Payment Failed",
//       success: false,
//     });
//   }
// });
// app.listen(3001, () => {
//   console.log("Server started...");
// });