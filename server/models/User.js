// models/User.js
import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  
  clerkId: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  image:{
    type: String,
    
  },
  
}, { timestamps: true })



 const User = mongoose.model("User",userSchema);

 export default User;