// jobs/agenda.js
import Agenda from "agenda";
import mongoose from "mongoose";
import Booking from "../models/Booking.js";
import Show from "../models/Show.js";

export const agenda = new Agenda({
  db: { address: process.env.MONGODB_URI, collection: "agendaJobs" },
  // optional: processEvery: "30 seconds",
});

agenda.define("cancel-unpaid-booking", async (job) => {
  const { bookingId } = job.attrs.data || {};
  if (!bookingId) return;

  // Re-fetch fresh data
  const booking = await Booking.findById(bookingId);
  if (!booking) return; // already deleted manually or by other flow
  if (booking.isPaid) return; // already paid, do nothing

  const show = await Show.findById(booking.show);
  if (show) {
    // Remove seats from occupiedSeats
    if (Array.isArray(show.occupiedSeats)) {
      show.occupiedSeats = show.occupiedSeats.filter(
        (s) => !booking.bookedSeats.includes(s)
      );
    } else if (show.occupiedSeats && typeof show.occupiedSeats === "object") {
      for (const seat of booking.bookedSeats) {
        delete show.occupiedSeats[seat];
      }
      show.markModified("occupiedSeats");
    }
    await show.save();
  }

  await Booking.findByIdAndDelete(booking._id);
});

export async function startAgenda() {
  await agenda.start();
  // optional logging
  console.log("Agenda started");
}
