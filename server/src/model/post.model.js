import mongoose,{Schema} from "mongoose";

const postSchema=new Schema(
    {
        title:{
            type:String,
            required:true,
            trim:true
        },
        content:{
            type:String,
            required:true,
            trim:true
        },
        image:{
            type:String,
            required:true
        },
        views: {
            type: Number,
            default: 0
        },
        isPublished: {
            type: Boolean,
            default: true
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }

    }, 
    {
        timestamps: true
    }
)
export const Post=mongoose.model("Post",postSchema);