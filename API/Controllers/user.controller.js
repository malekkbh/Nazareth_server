const { getUserByID } = require("../../src/res/utils");
const USER_MODEL = require("../Models/user.model");

const createNewUser = (req, res) => {
  const { name, phone, points, pass } = req.body;

  USER_MODEL.create({
    name: name,
    phone: phone,
    points: points,
    pass,
  })
    .then((createRes) => {
      res.status(200).json({ user: createRes._doc });
    })
    .catch((e) =>
      res.status(500).json({ error: true, errorMessage: e.message })
    );
};

const login = async (req, res) => {
  const { phone, pass } = req.body;

  const user = await USER_MODEL.findOne({ phone: phone }).catch((e) =>
    res.status(500).json({ error: true, errorMessage: e.message })
  );

  if (!user) {
    res.status(550).json({ error: true, errorMessage: "no such user" });
    return;
  }

  if (user.pass == req.body.pass) {
    res.status(200).json({ auth: true, user: user });
  } else {
    res.status(545).json({ auth: false, errorMessage: "bad pass" });
  }
};

const updateUser = async (req, res) => {
  const { userID, updatedUser } = req.body;

  var user = await getUserByID(userID);
  //   const userObject = user?.toObject();

  if (!user) {
    res.status(550).json({ error: true, errorMessage: "no such user" });
    return;
  }

    user.name = updatedUser.name || user.name;
    user.phone = updatedUser.phone || user.phone;
    user.pass = updatedUser.pass || user.pass;
    user.points = updatedUser.points || user.points;

    user
      .save()
      .then((saveRes) => res.status(200).json({ user: saveRes?._doc }))
      .catch((e) =>
        res.status(500).json({ error: true, errorMessage: e.message })
      );

//   USER_MODEL.updateOne({ _id: userID }, { ...updatedUser } , {upsert: true})
//     .then((saveRes) => res.status(200).json({ user: saveRes }))
//     .catch((e) =>
//       res.status(500).json({ error: true, errorMessage: e.message })
//     );
};

module.exports = {
  login,
  createNewUser,
  updateUser,
};
