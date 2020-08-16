import axios from "axios";

// TODO(Arjan): Change SERVERURL on deployment
const SERVERURL = "http://localhost:4000";

export const addService = async (formData) => {
  const res = await axios.post(`${SERVERURL}/api/service`, formData);
  return res;
};
