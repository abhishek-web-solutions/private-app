import Group from "../models/Group.js";

// create group
export const createGroup = async (req, res) => {
  const { name, members } = req.body;

  const group = await Group.create({ name, members });
  res.json(group);
};

// get all groups
export const getGroups = async (req, res) => {
  const groups = await Group.find();
  res.json(groups);
};
