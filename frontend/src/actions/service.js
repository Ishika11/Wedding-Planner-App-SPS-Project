import axios from "axios";

export const addService = async (formData) => {
  const res = await axios.post("http://localhost:4000/api/service", formData);
  return res;
};
