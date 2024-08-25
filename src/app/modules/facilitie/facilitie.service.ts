import QueryBuilder from '../../builder/QueryBuilder';
import { TFacility } from './facilitie.interface';
import { Facilitie } from './facilitie.model';


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
};
