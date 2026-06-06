const Cooperative = require("../models/Cooperative");

const createCooperative = async (req, res) => {
  try {
    const { name, location } = req.body;

    
    if (!name || !location) {
      return res.status(400).json({
        message: "Name and location are required",
      });
    }

    const owner = req.user?.sub;

    if (!owner) {
      return res.status(401).json({
        message: "Unauthorized: user not found",
      });
    }

    const existing = await Cooperative.findOne({
      name: name.trim(),
    });

    if (existing) {
      return res.status(409).json({
        message: "Cooperative already exists",
      });
    }

    const cooperative = await Cooperative.create({
      name: name.trim(),
      location: location.trim(),
      owner,
      members: [],
    });

    return res.status(201).json({
      message: "Cooperative created successfully",
      cooperative,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  createCooperative,
};