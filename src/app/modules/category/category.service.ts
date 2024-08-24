import { TCategory } from './category.interface';
import { Category } from './category.model';

// Create a Category
const createCategory = async (CategoryData: TCategory) => {
  const newCategory = new Category(CategoryData);
  const savedCategory = await newCategory.save();
  return savedCategory;
};

// Get all Categorys
const getAllCategorys = async (): Promise<TCategory[]> => {
  const result = await Category.find();
  return result;
};

// Get a Category by ID
const getCategoryById = async (CategoryId: string): Promise<TCategory | null> => {
  const result = await Category.findById(CategoryId);
  return result;
};

// Update a Category
const updateCategory = async (CategoryId: string, updateData: Partial<TCategory>): Promise<TCategory | null> => {
  const updatedCategory = await Category.findByIdAndUpdate(CategoryId, updateData, { new: true });
  return updatedCategory;
};

// Delete a Category
const deleteCategory = async (CategoryId: string) => {
  const deleteCategory = await Category.findByIdAndUpdate(CategoryId, { isDeleted: true });
  return deleteCategory;
};

export const CategoryServices = {
  createCategory,
  getAllCategorys,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
