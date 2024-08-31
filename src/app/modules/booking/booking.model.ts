import { Schema, model } from 'mongoose';
import { TBooking } from './booking.interface';

// Create the schema for the Facility model
const bookingSchema = new Schema<TBooking>(
  {
    facility: { type: Schema.Types.ObjectId, ref: 'Facilitie', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    bookingDate: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled'],
      default: 'pending',
    },
    transaction_id: { type: String, required: true },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  },
);

export const Booking = model<TBooking>('Booking', bookingSchema);
