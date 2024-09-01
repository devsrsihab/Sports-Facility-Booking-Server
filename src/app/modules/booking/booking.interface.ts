import { Types } from 'mongoose';

export interface TBooking {
  facility: Types.ObjectId;
  user: Types.ObjectId;
  userEmail: string;
  bookingDate: string;
  startTime: string;
  endTime: string;
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  transaction_id: string;
}
