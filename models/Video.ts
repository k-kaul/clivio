import mongoose, {Schema } from "mongoose";

export const VIDEO_DIMENSIONS = {
    width: 1080, 
    height: 1920
} as const

export interface VideoInterface {
    _id?: mongoose.Types.ObjectId; 
    title: string; 
    description: string; 
    videoUrl: string;
    thumbnailUrl: string; 
    contorls?: boolean
    transformation?: {
        height: number; 
        width: number; 
        quality? : number;
    }
    createdAt?: Date;
    updateAt?: Date;
}


const videoSchema = new Schema<VideoInterface>(
    {
    title: {type: String, required: true},
    description: {type: String, required: true},
    videoUrl: {type:String, required: true},
    thumbnailUrl: {type: String, required: true},
    contorls: {type:Boolean, default: true},
    transformation: {
        height: {type: Number, default: VIDEO_DIMENSIONS.height},
        width: {type: Number, default: VIDEO_DIMENSIONS.width},
        quality: {type: Number, min: 1, max: 100}
    }    
    }, { timestamps: true }
)

const Video = mongoose.models?.Video || mongoose.model<VideoInterface>("Video",videoSchema)