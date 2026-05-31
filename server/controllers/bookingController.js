
import Show from "../models/Show.js"
import Booking from "../models/Booking.js";
import stripe from 'stripe'
import { agenda } from "../jobs/agenda.js";


const checkSeatsAvailability = async (showId, selectedSeats) => {
    try {

        const ShowData = await Show.findById(showId)
        if (!ShowData) return false
        const occupiedSeats = ShowData.occupiedSeats;
        const isAnySeatsTaken = selectedSeats.some(seat => occupiedSeats[seat])

        return !isAnySeatsTaken

    } catch (error) {
        console.log(error)
        return false
    }
}

export const createBooking = async (req, res) => {
    try {

        const userId = req.headers['userid']
        const { showId, selectedSeats } = req.body;
        const { origin } = req.headers

        //Now checkin for seats Availability
        const isAvailable = await checkSeatsAvailability(showId, selectedSeats)

        if (!isAvailable) {
            return res.json({ success: false, message: "Selected seats are not Available." })
        }

        const showData = await Show.findById(showId).populate('movie')

        const booking = await Booking.create({
            user: userId,
            show: showId,
            amount: showData.showPrice * selectedSeats.length,
            bookedSeats: selectedSeats,
        })

        selectedSeats.map((seat) => {
            showData.occupiedSeats[seat] = userId
        })

        showData.markModified('occupiedSeats')
        await showData.save()

        //stripe gateway initialize

        const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY)

        //  creating line items it for stripe
        const line_item = [{
            price_data: {
                currency: 'usd',
                product_data: {
                    name: showData.movie.title
                },
                unit_amount: Math.floor(booking.amount) * 100
            },
            quantity: 1
        }]

        const session =  await stripeInstance.checkout.sessions.create({
            success_url: `${origin}/loading/my-bookings`,
            cancel_url: `${origin}/my-bookings`,
            line_items: line_item,
            mode: 'payment',
            metadata: {
                bookingId: booking._id.toString(),
                showId: showId.toString(),
                userId: userId.toString(),
            },
            expires_at: Math.floor(new Date() / 1000) + 30 * 60 //Expires in 30 min
        })

        booking.paymentLink = session.url
        await booking.save()
        


// schedule cancellation for 10 minutes later
    const runAt = new Date(Date.now() + 10 * 60 * 1000);
    await agenda.schedule(runAt, "cancel-unpaid-booking", { bookingId: booking._id.toString() });

        res.json({ success: true, url: session.url })

    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}

export const getOccupiedSeats = async (req, res) => {
    try {

        const { showId } = req.params
        const showData = await Show.findById(showId)

        const occupiedSeats = Object.keys(showData.occupiedSeats)
        res.json({ success: true, occupiedSeats })

    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}