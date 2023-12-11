import {model, models, Schema, Types} from "mongoose";

export interface PromptDocument extends Document{
    creator:Types.ObjectId,
    prompt:string,
    tag:string
}

const PromptSchema = new Schema({
        creator:{
            type:Schema.Types.ObjectId,
            ref:'User'
        },
        prompt:{
            type: String,
            required:[true,'Prompt is required']
        },
        tag:{
            type:String,
            required: [true,'Tag is required']
        }
})

const Prompt = models.Prompt || model<PromptDocument>('Prompt',PromptSchema);

export default Prompt;