import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const VideoSchema = new Schema(
    {
        videoFile: {
            type: String, //cloudinary
            required: true
        },

        thumbnail: {
            type: String, //cloudinary
            required: true
        },

        description: {
            type: String,
            required: true
        },
        duration: {
            type: Number, //Cloudinary
            required: true
        },
        views: {
            type: Number,
            default: 0,

        },

        isPublished: {
            type: Boolean
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

VideoSchema.plugin(mongooseAggregatePaginate)


export const Video = mongoose.model("Video", VideoSchema)