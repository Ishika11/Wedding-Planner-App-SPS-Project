import axios from "./axios";

export const addReview = async (reviewData) => {
  const res = await axios.post("/review", reviewData);
  return res;
};
