const mongoose = require("mongoose");
const MilkCollection = require("../models/MilkCollection");
const { successResponse, errorResponse } = require("../utils/apiResponse");

const getFarmerDashboardSummary = async (req, res) => {
  try {
    const farmerId = req.user.sub;

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const monthlyData = await MilkCollection.aggregate([
      {
        $match: {
          farmer: new mongoose.Types.ObjectId(farmerId),
          createdAt: { $gte: startOfMonth },
          status: "approved"
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

    const lastDelivery = await MilkCollection.findOne({
      farmer: farmerId,
    })
    
      .sort({ createdAt: -1 })

      .populate("cooperative", "name");
    
       const paymentStats = await MilkCollection.aggregate([
      {
        $match: {
          farmer: new mongoose.Types.ObjectId(farmerId),
        },
      },
      {
        $group: {
          _id: "$paymentStatus",
          totalVolume: { $sum: "$volume" },
        },
      },
    ]);

    let paid = 0;
    let unpaid = 0;

    paymentStats.forEach((p) => {
      if (p._id === "paid") paid = p.totalVolume;
      if (p._id === "unpaid") unpaid = p.totalVolume;
    });
   const recentRecords = await MilkCollection.find({
  farmer: farmerId,
})
  .sort({ createdAt: -1 })
  .limit(5)
  .populate("cooperative", "name");
    return res.status(200).json(
      successResponse(
        "Farmer dashboard summary fetched successfully",
        "FARMER_DASHBOARD_SUMMARY_FETCHED",
        {
          monthlyTotalMilk,
          lastDelivery,
          recentRecords,
          paymentHistory: {
            paid,
            unpaid,
        },
    }
      )
    );
  } catch (error) {
     console.error("Farmer dashboard error:", error);

    return res.status(500).json(
      errorResponse(
        "Failed to fetch farmer dashboard summary",
        "INTERNAL_SERVER_ERROR",  
      )
    );
  }
};

module.exports = {
  getFarmerDashboardSummary,
};