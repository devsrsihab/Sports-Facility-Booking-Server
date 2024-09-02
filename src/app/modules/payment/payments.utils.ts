/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import config from '../../config';

export const initialPayment = async (paymentData: any) => {
  const payload = {
    store_id: config.store_id,
    signature_key: config.signature_key,
    cus_name: 'Customer Name',
    cus_email: paymentData.userEmail,
    cus_phone: '01870******',
    amount: paymentData.amount,
    currency: 'BDT',
    tran_id: paymentData.tran_id,
    desc: `Payment for ${paymentData.userEmail} booking.`,
    success_url: `https://srs-sport-server.vercel.app/api/v1/payment/confirmation?tran_id=${paymentData.tran_id}&status=Successful`,
    fail_url: `https://srs-sport-server.vercel.app/api/v1/payment/confirmation?status=Failed`,
    cancel_url: 'https://srs-sport-client.vercel.app',
    type: 'json',
  };

  const response = await axios.post(config.payment_url!, payload);
  return response.data;
};

// verify payment
export const verifyPayment = async (tran_id: any) => {
  const response = await axios.get(config.payment_verify_url!, {
    params: {
      store_id: config.store_id,
      signature_key: config.signature_key,
      request_id: tran_id,
      type: 'json',
    },
  });
  return response.data;
};
