/* eslint-disable @typescript-eslint/no-explicit-any */
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { ViewerServices } from './viewer.service';

// get all viewer conroller
const getViewer = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await ViewerServices.getAllViewersFromDB(query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'viewer get successfully',
    meta: result.meta,
    data: result.result,
  });
});

// get single viewer controller
const getSingleViewer = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ViewerServices.getSingleViewerFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'single viewer get successfully',
    data: result || 'no data found',
  });
});

// update viewer controller
const updateViewer = catchAsync(async (req, res) => {
  const { viewerId } = req.params;
  const { viewer } = req.body;
  const result = await ViewerServices.updateViewerToDB(viewerId, viewer);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'viewer updated successfully',
    data: result || 'no data found',
  });
});

// delte single viewer controller
const deleteViewer = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ViewerServices.deleteViewerFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'viewer deleted successfully',
    data: result,
  });
});

export const ViewerController = {
  getViewer,
  getSingleViewer,
  updateViewer,
  deleteViewer,
};
