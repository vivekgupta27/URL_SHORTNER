const mongoose=require('mongoose')
const shortid = require('shortid');
const uri = 'mongodb://localhost:27017/Url';

mongoose.connect(uri)
  .then(() => console.log('Successfully connected to MongoDB'))
  .catch(err => console.error('Connection error', err));

const UrlSchema=mongoose.Schema({
    full:{
        type:String,
        required:true,
        unique:true
    },
    short:{
        type:String,
        required:true,
        default:()=>shortid.generate(),
    },
    click:{
        type:Number,
        default:0,
        required:true,
    }
})

module.exports=mongoose.model('short',UrlSchema);