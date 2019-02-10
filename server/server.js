const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require('dotenv').config();
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

const { User } = require('./models/user');

app.post('/api/users/register', (req,res)=>{
	// res.status(200);
	const user = new User(req.body);
	user.save((err, doc)=>{
		if(err) return res.json({ success: false, err});
		res.status(200).json({ success: true, userdata: doc })
	})
})

const port = process.env.PORT || 3002; 
app.listen(port, ()=>{
  console.log(`server running at ${port}`)
})