const User = require("../models/User");
const bcrypt = require("bcrypt");
const {
  successResponse,
  errorResponse,
} = require("../utils/apiResponse");

const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
   
    if (req.user.role === "operator" && role !== "farmer") {
      return res.status(403).json(
        errorResponse(
          "Operators can only create farmers",
          "FORBIDDEN_ROLE"
        )
      );
    }

    const existingUser = await User.findOne({
      email: email.toLowerCase().trim(),
    });

    if (existingUser) {
      return res.status(409).json(
  errorResponse(
    "User already exists",
    "USER_ALREADY_EXISTS"
  )
);
}

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      role,
    });

   return res.status(201).json(
  successResponse(
    "User created successfully",
    "USER_CREATED",
    {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    }
  )
);
  } catch (error) {
    return res.status(500).json(
  errorResponse(
    "User creation failed",
    "USER_CREATION-FAILED",
    error.message
  )
);
  }
};
const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    return res.status(200).json(
      successResponse(
        "Users fetched successfully",
        "USERS_FETCHED",
        { users }
      )
    );
  }
  catch (error) {
    return res.status(500).json(
      errorResponse(
        "Failed to fetch users",
        "USERS_FETCH_FAILED",
      )
    );
  }
};


const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json(
      errorResponse(
        "User not found",
        "USER_NOT_FOUND"
      )
    );
  }

    return res.status(200).json(
   successResponse(
        "User fetched successfully",
        "USER_FETCHED",
        { user }
      )
    );
  } catch (error) {
    return res.status(500).json(
      errorResponse(
        "Failed to fetch user",
        "USER_FETCH_FAILED",
      )
    );
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
};