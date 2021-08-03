const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURL');

const connectDB = async () => {
    if(process.env.NODE_ENV === 'test'){
    const { MongoMemoryServer } = require('mongodb-memory-server');
    const mongod = new MongoMemoryServer()
    
    module.exports.connect = async () => {
        const uri = await mongod.getUri();
        console.log(uri)
        const mongooseOpts = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        }
        await mongoose.connect(uri,mongooseOpts)
        console.log("connected")
    }

    module.exports.closeDatabase = async () => {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
        await mongod.stop()
    }

    module.exports.clearDatabase = async () => {
        const collections = mongoose.connection.collections;
        for(const key in collections) {
            const collection = collections[key];
            await collection.deleteMany()
        }
    }
    }else{
        try {
            await mongoose.connect(db,
                {
                    useNewUrlParser: true
                    , useUnifiedTopology: true
                    , useCreateIndex: true,
                    useFindAndModify: false
                });
            console.log("MongoDB Connected");
        } catch (err) {
            console.error(err.message);
            process.exit(1);
        }
    
    }
    }
    

module.exports = connectDB;

