export const CATEGORIES = [
  "Entertainment",
  "Caterer",
  "Venue",
  "Clothes",
  "Gifts",
];

export const LOCATIONS = [
  "Delhi",
  "Mumbai",
  "Bangalore",
  "Kolkata",
  "Chandigarh",
  "Goa",
];

export const SERVERURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:4000"
    : "https://server-dot-abal-sps-summer20.el.r.appspot.com";
