const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const dbConfig=require('./db');
const roomsRoute=require('./routes/roomRoutes')
const userRoute=require('./routes/userRoutes')
const bookingRoute=require('./routes/bookingRoutes')
app.use(express.json())
app.use('/api/rooms', roomsRoute)
app.use('/api/users', userRoute)
app.use('/api/bookings', bookingRoute)

app.listen(port, () => console.log(`Example app listening on port  nodemon ${port}!`))
