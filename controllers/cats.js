const Cats = require("../model/cats");
const { HttpCode } = require("../helpers/constants");

const getAll = async (req, res, next) => {
  try {
    const userId = await req.user.id;
    const cats = await Cats.getAll(userId, req.quire);
    return res.json({
      status: "success",
      code: HttpCode.OK,
      data: {
        ...cats,
      },
    });
  } catch (e) {
    next(e);
  }
};

const getById = async (req, res, next) => {
  try {
    const userId = await req.user.id;
    const cat = await Cats.getById(req.params.id, userId);
    if (cat) {
      return res.json({
        status: "success",
        code: HttpCode.OK,
        data: {
          cat,
        },
      });
    } else {
      return res.status(404).json({
        status: "error",
        code: 404,
        data: "Not Found",
      });
    }
  } catch (e) {
    next(e);
  }
};

const create = async (req, res, next) => {
  try {
    const userId = await req.user.id;
    const cat = await Cats.create({ ...req.body, owner: userId });
    return res.status(201).json({
      status: "success",
      code: HttpCode.CREATED,
      data: {
        cat,
      },
    });
  } catch (e) {
    next(e);
  }
};

const remove = async (req, res, next) => {
  try {
    const userId = await req.user.id;
    const cat = await Cats.remove(req.params.id, userId);
    if (cat) {
      return res.json({
        status: "success",
        code: HttpCode.OK,
        data: {
          cat,
        },
      });
    } else {
      return res.status(404).json({
        status: "error",
        code: 404,
        data: "Not Found",
      });
    }
  } catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {
  try {
    const userId = await req.user.id;
    const cat = await Cats.update(req.params.id, req.body, userId);
    if (cat) {
      return res.json({
        status: "success",
        code: HttpCode.OK,
        data: {
          cat,
        },
      });
    } else {
      return res.status(404).json({
        status: "error",
        code: 404,
        data: "Not Found",
      });
    }
  } catch (e) {
    next(e);
  }
};

const updateStatus = async (req, res, next) => {
  try {
    const userId = await req.user.id;
    const cat = await Cats.update(req.params.id, req.body, userId);
    if (cat) {
      return res.json({
        status: "success",
        code: HttpCode.OK,
        data: {
          cat,
        },
      });
    } else {
      return res.status(404).json({
        status: "error",
        code: 404,
        data: "Not Found",
      });
    }
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  updateStatus,
  remove,
};
