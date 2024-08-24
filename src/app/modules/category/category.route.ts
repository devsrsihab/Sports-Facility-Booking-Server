import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CategoryControllers } from './category.controller';
import { CategoryValidation } from './category.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

// Create category (POST)
router.post(
  '/',
  auth(USER_ROLE.admin),
  validateRequest(CategoryValidation.createCategoryValidationSchema),
  CategoryControllers.createCategory,
);

// Read All Category (GET)
router.get('/', CategoryControllers.getAllCategories);

// Read Single category (GET)
router.get('/:categoryId', CategoryControllers.getCategoryById);

// Update category (PUT)
router.put(
  '/:categoryId',
  auth(USER_ROLE.admin),
  validateRequest(CategoryValidation.updateCategoryValidationSchema),
  CategoryControllers.updateCategory,
);

// Delete category (DELETE)
router.delete('/:categoryId', auth(USER_ROLE.admin), CategoryControllers.deleteCategory);

export const CategoryRoute = router;
