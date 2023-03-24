const express = require("express")
const router = express.Router();
const mongo = require("mongoose");
const sales = mongo.model("sales");
const authMiddleware = require("../middleware/authMiddleware")

//Adding Sales
router.post("/addSales", authMiddleware, (req, res) => {

    const { productName, quantity, amount } = req.body;

    if (!productName || !quantity || !amount) {

        return res.status(400).json({ err: "Fill all the mandatory Fields" });

    }
    req.user.password = undefined;
    const addSales = new sales({ productName:productName, quantity:quantity, amount:amount, author: req.user });
    addSales.save()
        .then((newSales) => {
            res.status(201).json({ sales: newSales })
        }).catch((err) => {
            res.status(401).json({ err: "something want wrong" })
            console.log(err)
        })

});

//gathering top 5 sales from Database
router.get("/topSales", authMiddleware, (req, res) => {
    sales.find({ author: req.user._id })
        .populate("author", "_id productName quantity amount")
        .sort({ quantity: -1 })
        .limit(5)
        .then((topsales) => {
            res.status(200).json({ sales: topsales })
            console.log({ sales: topsales })
        }).catch((err) => {
            res.status(401).json({ err: "Somthing goes wrong" })
            console.log(err)
        })
});

//Get sales amount and revenue of the day
router.get("/revenue", (req, res) => {
    sales.find()
        .sort({ amount: -1 })
        .limit(5)
        .then((error, sales) => {
            if (error) console.log(error);

            res.status(200).json({ sales });
        });
})
module.exports = router;