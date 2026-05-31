import Booking from "../models/Booking.js";
import Show from "../models/Show.js";
import User from "../models/User.js";







export const handleClerkWebhook = async (req, res) => {
 

     const event = req.body;
    const { type, data } = event;
  
    try {
      
    

    if (type === 'user.created') {
      const { id, email_addresses, first_name, last_name, image_url } = data;

      const existingUser = await User.findOne({ clerkId: id });
      if (!existingUser) {
        await User.create({
          clerkId: id,
          email: email_addresses[0]?.email_address || '',
          fullName: `${first_name || ''} ${last_name || ''}`.trim(),
          image: image_url,
          role: 'user', // default role
        });
      }
    }

    else if (type === 'user.updated') {
      const { id, email_addresses, first_name, last_name, image_url } = data;


      await User.findOneAndUpdate(
        { clerkId: id },
        {
          email: email_addresses[0]?.email_address || '',
          fullName: `${first_name || ''} ${last_name || ''}`.trim(),
          image: image_url,
        },
        { new: true }
      );
    }

    else if (type === 'user.deleted') {
      const { id } = data;
      await User.findOneAndDelete({ clerkId: id });
    } 
    else if(type=='app/checkPayment'){

    }

    res.status(200).json({ success: true });

    } catch (error) {
       console.log(error)
        res.status(500).json({ success: false,message:'DB Error.' });
    }
  
}


