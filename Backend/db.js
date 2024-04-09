const mongoose = require('mongoose');

var mongoURL ='mongodb+srv://gohotel:gohotel@cluster0.gngvfrj.mongodb.net/Hotel-React?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });
var connection = mongoose.connection;
connection.on('error',()=> console.log('connection error:'));
connection.on('open',()=> console.log('connected to mongodb:'));
module.exports = mongoose;