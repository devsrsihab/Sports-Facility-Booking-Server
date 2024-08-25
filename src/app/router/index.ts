import { Router } from 'express';
import { AdminRoute } from '../modules/admin/admin.route';
import { AuthRoute } from '../modules/auth/auth.route';
import { BookRoute } from '../modules/book/book.route';
import { FacilitieRoute } from '../modules/facilitie/facilitie.route';
import { BookingRoute } from '../modules/booking/booking.route';

const router = Router();

// all routes
const moduleRoutes = [
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
    path: '/facilities',
    route: FacilitieRoute,
  },
  {
    path: '/bookings',
    route: BookingRoute,
  },
];

// travers the all route
moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
