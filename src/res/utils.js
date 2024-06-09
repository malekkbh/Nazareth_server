const USER_MODEL = require("../../API/Models/user.model");

const getUserByID = async (id) => {
  const user = await USER_MODEL.findById(id).catch((e) =>
    res.status(500).json({ error: true, errorMessage: e.message })
  );

  return user;
};

module.exports = {
  getUserByID,
};
