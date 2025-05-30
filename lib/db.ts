import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL!;

if(!MONGODB_URL){
    throw new Error("Please add a MongoDb URL in env")
}

let cached = global.mongoose;

if(!cached){
    cached = global.mongoose = {connection:null, promise:null};
}

export async function connectToDatabase() {
    
    if(cached.connection){
        return cached.connection;
    }    
    if(!cached.promise){
        const options = {
            bufferCommands: true,
            maxPoolSize: 10
        }

    cached.promise = mongoose.connect(MONGODB_URL,options)
    .then(()=>mongoose.connection)
    }
    
    try {
        cached.connection = await cached.promise;
    } catch (error) {
        cached.promise = null;
        throw new Error("Error in DB file")
    }

    return cached.connection;
}