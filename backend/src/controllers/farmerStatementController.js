const MilkCollection = require("../models/MilkCollection");
const User = require("../models/User");

exports.generateFarmerStatement = async (req, res) => {
  try {
    const farmerId = req.params.id;

    const farmer = await User.findById(farmerId);
    if (!farmer) {
      return res.status(404).json({ message: "Farmer not found" });
    }

    const records = await MilkCollection.find({ farmer: farmerId });

    let totalVolume = 0;
    let unpaid = 0;
    let paid = 0;

    records.forEach(r => {
      totalVolume += r.volume;

      if (r.paymentStatus === "unpaid") unpaid += r.volume;
      if (r.paymentStatus === "paid") paid += r.volume;
    });

    
    let csv = "Date,Cooperative,Volume,Status,PaymentStatus\n";

    records.forEach(r => {
      csv += `${r.createdAt.toISOString()},${r.cooperative},${r.volume},${r.status},${r.paymentStatus}\n`;
    });

    csv += `\nTOTAL,,${totalVolume},,\n`;
    csv += `UNPAID TOTAL,,${unpaid},,\n`;
    csv += `PAID TOTAL,,${paid},,\n`;

    
    res.setHeader("Content-Type", "text/csv");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=farmer-${farmerId}-statement.csv`
    );

    return res.send(csv);

  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};