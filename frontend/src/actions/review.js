import axios from "./axios";

export const addReview = async (reviewData) => {
  const res = await axios.post("/review", reviewData);
  return res;
};

export const getReviews = async (serviceId) => {
  const res = await axios.get(`/review/${serviceId}`);
  return res.data.reviews;
};
