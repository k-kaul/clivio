"use client"

import { useEffect, useState } from "react";
import UploadComponent from "./components/UploadComponent";
import { VideoInterface } from "@/models/Video";
import { apiClient } from "@/lib/api-client";
import { Image, Video } from "@imagekit/next";
import { redirect } from "next/navigation";

export default function Home() {
  
  const [vidoes,setVideos] = useState<VideoInterface[]>([])

  //loading all videos on first render/reload

  useEffect(()=>{
    const fetchVideos = async () =>{
      try {
        const data = await apiClient.getVideos()
        setVideos(data)
      } catch (error) {
        redirect("/login")
        throw new Error("Error Fetching videos")
      }
    }

    fetchVideos()
  },[])

  return (
    <div>
      <h1>Root page.tsx</h1>  
      <Image
      urlEndpoint="https://ik.imagekit.io/iktdukrlb/" 
      src="/default-image.jpg?updatedAt=1748869615392"
      width={500}
      height={500}
      alt="Picture of the author"
    />    
      <Video
      urlEndpoint="https://ik.imagekit.io/iktdukrlb/"
      src="/sample-video.mp4?updatedAt=1748869616143"
      controls
      width={500}
      height={500}
    />
    </div>
  );
}
