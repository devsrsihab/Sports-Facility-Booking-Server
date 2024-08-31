import express from 'express';
import { PaymentControllers } from './payment.controller';

const router = express.Router();

// Create Facilitie (POST)
router.post('/confirmation', PaymentControllers.showSuccessPage);

export const PaymentRoute = router;
