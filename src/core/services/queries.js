import { useQuery } from "@tanstack/react-query";
import queryString from "query-string";
import api from "src/core/config/api";

const useGetUserData = () => {
  const queryFn = () => api.get("/user/profile");
  const queryKey = ["user-data"];

  return useQuery({ queryFn, queryKey });
};

const useGetUserTours = () => {
  const queryFn = () => api.get("/user/tours");
  const queryKey = ["user-tours"];

  return useQuery({ queryFn, queryKey });
};

const useGetTours = (query) => {
  const url = "/tour?" + queryString.stringify(query);

  const queryFn = () => api.get(url);
  const queryKey = ["tour", query];

  return useQuery({ queryFn, queryKey, enabled: false });
};

const useGetBasket = () => {
  const queryFn = () => api.get("/basket");
  const queryKey = ["user-basket"];

  return useQuery({ queryFn, queryKey });
};

export { useGetUserData, useGetUserTours, useGetTours, useGetBasket };
