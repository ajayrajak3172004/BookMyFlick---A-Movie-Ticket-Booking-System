import { clerkClient } from '@clerk/express'
import User from '../models/User.js';


export const protectAdmin = async (req, res, next) => {

  try {
      // console.log("🔥 Headers:", req.headers);
      const userId = req.headers['userid']

    // const { userId } = req.userId || {};


     if (!userId) {
      return res.status(401).json({ success: false, message: 'User ID missing' });
    }
  
    //  console.log('user:', userId);

    const user = await clerkClient.users.getUser(userId);
   
      // console.log(user.privateMetadata.role)
      
    if(user.privateMetadata.role !=='admin'){
      return res.json({ success: false, message: 'Not Authorized' })
    }
   
             
    next()

  } catch (error) {
    console.log(error)
    return res.json({ success: false, message: 'Not Authorized' })
  }
}