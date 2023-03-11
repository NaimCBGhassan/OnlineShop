import Order from "../models/Order.js";
import moment from "moment";
import User from "../models/User.js";

/*GET ORDERS */
export const getOrders = async (req, res) => {
  const query = req.query.new;

  try {
    const order = query ? await Order.find().sort({ _id: -1 }).limit(4) : await Order.find().sort({ _id: -1 });

    res.status(200).json({ order });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

/*USER STATS */
export const userStats = async (req, res) => {
  const previousMonth = moment()
    .month(moment().month() - 1)
    .set("date", 1)
    .format("YYYY-MM-DD HH:mm:ss");

  try {
    const users = await User.aggregate([
      {
        $match: { createdAt: { $gte: new Date(previousMonth) } },
      },
      {
        $project: { month: { $month: "$createdAt" } },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    console.log(users);
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

/*ORDER STATS */
export const orderStats = async (req, res) => {
  const previousMonth = moment()
    .month(moment().month() - 1)
    .set("date", 1)
    .format("YYYY-MM-DD HH:mm:ss");

  try {
    const orders = await Order.aggregate([
      {
        $match: { createdAt: { $gte: new Date(previousMonth) } },
      },
      {
        $project: { month: { $month: "$createdAt" } },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

/*INCOME STATS */
export const incomeStats = async (req, res) => {
  const previousMonth = moment()
    .month(moment().month() - 1)
    .set("date", 1)
    .format("YYYY-MM-DD HH:mm:ss");

  try {
    const icomes = await Order.aggregate([
      {
        $match: { createdAt: { $gte: new Date(previousMonth) } },
      },
      {
        $project: { month: { $month: "$createdAt" }, sales: "$total" },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    return res.status(200).json(icomes);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

/*GET 1 WEEK SALES */
export const weekSales = async (req, res) => {
  const last7Days = moment()
    .day(moment().day() - 6)
    .format("YYYY-MM-DD HH:mm:ss");

  try {
    const dailySales = await Order.aggregate([
      {
        $match: { createdAt: { $gte: new Date(last7Days) } },
      },
      {
        $project: { day: { $dayOfWeek: "$createdAt" }, sales: "$total" },
      },
      {
        $group: {
          _id: "$day",
          totalOrders: { $sum: 1 },
          total: { $sum: "$sales" },
        },
      },
    ]);

    return res.status(200).json(dailySales);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};