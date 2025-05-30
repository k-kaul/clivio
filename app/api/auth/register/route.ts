import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import {User} from "@/models/User"
import { error } from "console";

export async function POST(req:NextRequest) {
    try {
        const {email, password} = await req.json();

        if(!email || !password){
            return NextResponse.json({
                error: "Need Email and Password"
            }, 
        {status: 400})
        }
        await connectToDatabase();

        const existingUser = await User.findOne({email})
        if(existingUser){
            return NextResponse.json({
                error: "User Already Exists"
            }, 
            {
                status:400
            }
            )
        }

        await User.create({
            email, 
            password
        })
        return NextResponse.json({
                message: "New User Created!"
            }, 
            {
                status:200
            }
            )


    } catch (error) {
        return NextResponse.json({
                error: "Failed to Create New User"
            }, 
            {
                status:400
            }
            )
    }
}