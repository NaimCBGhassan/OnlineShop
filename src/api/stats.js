import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { toast } from "react-toastify";

const instances = (token) =>
  axios.create({
    baseURL: "/api/stats",
    headers: { Authorization: token },
  });

let instance = instances();

export function useStats() {
  return useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      instance = instances(token);
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
      const token = localStorage.getItem("token");
      instance = instances(token);
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

export function useGetTotalOrder(id) {
  return useQuery({
    queryKey: ["getTotalOrder"],
    queryFn: async () => {
      try {
        const res = await instance.get(`/getOrder/${id}`);
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

export function useUpdateOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ values, id }) => {
      try {
        const res = await instance.put(`/editOrder/${id}`, { deliveryStatus: values });

        toast.success("Order updated succesfully", { position: "bottom-left", autoClose: 1500 });
        return res.data;
      } catch (error) {
        console.log(error);
        error.response.data.forEach(({ message }) =>
          toast.error(message, { position: "bottom-left", autoClose: 1500 })
        );
      }
    },
    onSuccess: () => queryClient.invalidateQueries(["getTotalOrders"]),
  });
}

export function useTotalIncomes() {
  return useQuery({
    queryKey: ["totalIncomes"],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      const instance = instances(token);
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
