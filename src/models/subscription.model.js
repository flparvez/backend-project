import mongoose, { Schema } from "mongoose"

const subscriptionSchema = new Schema({

    subscriber: {
        type: Schema.Types.ObjectId, //WHo Is SUbscribing
        ref: "User"
    },
    channel: {
        type: Schema.Types.ObjectId, // One To WHom  "SUbsciber " is subscribing
        ref: "User"
    }


}, { timestamps: true })

export const Subscription = mongoose.model("Subscription", subscriptionSchema)