const mongoose=require('mongoose')

const agencySchema= new mongoose.Schema({
    
    agent:{
        type:mongoose.Schema.Types.ObjectId, 
        ref:'users'
    },
    phone:{
        type:Number,
        require:true
    },
    agencyName:{
        type:String ,
        require:true,
		index:true
    },
    headOfficeLocation:{
        type:String
    }

},{ 
    timestamps: true
   })
const Agency=mongoose.model('agencies',agencySchema)
module.exports=Agency
