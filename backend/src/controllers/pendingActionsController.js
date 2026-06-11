const Cooperative = require("../models/Cooperative");
const MilkCollection = require("../models/MilkCollection");

exports.getPendingActions = async (req, res) => {
  try {

    const inactiveCooperatives = await Cooperative.countDocuments({
      status: "inactive"
    });


    const unpaidBatches = await MilkCollection.countDocuments({
      paymentStatus: "unpaid"
    });

    
    const pendingVerifications = 0;

    return res.status(200).json({
      success: true,
      data: {
        pendingVerifications,
        inactiveCooperatives,
        unpaidBatches
      }
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};