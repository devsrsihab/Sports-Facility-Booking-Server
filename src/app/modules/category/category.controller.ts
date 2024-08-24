import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CategoryServices } from './category.service';

// Create
const createCategory = catchAsync(async (req, res) => {
  const CategoryData = req.body;
  CategoryData.name = CategoryData.name.trim().toLowerCase();
  const result = await CategoryServices.createCategory(CategoryData);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Category created successfully',
    data: result,
  });
});

// Read All
const getAllCategories = catchAsync(async (req, res) => {
  const result = await CategoryServices.getAllCategorys();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Categorys retrieved successfully',
    data: result,
  });
});

// Read One
const getCategoryById = catchAsync(async (req, res) => {
  const categoryId = req.params.categoryId;
  const result = await CategoryServices.getCategoryById(categoryId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category retrieved successfully',
    data: result,
  });
});

// Update
const updateCategory = catchAsync(async (req, res) => {
  const categoryId = req.params.categoryId;
  const updateData = req.body;
  const result = await CategoryServices.updateCategory(categoryId, updateData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category updated successfully',
    data: result,
  });
});

// Delete
const deleteCategory = catchAsync(async (req, res) => {
  const categoryId = req.params.categoryId;
  const result = await CategoryServices.deleteCategory(categoryId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category deleted successfully',
    data: result,
  });
});

export const CategoryControllers = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
