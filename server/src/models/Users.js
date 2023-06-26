import mongoose from 'mongoose';

const {Schema,model} = mongoose;

const userSchema = new Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    mobile:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
        minlength:8,
        maxlength:15
    }
},{timestamps:true});

const User = model('User', userSchema);

export default User;