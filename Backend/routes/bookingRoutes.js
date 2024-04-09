const express = require('express')
const router = express.Router()
const Booking = require('../models/Booking')
const Room = require('../models/Room')
const stripe = require('stripe')('sk_test_51P2xfOSCPMGo2Dl7sJ0mORAKroai2dH2sz6cNCWYC0lJW0PCSGgePVHuVOsjmTmwSgBy7wNJNfBEEDOrusIpP0XV00n4VJLQHI')
const { v4: uuidv4 } = require('uuid');
const roomModel = require('../models/Room')
router.post('/bookRoom', async (req, res) => {
    const { rooms, userid, fromdate, todate, totalamount, totaldays, token } = req.body
    
    try {
        const customer = await stripe.customers.create({
         
                
                    email: req.body.stripeEmail,
                    source: req.body.stripeToken
            
           
          
        })
 
        const payment = await stripe.paymentIntents.create({
            amount: totalamount * 100,
            customer: customer.id,
            currency:'inr',
            receipt_email: token.email
        }, {
            idempotencyKey: uuidv4()
        })
        if (payment) {
            try {
                const newBooking = new Booking({
                    rooms: rooms.name,
                    roomid: rooms._id,
                    userid,
                    fromdate,
                    todate,
                    totalamount,
                    totaldays,
                    transactionId: '1234',
                })

                const booking = await newBooking.save()

                const roomTemp = await Room.findOne({ _id: rooms._id })
                roomTemp.currentBookings.push({
                    bookingid: booking._id,
                    fromdate: fromdate,
                    todate: todate,
                    userid: userid,
                    status: booking.status,
                })
                await roomTemp.save()
                res.setHeader('Content-Type','application/json')
                res.send('Room Booked Successfully').status(200)

            } catch (err) {
                res.send(err).status(400)
                console.log(err)
            }
        }
        res.send('Payment Successful,Room Booked Successfully')
    } catch (err) {
        res.send(err).status(400)
        console.log(err)
    }

   
})



router.post('/getBookingsByuserid',async(req,res)=>{
    const userid=req.body.userid;
    try{
        const booked=await Booking.find({userid:userid})
        res.send(booked).status(200)
        res.setHeader('Content-Type','application/json')
  
    }catch(err){
        res.json({ message: err }).status(400)
      //  console.log(err)
    }
})

router.post('/cancelBooking',async(req,res)=>{
    const {bookingid,roomid}=req.body
    try{
        const bookingItem=await Booking.findOne({_id:bookingid})
        bookingItem.status='Cancelled'
  await bookingItem.save()
        const room=await Room.findOne({_id:roomid})
        const bookings=room.currentBookings
        const temp=bookings.filter(booking=>booking.bookingid.toString()!==bookingid)
        room.currentBookings=temp
       await room.save()
  res.send('Booking Cancelled Successfully')
    }catch(err){
        res.json({ message: err }).status(400)
        console.log(err)
    }
})

router.get('/getallbookings',async(req,res)=>{
    try{
 const book=await Booking.find()
 res.send(book)
 res.setHeader('Content-Type','application/json')
 
    }catch(err){
        res.json({ message: err }).status(400)
        console.log(err)
    }
})

module.exports = router;