import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import axios from "axios";

const token = localStorage.getItem("token");
const instance = axios.create({
  baseURL: "/api/products",
  headers: { Authorization: token },
});

/* GET ALL PRODUCTS */
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

/* GET PRODUCT */
export function useGetProduct({ id }) {
  return useQuery({
    queryKey: ["product"],
    queryFn: async () => {
      try {
        const res = await instance.get(`/${id}`);
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

/* CREATE PRODUCTS */
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

/* UPDATE PRODUCTS */
export function useUpdateProducts() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ values, id }) => {
      if (!id) return;
      try {
        const form = new FormData();
        for (let key in values) {
          form.append(key, values[key]);
        }
        const res = await instance.put(`/${id}`, form);
        toast.success("Product updated succesfully", { position: "bottom-left", autoClose: 1500 });
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

/* DELETE PRODUCTS */
export function useDeleteProducts() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      try {
        const res = await instance.delete(`${id}`);
        toast.error("Product deleted succesfully", { position: "bottom-left", autoClose: 1500 });
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
