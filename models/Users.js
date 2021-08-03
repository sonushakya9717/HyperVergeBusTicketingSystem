const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
		lowercase:true,
        required: true,
        Unique: true,
		index:true
    },
    password: {
        type: String,
        required:true,
        match:/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,1024}$/
    },
    isAdmin: {
        type: Boolean,
        default:false
    },
},{ 
    timestamps: true
   })

const User = mongoose.model('users', UserSchema);

module.exports = User;