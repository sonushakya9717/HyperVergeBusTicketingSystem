

const demo = (req,res)=>{

    const {message} = req.body;

    if(message==="hello world"){
        return res.status(200).json({msg:"Jay shree Ram"})
    }
    else{
        return res.status(600).json({msg:"Vinashkaal bisreet bhuddi"})

    }
}

module.exports = { demo }