import { getServerSession } from "next-auth";
import { getUploadAuthParams } from "@imagekit/next/server";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";

export async function GET(){
    const session = await getServerSession(authOptions);
    if(!session?.user){
        return NextResponse.redirect("/login")
    }

    try {
        const {token, expire, signature} = getUploadAuthParams({
            privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string,
            publicKey: process.env.IMAGEKIT_PUBLIC_KEY as string,
            token: Math.random().toString()
        })
        return NextResponse.json({
            token,
            expire,
            signature,
            publicKey: process.env.IMAGEKIT_PUBLIC_KEY
        })
    } catch (error) {
        return NextResponse.json({
            message: "Error in ImageKit Auth File"
        })  
    }
}