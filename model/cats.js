const Cat = require("./Schemas/cat");

const create = async (body) => {
  const result = await Cat.create(body);
  return result;
};

const update = async (id, body, userId) => {
  const result = await Cat.findByIdAndUpdate(
    { _id: id, owner: userId },
    { ...body },
    { new: true }
  );
  return result;
};

const getAll = async (userId) => {
  const results = await Cat.find({ owner: userId }).populate({
    path: "owner",
    select: "name email sex -_id",
  });
  return results;
};

const getById = async (id, userId) => {
  const result = await Cat.findOne({ _id: id, owner: userId }).populate({
    path: "owner",
    select: "name email sex -_id",
  });
  return result;
};

const remove = async (id, userId) => {
  const result = await Cat.findByIdAndDelete({ _id: id, owner: userId });
  return result;
};

module.exports = {
  getAll,
  getById,
  remove,
  create,
  update,
};
