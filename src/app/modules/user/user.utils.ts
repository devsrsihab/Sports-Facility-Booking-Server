import { User } from './user.model';

//==============find last ids===============
// find last viewer id
const findLastViewerId = async () => {
  const lastViewer = await User.findOne(
    {
      role: 'viewer',
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
const findLastAuthorId = async () => {
  const lastAuthor = await User.findOne(
    {
      role: 'author',
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

  return lastAuthor?.id ? lastAuthor.id : undefined;
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
export const generatViewerId = async () => {
  // first time 0
  let currentid = (0).toString();
  // last viewer id
  const lastViewerId = await findLastViewerId(); // 2030 01 0001

  if (lastViewerId) {
    currentid = lastViewerId; // if exist last viewer the  the is assign to currentid
  }

  let incrementId = (Number(currentid.substring(2)) + 1).toString().padStart(4, '0');
  incrementId = `V-${incrementId}`;
  return incrementId; // V-0001++
};

// generaate author id
export const generatAuthorId = async () => {
  // first time 0
  let currentid = (0).toString();
  // last viewer id
  const lastAuthorId = await findLastAuthorId(); // 2030 01 0001
  
  if (lastAuthorId) {
    currentid = lastAuthorId; // if exist last viewer the  the is assign to currentid
  }
  
  let incrementId = (Number(currentid.substring(3)) + 1).toString().padStart(4, '0');
  incrementId = `AU-${incrementId}`;
  return incrementId; // V-0001++
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

