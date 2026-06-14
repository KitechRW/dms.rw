const MilkCollection = require("../models/MilkCollection");
const { successResponse, errorResponse } = require("../utils/apiResponse");

const getFarmerDashboardSummary = async (req, res) => {
  try {
    const farmerId = req.user.sub;

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    // 1. Get monthly total (optimized aggregation)
    const monthlyData = await MilkCollection.aggregate([
      {
        $match: {
          farmer: new require("mongoose").Types.ObjectId(farmerId),
          createdAt: { $gte: startOfMonth },
        },
      },
      {
        $group: {
          _id: null,
          totalMilk: { $sum: "$volume" },
        },
      },
    ]);

    const monthlyTotalMilk = monthlyData[0]?.totalMilk || 0;

    // 2. Last delivery
    const lastDelivery = await MilkCollection.findOne({
      farmer: farmerId,
    })
      .sort({ createdAt: -1 })
      .populate("cooperative", "name");

    return res.status(200).json(
      successResponse(
        "Farmer dashboard summary fetched successfully",
        "FARMER_DASHBOARD_SUMMARY_FETCHED",
        {
          monthlyTotalMilk,
          lastDelivery,
        }
      )
    );
  } catch (error) {
    return res.status(500).json(
      errorResponse(
        "Failed to fetch farmer dashboard summary",
        "INTERNAL_SERVER_ERROR",
        error.message
      )
    );
  }
};

module.exports = {
  getFarmerDashboardSummary,
};