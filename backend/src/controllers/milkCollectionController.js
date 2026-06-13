const { successResponse, errorResponse } = require("../utils/apiResponse");
const mongoose = require("mongoose");
const MilkCollection = require("../models/MilkCollection");
const User = require("../models/User");

const exportMilkCollectionsCSV = async (req, res) => {
  try {
    const { filter, error } = buildMilkCollectionFilter(req);

    if (error) {
      return res.status(400).json(
        errorResponse(error.message, error.code)
      );
    }

    const collections = await MilkCollection.find(filter)
      .populate(populateCollectionUsers)
      .lean();

      let csv = "Date,Farmer,Cooperative,Volume,Status,PaymentStatus\n";

    collections.forEach((c) => {
      csv += `${c.createdAt},${c.farmer?.name || ""},${c.cooperative?.name || ""},${c.volume},${c.status},${c.paymentStatus}\n`;
    });

    res.setHeader("Content-Type", "text/csv");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=milk-collections.csv"
    );

    return res.send(csv);
  } catch (error) {
    return res.status(500).json(
      errorResponse(
        "Failed to export milk collections",
        "INTERNAL_SERVER_ERROR",
        error.message
      )
    );
  }
};

const escapeRegex = (value) => {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

const parseDateBoundary = (value, endOfDay = false) => {
  if (!value) {
    return null;
  }

  if (typeof value !== "string") {
    return undefined;
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return undefined;
  }

  if (endOfDay && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
    date.setUTCHours(23, 59, 59, 999);
  }

  return date;
};

const buildMilkCollectionFilter = (req) => {
  const { startDate, endDate, cooperative, status } = req.query;
  const filter = {};

  if (req.user.role === "operator") {
    filter.operator = req.user.sub;
  }

  if (cooperative) {
    if (typeof cooperative !== "string" || !cooperative.trim()) {
      return {
        error: {
          message: "Invalid cooperative filter",
          code: "INVALID_COOPERATIVE_FILTER"
        }
      };
    }

    if (!mongoose.isValidObjectId(cooperative)) {
      return {
        error: {
          message: "Invalid cooperative filter",
          code: "INVALID_COOPERATIVE_FILTER"
        }
      };
    }

    filter.cooperative = new mongoose.Types.ObjectId(cooperative);
  }
  if (status) {
    if (typeof status !== "string" || !status.trim()) {
      return {
        error: {
          message: "Invalid status filter",
          code: "INVALID_STATUS_FILTER"
        }
      };
    }

    filter.status = new RegExp(`^${escapeRegex(status.trim())}$`, "i");
  }

  const parsedStartDate = parseDateBoundary(startDate);
  const parsedEndDate = parseDateBoundary(endDate, true);

  if (parsedStartDate === undefined || parsedEndDate === undefined) {
    return {
      error: {
        message: "Invalid date range",
        code: "INVALID_DATE_RANGE"
      }
    };
  }

  if (parsedStartDate && parsedEndDate && parsedStartDate > parsedEndDate) {
    return {
      error: {
    message: "Start date cannot be after end date",
    code: "INVALID_DATE_RANGE"
  }
};
  }

  if (parsedStartDate || parsedEndDate) {
    filter.createdAt = {};

    if (parsedStartDate) {
      filter.createdAt.$gte = parsedStartDate;
    }

    if (parsedEndDate) {
      filter.createdAt.$lte = parsedEndDate;
    }
  }

  return { filter };
};

const populateCollectionUsers = [
  { path: "farmer", select: "name email role" },
  { path: "operator", select: "name email role" },
  { path: "cooperative", select: "name" }
];

const createMilkCollection = async (req, res) => {
  try {
    const { farmer, cooperative, volume, status, notes } = req.body;

    if (
      !farmer ||
      !cooperative ||
      volume === null ||
      !status
    ) {
      return res
        .status(400)
        .json(errorResponse("Missing required fields", "VALIDATION_ERROR")
        );
    }

    if (!mongoose.isValidObjectId(farmer)) {
      return res.status(400).json(errorResponse(
    "Invalid farmer ID",
    "INVALID_FARMER_ID"
  )
);
    }

    const numericVolume = Number(volume);

    if (!Number.isFinite(numericVolume) || numericVolume <= 0) {
      return res.status(400).json(errorResponse(
    "Volume must be a positive number",
    "INVALID_VOLUME"
  )
);
    }

    if (typeof status !== "string" || !status.trim()) {
      return res.status(400).json(errorResponse(
    "Status must be a non-empty string",
    "INVALID_STATUS"
  )
);
    }

    if (notes !== undefined && typeof notes !== "string") {
      return res.status(400).json(errorResponse(
    "Notes must be a string",
    "INVALID_NOTES"
  )
);
    }

    const [farmerUser, operatorUser] = await Promise.all([
      User.findOne({ _id: farmer, role: "farmer" }),
      User.findOne({ _id: req.user.sub, role: "operator" }),
    ]);

    if (!farmerUser) {
      return res
        .status(404)
        .json(errorResponse("Farmer not found", "FARMER_NOT_FOUND"));
    }

    if (!operatorUser) {
      return res
        .status(403)
        .json(errorResponse("Operator access is no longer valid", "FORBIDDEN"));
    }

    const collection = await MilkCollection.create({
      farmer: farmerUser._id,
      cooperative,
      volume: numericVolume,
      status: status.trim(),
      notes: notes?.trim() || "",
      operator: operatorUser._id,
    });

    await collection.populate(populateCollectionUsers);

    return res.status(201).json(
      successResponse(
        "Milk collection saved successfully",
        "MILK_COLLECTION_CREATED",
        collection
      )
    );
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json(
    errorResponse(
      "Invalid milk collection data",
      "VALIDATION_ERROR",
      error.message
        )
      );
    }

    return res.status(500).json(
      errorResponse(
        "Failed to save milk collection",
        "INTERNAL_SERVER_ERROR",
        error.message
      )
    );
  }
};

