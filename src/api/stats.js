import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import axios from "axios";

const token = localStorage.getItem("token");
const instance = axios.create({
  baseURL: "/api",
  headers: { Authorization: token },
});

export function useStats() {
  return useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      let { data: users } = await instance.get("/users/stats");
      let { data: orders } = await instance.get("/orders/stats");
      let { data: incomes } = await instance.get("/incomes/stats");
      users = users.sort((a, b) => a.total - b.total);
      orders = orders.sort((a, b) => a.total - b.total);
      incomes = incomes.sort((a, b) => a.total - b.total);
      return { users, orders, incomes };
    },
    refetchInterval: false,
    refetchOnWindowFocus: false,
    retry: false,
  });
}
