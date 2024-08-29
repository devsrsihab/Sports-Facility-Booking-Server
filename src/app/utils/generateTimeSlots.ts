import httpStatus from 'http-status';
import AppError from '../errors/appError';

/**
 * Generate evenly spaced time slots between start and end hours.
 * @param startHour - The start hour of the slot period (in 24-hour format).
 * @param endHour - The end hour of the slot period (in 24-hour format).
 * @param availableSlots - The number of available time slots to generate.
 * @returns An array of formatted time slot strings.
 */
export const generateTimeSlots = (startHour: number, endHour: number, availableSlots: number): string[] => {
  // Validate inputs
  if (startHour < 0 || endHour > 24 || startHour >= endHour) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Invalid start or end hour.');
  }
  if (availableSlots <= 0) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Number of available slots must be greater than zero.',
    );
  }

  const totalMinutes = (endHour - startHour) * 60;
  const slotDurationMinutes = totalMinutes / availableSlots;
  const slots: string[] = [];

  let currentStartMinutes = startHour * 60;

  for (let i = 0; i < availableSlots; i++) {
    const currentEndMinutes = currentStartMinutes + slotDurationMinutes;
    slots.push(`${formatTime24(currentStartMinutes)} - ${formatTime24(currentEndMinutes)}`);
    currentStartMinutes = currentEndMinutes;
  }

  return slots;
}

/**
 * Format a number of minutes into a 24-hour time string.
 * @param minutes - The number of minutes past midnight.
 * @returns A formatted time string (HH:mm).
 */
function formatTime24(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = Math.round(minutes % 60);

  const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
  const formattedMinutes = mins < 10 ? `0${mins}` : `${mins}`;

  return `${formattedHours}:${formattedMinutes}`;
}
