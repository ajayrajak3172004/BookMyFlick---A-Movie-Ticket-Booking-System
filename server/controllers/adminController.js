import Booking from "../models/Booking.js"
import Show from "../models/Show.js";
import User from "../models/User.js";


//Api to check if user is admin
export const isAdmin = (req, res) => {
    res.json({ success: true, isAdmin: true })
}

//Api to get dashboard data

export const getDashboardData = async (req, res) => {
    // console.log('Inthe getdashboard function')
    try {


        const bookings = await Booking.find({ isPaid: true });
        const activeShows = await Show.find({ showDateTime: { $gte: new Date() } }).populate('movie');

        const totalUsers = await User.countDocuments()

        const dashboardData = {
            totalBookings: bookings.length,
            totalRevenue: bookings.reduce((acc, booking) => acc + booking.amount, 0),
            activeShows,
            totalUsers
        }
        res.json({ success: true, dashboardData })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


//Api to get all shows

export const getAllShows = async (req, res) => {
    //  console.log('Inthe getallshows function')
    try {
        // const shows = await Show.find({showDateTime:{$gte:new Date()}}).populate('movie').sort({showDateTime:1});
        const shows = await Show.find().populate('movie').sort({ showDateTime: 1 });


        res.json({ success: true, shows })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}



//Api to get all bookings

export const getAllBookings = async (req, res) => {
    try {
        // const shows = await Show.find({showDateTime:{$gte:new Date()}}).populate('movie').sort({showDateTime:1});
        const bookings = await Booking.find({isPaid: true})
            .populate({
                path: 'user',
                model: 'User',
                localField: 'user',       // Booking.user (clerkId string)
                foreignField: 'clerkId',  // User.clerkId
                justOne: true             // return a single user
            })
            .populate({
                path: 'show',
                populate: { path: 'movie' }
            })
            .sort({ createdAt: -1 });



        res.json({ success: true, bookings })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}



