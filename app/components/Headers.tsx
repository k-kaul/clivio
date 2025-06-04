"use client"
import { signOut, useSession } from "next-auth/react"
import Link from "next/link";

export default function Header(){
    const {data} = useSession();
    const session = useSession();
    
    return <div>
        <button onClick={()=>{signOut}}>Sign Out</button>
        {session ? (
            <div>Welcome</div>
        ):(
            <div>
                <Link href="/login"></Link>
                <Link href="/register"></Link>
            </div>
        )}
    </div>
}