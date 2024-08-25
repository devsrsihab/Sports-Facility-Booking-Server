import { Schema, model } from 'mongoose';
import { TFacility } from './facilitie.interface';

// Create the schema for the Facility model
const facilitySchema = new Schema<TFacility>(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    availableSlots: { type: Number, required: true },
    pricePerHour: { type: Number, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  },
);

// query middleware show only where isDelete false
facilitySchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

// query middlware for findone
facilitySchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

// aggregate middleware
facilitySchema.pre('aggregate', function () {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
});

export const Facilitie = model<TFacility>('Facilitie', facilitySchema);
