const User = require("../models/User");
const Bug = require("../models/Bug");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

// @desc Create new bug
// @route POST /api/v1/bugs
// @access Private
exports.createBug = async ctx => {
  const token = ctx.cookies.get("token");

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const fixer = await User.findOne({ email: ctx.request.body.fixer });

  if (!fixer) ctx.throw(404, "Please add any users email");

  const bugData = {
    project: decoded.projectId,
    name: ctx.request.body.name,
    reporter: decoded.id,
    fixer: fixer._id,
    status: ctx.request.body.status,
    severity: ctx.request.body.severity,
    reproduceability: ctx.request.body.reproduceability,
    description: ctx.request.body.description
  };

  let bug = await Bug.create(bugData);

  bug = await bug
    .populate("fixer")
    .populate("reporter")
    .execPopulate();

  ctx.status = 200;
  ctx.response.body = {
    success: true,
    data: bug
  };
};

// @desc Update a bugs information
// @route PUT /api/v1/bugs/update
// @access Private
exports.updateBug = async ctx => {
  const token = ctx.cookies.get("token");

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const bug = await Bug.findById(ctx.params.id);

  if (String(bug.project) !== decoded.projectId) {
    ctx.throw(401, "You must be working on that bugs project to edit it");
  }

  if (ctx.request.body.fixer) {
    const fixer = await User.findOne({ email: ctx.request.body.fixer });

    ctx.request.body.fixer = fixer._id;
  }

  const newBug = await Bug.findByIdAndUpdate(ctx.params.id, ctx.request.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false
  })
    .populate("fixer")
    .populate("reporter");

  ctx.status = 200;
  ctx.response.body = {
    success: true,
    data: newBug
  };
};

// @desc Get bugs by project
// @route PUT /api/v1/bugs/project
// @access Private
exports.bugsByProject = async ctx => {
  const decoded = jwt.verify(ctx.cookies.get("token"), process.env.JWT_SECRET);

  const bugs = await Bug.find({ project: decoded.projectId })
    .populate("reporter")
    .populate("fixer");

  ctx.status = 200;
  ctx.response.body = {
    success: true,
    data: bugs
  };
};

// @desc Delete bug
// @route Delete /api/v1/bugs/:id
// @access Private
exports.deleteBug = async ctx => {
  const decoded = jwt.verify(ctx.cookies.get("token"), process.env.JWT_SECRET);

  const isDeleted = await Bug.deleteOne({
    $and: [{ project: decoded.projectId }, { _id: ctx.params.id }]
  });

  if (isDeleted.deletedCount === 0) ctx.throw(401, "Cannot find that bug");

  ctx.status = 200;
  ctx.response.body = {
    success: true
  };
};
