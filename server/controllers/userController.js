import { clerkClient } from "@clerk/express";
import Booking from "../models/Booking.js";
import Movie from "../models/Movie.js";
import User from "../models/User.js";


//Api function  to get user bookings

export const getUserBookings = async(req,res)=>{
    try {
        const user = req.headers['userid'];

        const bookings = await Booking.find({user}).populate({
            path:'show',
            populate:{path:'movie'}
        }).sort({ createdAt: -1 });
      res.json({ success: true, bookings})

    } catch (error) {
         console.log(error)
        res.json({ success: false, message: error.message })
    }
}


//Api function  to add/update user favorite movie in the clerk user Metadata

export const updateFavorite = async(req,res)=>{
    try {
        const {movieId} = req.body
        // const userId = req.auth().userId;
          const userId = req.headers['userid']

       const user = await clerkClient.users.getUser(userId)
        //  console.log('user',user)
       if(!user.privateMetadata.favorites){
        user.privateMetadata.favorites = []
       }
        //  console.log('user', user.privateMetadata.favorites)
        if(!user.privateMetadata.favorites.includes(movieId)){   //adding movie

        user.privateMetadata.favorites.push(movieId)

       }else{   //removing movie

         user.privateMetadata.favorites =  user.privateMetadata.favorites.filter(item =>item!==movieId)    
       }

       await clerkClient.users.updateUserMetadata(userId,{privateMetadata:user.privateMetadata})

        res.json({ success: true, message: "Favorite movies updated." })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


//Api function  to get  user's favorite movies

export const getFavorite = async(req,res)=>{
    try {
        
      
        const userId = req.headers['userid']
         const user = await clerkClient.users.getUser(userId);
       const favorites = user.privateMetadata.favorites;
      //  console.log(favorites)
      
        const movies = await Movie.find({_id:{$in:favorites}})
         const orderedMovies = favorites
      .map(id => movies.find(m => m._id.toString() === id))
      .filter(Boolean);
        res.json({ success: true, movies:orderedMovies })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}








