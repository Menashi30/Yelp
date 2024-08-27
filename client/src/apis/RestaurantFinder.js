import axios from "axios";

//NODE_ENV = "PROD";
//NODE_ENV = "DEV"

//const baseURL = "http://localhost:3000/api/v1/restaurants";

const baseURL =
  process.env.NODE_ENV === "PROD"
    ? "/api/v1/restaurants"
    : "http://localhost:3000/api/v1/restaurants";

export default axios.create({
  baseURL: baseURL,
});
