const express = require("express")
const router = express.Router()
const users = require("../models/userSchema")



router.post("/register", async (req, res) => {
    const { name, country, email, Score } = req.body
    try {
        if (!name || !country || !email) {
            res.status(403).send("plz fill the form")
        }else{
            const preuser = await users.findOne({ email: email })
            console.log(preuser)
            if (preuser) {
                res.status(404).send("already exist")
            }
            else {
                const AddNewUser = new users({
                    name, country, email, Score
                })
                await AddNewUser.save()
                console.log(AddNewUser)
                console.log(req.body);
                res.send("hello")
            }
        }
      
        
    } catch (error) {
        res.status(404).json(error)
    }
})

router.get("/getrequist", async (req, res) => {
    try {
        const user = await users.find();
        res.status(201).json(user)
    } catch (error) {
        res.status(404).json(error)
    }
})

router.get("/getUser", async (req, res) => {
    try {
        console.log("thisj")
        // console.log(req.params)
        // const { id } = req.params
        // const userindividual = await users.findById({ _id: id })
        // console.log(userindividual)
        // res.status(201).json(userindividual)
    } catch (error) {
        res.status(404).json(error)
    }
})


module.exports = router;