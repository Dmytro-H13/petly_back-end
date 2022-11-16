const fs = require("fs/promises");
const path = require("path");

const User = require("../db/user-model");
const { Animal } = require("../db");
const resizeAvatar = require("../helpers/resize-avatar");

const addAnimal = async (fields, owner) => {
  try {
    const result = await Animal.create({ ...fields });
    await User.findByIdAndUpdate(
      { _id: owner },
      { $addToSet: { myAnimal: result._id } }
    );
    console.log(result._id);
    return result;
  } catch (error) {
    return error;
  }
};
//
// const getCurrentUser = async (token) => {
//   try {
//     const [user] = await User.find({ token });

//     return user;
//   } catch (error) {
//     return error;
//   }
// };
// =================================================
const listAnimal = async (_id) => {
  try {
    const result = await User.find({ _id }).populate({
      path: "myAnimal",
    });
    return result;
  } catch (error) {
    return error;
  }
};
// =================================================

const removeAnimal = async (_id) => {
  try {
    const result = await Animal.findByIdAndDelete(_id);
    return result;
  } catch (error) {
    return error;
  }
};

const updateUser = async (_id, fields) => {
  try {
    const responce = await User.findByIdAndUpdate(
      { _id },
      { ...fields },
      { new: true }
    );
    return responce;
  } catch (error) {
    return error.message;
  }
};

// const updateUser = async (_id, fields) => {
//   try {
//     const responce = await User.findByIdAndUpdate(
//       { _id },
//       { ...fields },
//       { new: true }
//     );
//     return responce;
//   } catch (error) {
//     return error.message;
//   }
// };
const updateAvatar = async (_id, user) => {
  try {
    const newAvatarPath = path.resolve(`./public/avatars/${_id}avatar.png`);
    await resizeAvatar(user.pathAvatar);
    await fs.rename(user.pathAvatar, newAvatarPath);
    const avatarURL = newAvatarPath;
    return avatarURL;
  } catch (error) {
    await fs.unlink(user.pathAvatar);
    return error.message;
  }
};

// const updateAvatar = async (_id, user, fields) => {
//   try {
//     const newAvatarPath = path.resolve(`./public/avatars/${_id}avatar.png`);
//     await resizeAvatar(user.pathAvatar);
//     await fs.rename(user.pathAvatar, newAvatarPath);
//     const avatarURL = newAvatarPath;

//     const data = await User.findByIdAndUpdate(
//       { _id },
//       { avatarURL },
//       { new: true }
//     );

//     return data;
//   } catch (error) {
//     await fs.unlink(user.pathAvatar);
//     return error.message;
//   }
// };

const usersPersonalInfo = async (_id) => {
  try {
    const result = await User.findOne({ _id });

    return result;
  } catch (error) {
    return error;
  }
};
module.exports = {
  removeAnimal,
  addAnimal,
  listAnimal,
  usersPersonalInfo,
  // getCurrentUser,
  updateUser,
  updateAvatar,
};