const getMilkCollections = async (req, res) => {
  try {
    const { filter, error } = buildMilkCollectionFilter(req);

    if (error) {
      return res
        .status(400)
        .json(errorResponse(error.message, error.code));

    }

    const page = Math.max(Number.parseInt(req.query.page, 10) || 1, 1);
    const limit = Math.min(
      Math.max(Number.parseInt(req.query.limit, 10) || 20, 1),
      100
    );
    const skip = (page - 1) * limit;

    const [collections, total] = await Promise.all([
      MilkCollection.find(filter)
        .populate(populateCollectionUsers)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      MilkCollection.countDocuments(filter),
    ]);

    return res.status(200).json(
      successResponse(
    "Milk collections fetched successfully",
    "MILK_COLLECTIONS_FETCHED",
    {
      collections,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    }
  )
);
  } catch (error) {
    return res.status(500).json(errorResponse(
    "Failed to fetch milk collections",
    "INTERNAL_SERVER_ERROR",
    error.message
  )
);
  }
};

const getRecentMilkCollections = async (req, res) => {
  try {
    const requestedLimit = Number.parseInt(req.query.limit, 10);
    const limit = Math.min(
      Math.max(Number.isNaN(requestedLimit) ? 10 : requestedLimit, 1),
      50
    );
    const filter =
      req.user.role === "operator" ? { operator: req.user.sub } : {};

    const collections = await MilkCollection.find(filter)
      .populate(populateCollectionUsers)
      .sort({ createdAt: -1 })
      .limit(limit);

    return res.status(200).json( successResponse(
    "Recent milk collections fetched successfully",
    "RECENT_MILK_COLLECTIONS_FETCHED",
    collections
  )
);
  } catch (error) {
    return res.status(500).json(errorResponse(
    "Failed to fetch recent milk collections",
    "INTERNAL_SERVER_ERROR",
    error.message
  )
);
  }
};

module.exports = {
  createMilkCollection,
  getMilkCollections,
  getRecentMilkCollections,
  exportMilkCollectionsCSV
};