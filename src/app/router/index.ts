import { Router } from 'express';
import { UserRoute } from '../modules/user/user.route';
import { AdminRoute } from '../modules/admin/admin.route';
import { AuthRoute } from '../modules/auth/auth.route';
import { BookRoute } from '../modules/book/book.route';
import { CategoryRoute } from '../modules/category/category.route';
import { BorrowRoute } from '../modules/borrow/borrow.route';

const router = Router();

// all routes
const moduleRoutes = [
  {
    path: '/users',
    route: UserRoute,
  },
  {
    path: '/admins',
    route: AdminRoute,
  },
  {
    path: '/auth',
    route: AuthRoute,
  },
  {
    path: '/books',
    route: BookRoute,
  },
  {
    path: '/category',
    route: CategoryRoute,
  },
  {
    path: '/borrowings',
    route: BorrowRoute
  },
];

// travers the all route
moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
