import { useQuery } from "react-query";
import axios from "axios";

const token = localStorage.getItem("token");
const instance = axios.create({
  baseURL: "/api/stats",
  headers: { Authorization: token },
});

export function useStats() {
  return useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      let [users, orders, incomes, weekSales, getOrders] = await Promise.all([
        instance.get("/users"),
        instance.get("/orders"),
        instance.get("/incomes"),
        instance.get("/weekSales"),
        instance.get("/getOrders?new=true"),
      ]).then((results) => results.map((result) => result.data));

      [users, orders, incomes, weekSales].forEach((result) => result.sort((a, b) => a.total - b.total));

      const DAYS = ["Sun", "Mon", "Tue", "Wen", "Thur", "Fri", "Sat"];
      weekSales = DAYS.map((DAY, index) => {
        const item = weekSales.find((item) => index === item._id - 1);
        return {
          days: DAY,
          amount: item ? item.total : 0,
        };
      });

      return { users, orders, incomes, weekSales, getOrders };
    },
    refetchInterval: false,
    refetchOnWindowFocus: false,
    retry: false,
  });
}

export function useGetTotalOrders() {
  return useQuery({
    queryKey: ["getTotalOrders"],
    queryFn: async () => {
      try {
        const res = await instance.get("/getOrders");
        return res.data;
      } catch (error) {
        throw error.response;
      }
    },
    refetchInterval: false,
    refetchOnWindowFocus: false,
    retry: false,
  });
}
export function useTotalIncomes() {
  return useQuery({
    queryKey: ["totalIncomes"],
    queryFn: async () => {
      try {
        const res = await instance.get("/totalIncomes");
        return res.data[0].total;
      } catch (error) {
        throw error.response;
      }
    },
    refetchInterval: false,
    refetchOnWindowFocus: false,
    retry: false,
  });
}
