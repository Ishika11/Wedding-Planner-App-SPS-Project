import axios from "./axios";

export const addService = async (formData) => {
  const res = await axios.post("service", formData);
  return res;
};
