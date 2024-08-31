import catchAsync from '../../utils/catchAsync';
import { PaymentServices } from './payment.service';

// Create
const showSuccessPage = catchAsync(async (req, res) => {
  const { tran_id, status } = req.query;
  console.log(tran_id, status);
  const result = await PaymentServices.confirmationServiceBooking(tran_id, status as string);
  res.send(result);
});

export const PaymentControllers = { showSuccessPage };
