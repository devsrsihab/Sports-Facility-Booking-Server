/* eslint-disable @typescript-eslint/no-explicit-any */
import { join } from 'path';
import { readFileSync } from 'fs';
import { Booking } from '../booking/booking.model';
import { verifyPayment } from './payments.utils';

const confirmationServiceBooking = async (transaction_id: any, status: string) => {
  const verifyResponse = await verifyPayment(transaction_id);
  if (verifyResponse && verifyResponse.pay_status === 'Successful') {
    await Booking.findOneAndUpdate({ transaction_id }, { status: 'confirmed' });
  }

  // Use different paths depending on the environment
  let orderSuccessfilePath: string;
  let orderFailedfilePath: string;

  if (process.env.NODE_ENV === 'production') {
    orderSuccessfilePath = join(process.cwd(), 'public', 'orderSuccessful.html');
    orderFailedfilePath = join(process.cwd(), 'public', 'orderFailed.html');
  } else {
    orderSuccessfilePath = join(process.cwd(), 'src', 'app', 'view', 'orderSuccessful.html');
    orderFailedfilePath = join(process.cwd(), 'src', 'app', 'view', 'orderFailed.html');
  }

  try {
    // Reading the HTML templates
    const successTemplate = readFileSync(orderSuccessfilePath, 'utf-8');
    const failedTemplate = readFileSync(orderFailedfilePath, 'utf-8');

    // Returning the correct template based on the status
    return status === 'Successful' ? successTemplate : failedTemplate;
  } catch (error) {
    console.error('Error reading file:', error);
    throw error;
  }
};

export const PaymentServices = { confirmationServiceBooking };
