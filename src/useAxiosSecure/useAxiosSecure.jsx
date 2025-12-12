import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000",
});

const useAxiosSecure = () => {
  const { user } = useAuth();
  useEffect(() => {
    const requestInterceptor = instance.interceptors.request.use((config) => {
      if (user && user.accessToken) {
        config.headers.Authorization = `Bearer ${user.accessToken}`;
      }
      return config;
    });
    return () => {
      instance.interceptors.request.eject(requestInterceptor);
    };
  }, [user]);

  return instance;
};

export default useAxiosSecure;
