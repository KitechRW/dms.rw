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
  const getCooperatives = async (req, res) => {
  try {
    const { search, location } = req.query;

    const query = {};

    if (search) {
      query.name = {
        $regex: search,
        $options: "i",
      };
    }

    if (location) {
      query.location = {
        $regex: location,
        $options: "i",
      };
    }

    const cooperatives = await Cooperative.find(query);

    return res.status(200).json({
      count: cooperatives.length,
      cooperatives,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch cooperatives",
      error: error.message,
    });
  }
};


module.exports = {
  createCooperative,
  getCooperatives,
};