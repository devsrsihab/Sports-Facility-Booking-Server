import httpStatus from 'http-status';
import AppError from '../errors/appError';


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

function formatTime24(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = Math.round(minutes % 60);

  const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
  const formattedMinutes = mins < 10 ? `0${mins}` : `${mins}`;

  return `${formattedHours}:${formattedMinutes}`;
}
