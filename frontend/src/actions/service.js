import axios from "axios";

const path = "http://localhost:4000/api/service";

export const addService = async (formData) => {
  const res = await axios.post(path, formData);
  return res;
};

export const getService = async (id) => {
  const res = await axios.get(path + "/" + id);
  return res;
};
