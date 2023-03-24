const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config")
const mongo = require("mongoose");
const authMiddleware = require("../middleware/authMiddleware");
const userModel = mongo.model("userModel")

//creating Registretion and Login APIs for integration

//registration API
router.post("/register", (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({ err: "Fill all the mandatory Fields" });
    }
    userModel.findOne({ email: email })
        .then((userInDb) => {
            if (userInDb) {
                return res.status(500).json({ err: "Email Already Exist" });
            }
            bcrypt.hash(password, 16)
                .then((hasedPassword) => {
                    const user = new userModel({
                        firstName, lastName, fullName: `${firstName} ${lastName}`, email, password: hasedPassword
                    });
                    user.save()
                        .then((newuser) => {
                            return res.status(200).json({ result: "User Successfully Registered" });
                        }).catch((err) => {
                            console.log(err)
                        })
                })
        }).catch((err) => {
            console.log(err)
        })
});

//Login API
router.post("/login", (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ err: "Fill all the mandatory Fields" });
    }
    userModel.findOne({ email: email })
        .then((userInDb) => {
            if (!userInDb) {
                console.log("user not found")
                res.status(401).json({ err: "Invalid Credentials" });
                return
            }
            bcrypt.compare(password, userInDb.password)
                .then((didMatch) => {

                    if (didMatch) {
                        console.log("Loging Success")
                        const token = jwt.sign({ _id: userInDb._id }, JWT_SECRET)

                        const userInfo = { "email": userInDb.email, "fullName": userInDb.fullName }

                        console.log({ token: token, user: userInfo })

                        res.status(200).json({ result: { token: token, user: userInfo } });

                    } else {
                        console.log("Invalid Credentials")
                        res.status(401).json({ err: "Invalid Credentials" });
                        return
                    }
                })
        }).catch((err) => {
            console.log(err)
        })
});


module.exports = router;