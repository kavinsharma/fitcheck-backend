const { ResponseMessages } = require("../../core/constants/cloud.constants");

const { responseHandler } = require("../../core/handlers/response.handlers");
const service = require("../service/brands.service");
const { search } = require("../../data/query/general.query");
exports.create = async (req, res, next) => {
  try {
    const value = req.body;

    const userId = req.user?.userId;
    value.addedBy = userId;

    const response = await service.create(value);

    if (!response) {
      return responseHandler(res, null, 400, "Error Occured");
    }

    responseHandler(res, response._doc);
  } catch (err) {
    console.log("error is ", err);
    next(err);
  }
};
exports.bulkCreate = async (req, res, next) => {
  try {
    const value = req.body;

    const response = await service.createMany(value);

    if (!response) {
      return responseHandler(res, null, 400, "Error Occured");
    }

    responseHandler(res, response);
  } catch (err) {
    console.log("error is ", err);
    next(err);
  }
};

exports.getList = async (req, res, next) => {
  try {
    let queryFilter = req.query ? req.query : {};
    let sortingFormat = -1;
    let filter = { status: "active" };
    // handling pagination ...
    const pagination = { skip: 0, limit: 10 };
    if (queryFilter.pageNo && queryFilter.pageSize) {
      pagination.skip = parseInt(
        (queryFilter.pageNo - 1) * queryFilter.pageSize,
      );
      pagination.limit = parseInt(queryFilter.pageSize);
    }

    if (Object.entries(req.body).length > 0) {
      queryFilter = req.body;
    }
    if (queryFilter.sort) {
      sortingFormat = queryFilter.sort ? 1 : -1;
    }

    if (queryFilter.name) {
      filter["name"] = { $regex: queryFilter.name, $options: "i" };
    }

    if (queryFilter.id) {
      filter["_id"] = {
        $in: queryFilter.id?.split(",").map(el => ObjectId(el)),
      };
    }

    const queries = search(filter, sortingFormat, pagination);

    let response = await service.search(queries);

    responseHandler(res, response);
  } catch (err) {
    console.log("error is ", err);
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const value = req.body;

    const id = req.params.id;

    const response = await service.update({ _id: id }, value);

    if (!response) {
      return responseHandler(res, null, 400, "Error Occurred");
    }

    responseHandler(res, response);
  } catch (err) {
    console.log("error is ", err);
    next(err);
  }
};

exports.deleteOne = async (req, res, next) => {
  try {
    const id = req.params.id;

    const response = await service.delete(id);

    if (!response) {
      return responseHandler(res, null, 400, "Error Occurred");
    }

    responseHandler(res, {}, 200, "deleted");
  } catch (err) {
    console.log("error is ", err);
    next(err);
  }
};
