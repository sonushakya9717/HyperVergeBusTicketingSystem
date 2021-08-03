const mongoose=require('mongoose')

const Reviews = new mongoose.Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:User
    },
    text:{
          type:String,
          required:true
    },
    date:{
           type: Date,
           default: Date.now
        },
    busId:{
        type:Schema.Types.objectId,
        ref:Buses
        }
},{ 
    timestamps: true
   })

const Review = mongoose.model('reviews', reviewsSchema)
module.exports = Review
