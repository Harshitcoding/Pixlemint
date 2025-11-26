const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    type : {
        type : String,
        enum :['user','ai'],
        required:true
    },
    content:{
        type:String,
        required:true
    },
    timeStamp : {
        type : Date,
        default:Date.now
    }
})

const ChatSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        default: 'New Chat'
    },
    preview: {
        type: String,
        default: ''
    },
    messages: [MessageSchema]
}, 
{
    timestamps: true  // Automatically adds createdAt and updatedAt
});