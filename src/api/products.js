import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import axios from "axios";

const token = localStorage.getItem("token");
const instance = axios.create({
  baseURL: "/api/products",
  headers: { Authorization: token },
});

/* Get products */
export function useGetProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      try {
        const res = await instance.get();
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

/* Create Products */

export function useCreateProducts() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ values }) => {
      try {
        const form = new FormData();
        for (let key in values) {
          form.append(key, values[key]);
        }
        const res = await instance.post("/", form);
        toast.success("Product created succesfully", { position: "bottom-left", autoClose: 1500 });
        return res.data;
      } catch (error) {
        error.response.data.forEach(({ message }) =>
          toast.error(message, { position: "bottom-left", autoClose: 1500 })
        );
      }
    },
    onSuccess: () => queryClient.invalidateQueries(["products"]),
  });
}
