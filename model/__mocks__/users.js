const { idCat } = require("../../routes/api/cats/validation");
const { users } = require("./data");

const findByEmail = jest.fn((email) => {
  const [user] = users.filter((el) => String(el.email) === String(email));
  return user;
});

const findById = jest.fn((id) => {
  const [user] = users.filter((el) => String(el._id) === String(id));
  return user;
});

const create = jest.fn(({ name, email, password, sex }) => {
  return {};
});

const updateToken = jest.fn((id, token) => {
  return {};
});

const updateAvatar = jest.fn((id, avatar, imgIdCloud) => {
  return {};
});

module.exports = {
  findByEmail,
  findById,
  create,
  updateToken,
  updateAvatar,
};
