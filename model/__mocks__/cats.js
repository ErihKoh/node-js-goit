const { cats } = require("./data");

const create = jest.fn((body) => {
  const newCat = { ...body, _id: "5f8382425ba83a4f1829ca5c" };

  cats.push(newCat);
  return newCat;
});

const update = jest.fn((id, body, userId) => {
  let [cat] = cats.filter((el) => String(el._id) === String(id));

  if (cat) {
    cat = { ...cat, ...body };
  }
  return cat;
});

const getAll = jest.fn(
  (userId, { sortBy, sortByDesc, filter, limit = "5", offset = "0" }) => {
    return { cats, total: cats.length, limit, offset };
  }
);

const getById = jest.fn((id, userId) => {
  const [cat] = cats.filter((el) => String(el._id) === String(id));
  return cat;
});

const remove = jest.fn((id, userId) => {
  const index = cats.findIndex((el) => String(el._id) === String(id));
  if (index === -1) {
    return null;
  }
  const [cat] = cats.splice(index, 1);
  return cat;
});

module.exports = {
  getAll,
  getById,
  remove,
  create,
  update,
};
