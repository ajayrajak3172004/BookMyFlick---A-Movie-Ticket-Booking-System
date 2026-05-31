import stripe from 'stripe'
import Booking from '../models/Booking.js'

export const stripeWebhhoks = async (request,response) =>{
    const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY )
    const sig = request.headers['stripe-signature']

    try {
        Event = stripeInstance.webhooks.constructEvent(request.body,sig, process.env.STRIPE_WEBHOOK_SECRET)
    } catch (error) {
        return response.status(400).send(`webhook Error: ${error.message}`)
    }

    try {
        
        switch (Event.type) {
            case 'payment_intent.succeeded':{
                const paymentIntent = Event.data.object
                const sessionList = await stripeInstance.checkout.sessions.list({
                    payment_intent: paymentIntent.id
                })
                const session = sessionList.data[0]
                const {bookingId} = session.metadata

                await Booking.findByIdAndUpdate(bookingId,{
                    isPaid:true,
                    paymentLink: ''
                })

                 break;
            }
                
               
        
            default:
                console.log('Unhandled event type',Event.type)
        }

        response.json({received:true})
    } catch (error) {
        console.error('Webhook processing error',error)
    }
}