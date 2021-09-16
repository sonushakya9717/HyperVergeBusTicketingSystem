const express = require('express');
const connectDB = require('./config/db')
const app = express();
const path = require('path')
require("dotenv").config()


app.use(express.json({ extended: false }));
// body parser
connectDB()

const busSearchRoutes = require('./routes/busSearch')
app.use('/api/buses',busSearchRoutes);

const userRoutes = require('./routes/users')
app.use('/api/users',userRoutes);


const adminRoutes = require('./routes/admins')
app.use('/api/admins/admin',adminRoutes)

app.use("/",require('./routes/getLocation'))

app.use((req,res,next)=>{
    console.log("next called without anything")
    next()
})

app.use((err,req,res,next)=>{
    res.status(err.status || 500).json(err)
})

// error handler should be the last middleware with app.use
  
// Serve static assets in production
if(process.env.NODE_ENV === 'production'){
    // Set static folder
    app.use(express.static(path.join(__dirname, "frontend", "build")));

    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    });
}


const PORT = process.env.PORT || 4000;

app.listen(PORT,()=>{
    console.log(`Server is running at port ${PORT}`)
})

module.exports = app;