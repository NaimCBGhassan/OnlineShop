import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";

const instances = (token) =>
  axios.create({
    baseURL: "/api",
    headers: { Authorization: token },
  });

let instance = instances();

/*REGISTER */
export function useRegister() {
  return useMutation({
    mutationFn: async (user) => {
      try {
        const res = await instance.post("/register", user);
        localStorage.setItem("token", res.data);
        return res.data;
      } catch (error) {
        throw error.response;
      }
    },
    onSuccess: () => {
      const token = localStorage.getItem("token");
      instance = instances(token);
    },
  });
}

/*LOGIN*/
export function useLogin() {
  return useMutation({
    mutationFn: async (user) => {
      try {
        const res = await instance.post("/login", user);
        localStorage.setItem("token", res.data);
        return res.data;
      } catch (error) {
        console.log(error.response);
        throw error.response;
      }
    },
    onSuccess: () => {
      const token = localStorage.getItem("token");
      instance = instances(token);
    },
  });
}

/*GET USER */
export function useGetUser(id) {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      instance = instances(token);
      try {
        const res = await instance.get(`/user/${id}`);
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

/*GET USERS */
export function useGetUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      instance = instances(token);
      try {
        const res = await instance.get(`/users`);
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

/*UPDATE USER */
export function useUpdateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, values }) => {
      try {
        const res = await instance.put(`/user/${id}`, values);
        toast.success("User updated succesfully", { position: "bottom-left", autoClose: 1500 });
        return res.data;
      } catch (error) {
        console.log(error.response);
        error.response.data.forEach(({ message }) =>
          toast.error(message, { position: "bottom-left", autoClose: 1500 })
        );
        return;
      }
    },
    onSuccess: () => queryClient.invalidateQueries(["user"]),
  });
}

/*DELETE USERS*/
export function useDeleteUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      try {
        const res = await instance.delete(`/user/${id}`);
        toast.error("User deleted succesfully", { position: "bottom-left", autoClose: 1500 });
        return res;
      } catch (error) {
        error.response.data.forEach(({ message }) =>
          toast.error(message, { position: "bottom-left", autoClose: 1500 })
        );
        return;
      }
    },
    onSuccess: () => queryClient.invalidateQueries(["users"]),
  });
}
