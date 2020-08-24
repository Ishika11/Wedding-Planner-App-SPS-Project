import axios from "./axios";

export const addService = async (formData) => {
  const res = await axios.post("/service", formData);
  return res;
};

export const getService = async (id) => {
  const res = await axios.get(`/service/${id}`);
  return res;
};
