import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "react-query";

/*Register */
export function useRegister() {
  return useMutation({
    mutationFn: async (user) => {
      try {
        const res = await axios.post("/api/register", user);
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
        const res = await axios.post("/api/login", user);
        localStorage.setItem("token", res.data);
        return res.data;
      } catch (error) {
        throw error.response;
      }
    },
  });
}
