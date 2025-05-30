import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";

export interface UserInterface{
    _id?: mongoose.Types.ObjectId;
    email: string;
    password: string;
    createdAt?: Date;
    updateAt?: Date;
}

const userSchema = new Schema<UserInterface>(
    {
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true}
    }, 
    {
        timestamps:true
    }
); 

userSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,10)
    }
    next()
}); 

const User = mongoose.models?.User || mongoose.model<UserInterface>("User",userSchema);