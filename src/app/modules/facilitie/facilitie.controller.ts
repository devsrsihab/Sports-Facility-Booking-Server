import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { FacilitieServices } from './facilitie.service';

// Create
const createFacilitie = catchAsync(async (req, res) => {
  const FacilitieData = req.body;
  const result = await FacilitieServices.createFacilitie(FacilitieData);
  // const result = 'none';
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Facilitie created successfully',
    data: result,
  });
});

// Read All
const getAllFacilities = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await FacilitieServices.getAllFacilities(query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Facilities retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});



// Read One
const getSingleFacilitie = catchAsync(async (req, res) => {
  const {facilitieId} = req.params;
  const result = await FacilitieServices.getSingleFacilitie(facilitieId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Facilitie retrieved successfully',
    data: result,
  });
});


// getAvailabilitySlots
const getAvailabilitySlots = catchAsync(async (req, res) => {
  const result = await FacilitieServices.getAvailabilitySlots(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get all Availabe Slots successfully',
    data: result,
  });
});

// Update
const updateFacilitie = catchAsync(async (req, res) => {
  const {facilitieId} = req.params;
  const updateData = req.body;
  const result = await FacilitieServices.updateFacilitie(facilitieId, updateData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Facilitie updated successfully',
    data: result,
  });
});

// Delete
const deleteFacilitie = catchAsync(async (req, res) => {
  const {facilitieId} = req.params;
  const result = await FacilitieServices.deleteFacilitie(facilitieId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Facilitie deleted successfully',
    data: result,
  });
});

export const FacilitieControllers = {
  createFacilitie,
  getAllFacilities,
  getSingleFacilitie,
  updateFacilitie,
  deleteFacilitie,
  getAvailabilitySlots,
};
