const express = require('express')
const router = express.Router()
const roomModel=require('../models/Room')
const Booking=require('../models/Booking');


router.get('/getAllRooms',async(req,res)=>{
    try{
        const rooms=await roomModel.find({})
     return res.json(rooms)
       
    }catch(err){
    return res.json({message:err}).status(400)
       console.log(err)
    }
}
);

router.post('/getRoomById', async (req, res) => {
    try {
        const roomid = req.body.roomid
        const room = await roomModel.findOne({_id:roomid})
        res.status(200).json(room)
        // console.log(rooms)
    } catch (err) {
        res.json({ message: err }).status(400)
    }
}
);


router.post('/addRoom',async(req,res)=>{
try{
  const newroom=new roomModel(req.body)
  await newroom.save()
  res.send('New Room Added Successfully')

}catch(err){
    res.json({ message: err }).status(400)
}
})

module.exports=router;