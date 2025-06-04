import { VideoInterface } from "@/models/Video";

type FetchOptions = {
    method?: "GET" | "POST" | "PUT" | "DELETE";
    body? :any;
    headers?: Record<string,string>
}

export type VideoFormData = Omit<VideoInterface,"_id">

class ApiClient{
    private async myFetch<T>(
        endpoint: string,
        options: FetchOptions = {}
    ): Promise<T>{

        const {method = "GET", body, headers = {}} = options;
        const defaultHeaders = {
            "Content-Type": "application/json",
            ...headers
        }

        const response = await fetch(`/api${endpoint}`, {
            method,
            headers,
            body: body ? JSON.stringify(body): undefined
        })

        if(!response.ok){
            throw new Error(await response.text())
        }
        return response.json();
    }

    async getVideos(){
       return this.myFetch<VideoInterface[]>("/videos")
    }

    async getVideo(id:string){
        return this.myFetch<VideoInterface>(`/videos${id}`)
    }

    async createVideo(videoData:VideoFormData){
        return this.myFetch("/videos", {
            method: "POST",
            body: videoData
        })
    }

}

export const apiClient = new ApiClient()