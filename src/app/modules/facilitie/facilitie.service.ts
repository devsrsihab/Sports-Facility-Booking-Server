/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/appError';
import { TFacility } from './facilitie.interface';
import { Facilitie } from './facilitie.model';
import moment from 'moment';
import { Booking } from '../booking/booking.model';
import { generateTimeSlots } from '../../utils/generateTimeSlots';

// Create a Facilitie
const createFacilitie = async (FacilitieData: TFacility) => {
  const result = await Facilitie.create(FacilitieData);
  return result;
};

// Get all Facilities
const getAllFacilities = async (query: Record<string, unknown>) => {
  const FacilitieQuery = new QueryBuilder(Facilitie.find(), query)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await FacilitieQuery.modelQuery;
  const meta = await FacilitieQuery.countTotal();
  return {
    result,
    meta,
  };
};

// Get a Facilitie by ID
const getSingleFacilitie = async (FacilitieId: string): Promise<TFacility | null> => {
  const result = await Facilitie.findById(FacilitieId);
  return result;
};

// check availabe slots
const getAvailabilitySlots = async (query: Record<string, unknown>) => {
  try {
    const { date, facility: facilityId } = query;

    if (!date || !facilityId) {
      throw new AppError(httpStatus.NOT_FOUND, 'Date and facilityId are required.');
    }

    // Parse and validate date
    const dateStr = String(date);
    const facilityIdStr = String(facilityId);
    const parsedDate = moment(dateStr, 'YYYY-MM-DD', true);

    if (!parsedDate.isValid()) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Invalid date format. Use YYYY-MM-DD.');
    }

    // Retrieve facility
    const facility = await Facilitie.findById(facilityIdStr);
    if (!facility) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Facility not found.');
    }

    // Retrieve bookings for the given date and facility
    const bookings = await Booking.find({
      facility: facilityIdStr,
      bookingDate: dateStr,
      status: 'confirmed',
    });

    // Generate time slots based on facility's working hours and availability
    const workingHoursStart = 8; // 8:00 AM
    const workingHoursEnd = 18; // 6:00 PM
    const totalSlots = facility.availableSlots;

    const allSlots = generateTimeSlots(workingHoursStart, workingHoursEnd, totalSlots);

    // Filter out slots that are already booked
    const availableSlots = allSlots.filter((slot) => {
      const [slotStartStr, slotEndStr] = slot.split(' - ');
      const slotStart = moment(`${dateStr}T${slotStartStr}`, 'YYYY-MM-DDTHH:mm');
      const slotEnd = moment(`${dateStr}T${slotEndStr}`, 'YYYY-MM-DDTHH:mm');

      return !bookings.some((booking) => {
        const bookingStartTime = moment(`${dateStr}T${booking.startTime}`, 'YYYY-MM-DDTHH:mm');
        const bookingEndTime = moment(`${dateStr}T${booking.endTime}`, 'YYYY-MM-DDTHH:mm');

        // Check if the slot overlaps with the booking time
        return slotStart.isBefore(bookingEndTime) && slotEnd.isAfter(bookingStartTime);
      });
    });

    return availableSlots;
  } catch (error: any) {
    throw new AppError(httpStatus.NOT_FOUND, error.message);
  }
};

// Update a Facilitie
const updateFacilitie = async (
  FacilitieId: string,
  updateData: Partial<TFacility>,
): Promise<TFacility | null> => {
  const result = await Facilitie.findByIdAndUpdate(FacilitieId, updateData, {
    new: true,
  });
  return result;
};

// Delete a Facilitie
const deleteFacilitie = async (FacilitieId: string) => {
  const deleteFacilitie = await Facilitie.findByIdAndUpdate(FacilitieId, { isDeleted: true });
  return deleteFacilitie;
};

export const FacilitieServices = {
  createFacilitie,
  getAllFacilities,
  getSingleFacilitie,
  updateFacilitie,
  deleteFacilitie,
  getAvailabilitySlots,
};
