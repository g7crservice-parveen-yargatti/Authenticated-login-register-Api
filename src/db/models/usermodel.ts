import { Schema, model } from "mongoose";

const userSchema = new Schema({
    username: String,
    fullname:String,
    password: String,
    userID:String,
})

const UserModel = model('users', userSchema)
export default UserModel

