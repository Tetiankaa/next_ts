import mongoose, {Schema} from "mongoose";

export interface IUser extends Document{
    email:string,
    password:string,
    createdAt:Date,
    updatedAt:Date,
    id:string
}
const userSchema = new Schema({
    email:{type:String, required:true},
    password:{type:String, required:false}
}, {timestamps:true})

let User:mongoose.Model<IUser>;

try {
    // Try to get the existing model from mongoose
    User = mongoose.model<IUser>('User')
}catch {
    // If the model doesn't exist, define it
    User = mongoose.model<IUser>('User',userSchema)
}

export default User;