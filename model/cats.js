const Cat = require("./Schemas/cat");

const create = async (body) => {
  const result = await Cat.create(body);
  return result;
};

const update = async (id, body, userId) => {
  const result = await Cat.findOneAndUpdate(
    { _id: id, owner: userId },
    { ...body },
    { new: true }
  );
  return result;
};

const getAll = async (
  userId,
  { sortBy, sortByDesc, filter, limit = "5", offset = "0" }
) => {
  const results = await Cat.paginate(
    { owner: userId },
    {
      limit,
      offset,
      sort: {
        ...(sortBy ? { [`${sortBy}`]: 1 } : {}),
        ...(sortByDesc ? { [`${sortByDesc}`]: -1 } : {}),
      },
      select: filter ? filter.split("|").join(" ") : "",
      populate: {
        path: "owner",
        select: "name email sex -_id",
      },
    }
  );
  const { docs: cats, totalDocs: total } = results;

  return { total: total.toString(), limit, offset, cats };
};

const getById = async (id, userId) => {
  const result = await Cat.findOne({ _id: id, owner: userId }).populate({
    path: "owner",
    select: "name email sex -_id",
  });
  return result;
};

const remove = async (id, userId) => {
  const result = await Cat.findOneAndDelete({ _id: id, owner: userId });
  return result;
};

module.exports = {
  getAll,
  getById,
  remove,
  create,
  update,
};
