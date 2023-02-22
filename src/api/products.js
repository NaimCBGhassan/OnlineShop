import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";

const baseURL = "/api/products";

const axio = (token = "") =>
  axios.create({
    baseURL,
    headers: { Authorization: token },
  });

/* Get products */
export function useGetProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      try {
        const res = await axio().get();
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
