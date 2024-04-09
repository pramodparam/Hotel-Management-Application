const express = require('express');
const router = express.Router();
const User = require('../models/User');
router.post('/register',async (req, res) => {
 const newUser=new User({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
})
 try{
const user=await newUser.save()
  res.send('User Registered Successfully')
  res.json(user).status(200)
 }catch(err){
   res.json({err}).status(400)
 }
})

router.post('/login', async (req, res) => {
    const email=req.body.email;
    const password=req.body.password;
    try {
        const user = await User.findOne({ email: email, password: password })
        if(user){
            const temp={
                name:user.name,
                email:user.email,
                admin:user.isAdmin,
                _id:user._id
            }
           res.send(temp)
        }else{
            res.status(400)
           res.json({message:'Invalid Email or Password'})
        }
       
    } catch (err) {
        return res.json({err}).status(400)
    }
})


router.get('/getAllUsers',async(req,res)=>{
    try{
const users=await User.find()
res.send(users)
    }catch(err){
        console.log(err)
        return res.json({err}).status(400)
    }
})

router.get('/getUserById',async(req,res)=>{
    const userid=req.body.userid;
    try{
const user=await User.find({userid:userid})
res.send(user)
    }catch(err){
        console.log(err)
        return res.json({err}).status(400)
    }
})
module.exports = router;