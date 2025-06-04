import mongoose from "mongoose";

const DATABASE_URL = process.env.DATABASE_URL!;

if(!DATABASE_URL){
    throw new Error("Please add a MongoDb URL in env")
}

let cached = global.mongoose;

if(!cached){
    cached = global.mongoose = {connection:null, promise:null};
}

export async function connectToDatabase() {
     console.log("Connecting to DB...");
    if(cached.connection){
         console.log("Using cached DB connection");
        return cached.connection;
    }    
    if(!cached.promise){
        const options = {
            bufferCommands: true,
            maxPoolSize: 10
        }

    cached.promise = mongoose
    .connect(DATABASE_URL,options)
    .then(() => {
        console.log("Mongo connected");
        return mongoose.connection;
      });
    }
    
    try {
        cached.connection = await cached.promise;
    } catch (error) {
        cached.promise = null;
        throw new Error("Error in DB file")
    }

    return cached.connection;
}