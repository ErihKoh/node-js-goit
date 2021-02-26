const Cat = require("./Schemas/cat");

const create = async (body) => {
  const result = await Cat.create(body);
  return result;
};

const update = async (id, body) => {
  const { value: result } = await Cat.findByIdAndUpdate(
    { _id: id },
    { ...body },
    { new: true }
  );
  return result;
};

const getAll = async () => {
  const results = await Cat.find({});
  return results;
};

const getById = async (id) => {
  const result = await Cat.find({ _id: id });
  return result;
};

const remove = async (id) => {
  const result = await Cat.findByIdAndDelete({ _id: id });
  return result;
};

module.exports = {
  getAll,
  getById,
  remove,
  create,
  update,
};
