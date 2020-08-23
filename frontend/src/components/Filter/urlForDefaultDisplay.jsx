import { SERVERURL } from "../../components/products/constants";

const baseUrl = new URL(
  `${SERVERURL}/api/service/query?category=Entertainment,Venue,Gifts,Clothes,Caterer`
);
export { baseUrl as default };
