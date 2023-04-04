const express=require("express")
const router=express.Router()
const users=require("../models/userSchema")



router.post("/register",async (req,res)=>{
    const {name,country,Score}=req.body
    const AddNewUser=new users({
        name,country,Score
    })
    await AddNewUser.save()
    console.log(AddNewUser)
    console.log(req.body);
    res.send("hello")
})
router.get("/getrequist",async (req,res)=>{
   try {
    const user=await users.find();
    res.status(201).json(user)
   } catch (error) {
    res.status(404).json(error)
   }
})

router.get("/getrequist",async (req,res)=>{
    try {
     const user=await users.find();
     res.status(201).json(user)
    } catch (error) {
     res.status(404).json(error)
    }
 })

module.exports = router;