import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "react-query";

const token = localStorage.getItem("token");
const instance = axios.create({
  baseURL: "/api",
  headers: { Authorization: token },
});

/*Register */
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
  });
}

/*Login*/
export function useLogin() {
  return useMutation({
    mutationFn: async (user) => {
      try {
        const res = await instance.post("/login", user);
        localStorage.setItem("token", res.data);
        return res.data;
      } catch (error) {
        throw error.response;
      }
    },
  });
}

/*GET USER */
export function useGetUser() {
  return useQuery({
    queryKey: ["user"],
    queryFn: async (id) => {
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
