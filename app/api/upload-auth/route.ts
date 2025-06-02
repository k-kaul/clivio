import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { getUploadAuthParams } from "@imagekit/next/server";
import { NextResponse } from "next/server";

export async function GET(){
    const session = await getServerSession();
    if(!session?.user){
        return redirect("/login")
    }

    try {
        const {token, expire, signature} = getUploadAuthParams({
        privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string,
        publicKey: process.env.IMAGEKIT_PUBLIC_KEY as string,
        token: String(Math.random()*1000)
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