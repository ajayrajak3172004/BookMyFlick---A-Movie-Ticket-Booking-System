import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './configs/db.js'
import { clerkMiddleware } from '@clerk/express'

import showRouter from './routes/showRoutes.js'
import bookingRouter from './routes/bookingRoutes.js'
import adminRouter from './routes/adminRoutes.js'
import userRouter from './routes/userRoutes.js'
import webhookrouter from './routes/webhookRoute.js'
import bodyParser from 'body-parser';
import { stripeWebhhoks } from './controllers/stripeWebhooks.js'
import mongoose from "mongoose";
import { agenda, startAgenda } from "./jobs/agenda.js";




const app = express()
const PORT = 3000

await connectDB()


//Stripe webhook Route
app.use('/api/stripe',express.raw({ type: 'application/json' }),stripeWebhhoks)

// middleware

app.use(clerkMiddleware())
// app.use(ClerkExpressWithAuth());

app.use(express.json())

app.use(cors({
  origin: 'https://bookmyflick-rho.vercel.app', 
  credentials: true, 
}));



// app.use(cors())







// Api Rotes

app.get('/',(req,res)=>{
      res.send('Server is live')
})

// app.use("/api/inngest", serve({ client: inngest, functions }));

// app.use('/api/webhooks/clerk', bodyParser.raw({ type: '*/*' }));
app.use('/api/webhooks', webhookrouter);

app.use('/api/show',showRouter)
app.use('/api/booking',bookingRouter)
app.use('/api/admin',adminRouter)
app.use('/api/user',userRouter)



startAgenda().catch((err) => {
  console.error("Agenda start error", err);
});


app.listen(PORT,()=>{
    console.log(`Server is running :http://localhost:${PORT}`)
})