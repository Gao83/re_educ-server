
const router = require("express").Router()
const Stripe = require("stripe")
const stripe = new Stripe(process.env.STRIPE_SECRET_TEST);


router.post("/checkout", async (req, res) => {
    console.log("stripe-routes.js 9 | route reached", req.body);

    let { amount, id, course } = req.body;
    console.log("stripe-routes.js 10 | amount and id", amount, id, course);
    try {
        const payment = await stripe.paymentIntents.create({
            amount: amount,
            currency: "EUR",
            description: "Your Company Description",
            payment_method: id,
            confirm: true,
        });
        console.log("stripe-routes.js 19 | payment", payment);
        res.json({
            message: "Payment Successful",
            success: true,
        });
    } catch (error) {
        console.log("stripe-routes.js 17 | error", error);
        res.json({
            message: "Payment Failed",
            success: false,
        });
    }
});

module.exports = router

// app.listen(3001, () => {
//     console.log("Server started...");
// });