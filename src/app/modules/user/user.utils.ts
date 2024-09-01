import { User } from './user.model';

//==============find last ids===============
// find last viewer id
const findLastUserId = async () => {
  const lastViewer = await User.findOne(
    {
      role: 'user',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })

    .lean();

  return lastViewer?.id ? lastViewer.id : undefined;
};

// find last Admin id
const findLastAdminId = async () => {
  const lastAdmin = await User.findOne(
    {
      role: 'admin',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })

    .lean();

  return lastAdmin?.id ? lastAdmin.id : undefined;
};

//==============generate ids===============
// generaate viewer id
export const generatUserId = async () => {
  // first time 0
  let currentid = (0).toString();
  // last viewer id
  const lastViewerId = await findLastUserId(); // 2030 01 0001

  if (lastViewerId) {
    currentid = lastViewerId; // if exist last viewer the  the is assign to currentid
  }

  let incrementId = (Number(currentid.substring(2)) + 1).toString().padStart(4, '0');
  incrementId = `U-${incrementId}`;
  return incrementId; // U-0001++
};

// generaate admin id
export const generatAdminId = async () => {
  // first time 0
  let currentid = (0).toString();
  // last admin id
  const lastAdminId = await findLastAdminId(); //A-0001

  if (lastAdminId) {
    currentid = lastAdminId; // if exist last viewer the  the is assign to currentid
  }

  let incrementId = (Number(currentid.substring(2)) + 1).toString().padStart(4, '0');
  incrementId = `A-${incrementId}`;
  return incrementId; // A-0001++
};
