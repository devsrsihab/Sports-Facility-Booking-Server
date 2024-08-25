import express from 'express';
import { FacilitieValidation } from './facilitie.validation'; // Assuming FacilitieValidation exists with validation schemas
import validateRequest from '../../middlewares/validateRequest';
import { FacilitieControllers } from './facilitie.controller';

const router = express.Router();

// Create Facilitie (POST)
router.post(
  '/',
  validateRequest(FacilitieValidation.createFacilitieValidationSchema),
  FacilitieControllers.createFacilitie,
);

// // Read All Facilities (GET)
router.get('/', FacilitieControllers.getAllFacilities);
// router.get('/Facilitieebycat/:categoryName', FacilitieControllers.getFacilitiesByCategory);

// Read Single Facilitie (GET)
router.get('/:facilitieId', FacilitieControllers.getSingleFacilitie);

// Update Facilitie (PUT)
router.patch(
  '/:facilitieId',
  validateRequest(FacilitieValidation.updateFacilitieValidationSchema),
  FacilitieControllers.updateFacilitie,
);

// Delete Facilitie (DELETE)
router.delete(
  '/:facilitieId',
  FacilitieControllers.deleteFacilitie,
);

export const FacilitieRoute = router;
