import { Types } from 'mongoose';

export interface TBooking {
  facility: Types.ObjectId;
  user: Types.ObjectId;
  bookingDate: string;
  startTime: string;
  endTime: string;
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'cancelled';
}
