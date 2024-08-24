import QueryBuilder from '../../builder/QueryBuilder';
import { Category } from '../category/category.model';
import { TBook } from './book.interface';
import { Book } from './book.model';

// Create a book
const createBook = async (bookData: TBook) => {
  const result = await Book.create(bookData);
  return result;
};

// Get all books
const getAllBooks = async (query: Record<string, unknown>) => {
  const bookQuery = new QueryBuilder(Book.find().populate('createdBy').populate('category'), query)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await bookQuery.modelQuery;
  const meta = await bookQuery.countTotal();
  return {
    result,
    meta,
  };
};

// Get a book by ID
const getSingleBook = async (bookId: string): Promise<TBook | null> => {
  const result = await Book.findById(bookId).populate('createdBy').populate('category');
  return result;
};

// get all book by category
const getBooksByCategory = async (category: string) => {
  // exgtrat category id
  const categoryId = await Category.findOne({ name: category }, { _id: 1 });
  const result = await Book.find({ category: categoryId });
  return result;
};

// Update a book
const updateBook = async (bookId: string, updateData: Partial<TBook>): Promise<TBook | null> => {
  const updatedBook = await Book.findByIdAndUpdate(bookId, updateData, { new: true });
  return updatedBook;
};

// Delete a book
const deleteBook = async (bookId: string) => {
  const deleteBook = await Book.findByIdAndUpdate(bookId, { isDeleted: true });
  return deleteBook;
};

export const BookServices = {
  createBook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook,
  getBooksByCategory,
};
