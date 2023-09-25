const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config({path: './config.env'})
const Tour = require('./models/tourModel')
const User = require('./models/userModel')
const fs = require('fs')

const userData = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/users.json`, 'utf-8'));
const tourData = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/tour_simple.json`, 'utf-8'));

const DB = process.env.DATABASE;
mongoose.connect(DB).then(connection=>{
  console.log("connected to db💝")
})

const importData = async () =>{
  const tours = await Tour.create(tourData)
  const users = await User.create(userData)
  console.log("data imported");
}

const deleteData  = async() =>{
  await Tour.deleteMany();
  await User.deleteMany();
  console.log("data deleted")
}

if(process.argv[2] === '--import'){
  importData();
}else if(process.argv[2] === '--delete'){
  deleteData();
}
