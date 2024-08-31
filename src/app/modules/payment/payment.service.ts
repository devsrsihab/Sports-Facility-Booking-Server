/* eslint-disable @typescript-eslint/no-explicit-any */
import { join } from 'path';
import { Booking } from '../booking/booking.model';
import { verifyPayment } from './payments.utils';
import { readFileSync } from 'fs';

// Create a Facilitie
const confirmationServiceBooking = async (transaction_id: any, status: string) => {
  const verifyResponse = await verifyPayment(transaction_id);
  if (verifyResponse && verifyResponse.pay_status === 'Successful') {
    await Booking.findOneAndUpdate({ transaction_id }, { status: 'confirmed' });
  }

  // Adjusted file paths to match your actual structure
  const orderSuccessfilePath = join(process.cwd(), 'src', 'app', 'view', 'orderSuccessful.html');
  const orderFailedfilePath = join(process.cwd(), 'src', 'app', 'view', 'orderFailed.html');

  try {
    // Reading the HTML templates
    const successTemplate = readFileSync(orderSuccessfilePath, 'utf-8');
    const failedTemplate = readFileSync(orderFailedfilePath, 'utf-8');

    // Returning the correct template based on the status
    if (status === 'Successful') {
      return successTemplate;
    } else {
      return failedTemplate;
    }
  } catch (error) {
    console.error('Error reading file:', error);
    throw error;
  }
};

export const PaymentServices = { confirmationServiceBooking };
