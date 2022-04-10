import axios from "axios";
import Constants from "../constants";
import { getUserId } from "./user";

export const saveClaim = (values) => {
  const newClaim = {
    userId: getUserId(),
    ...values,
  };
  axios
    .post(`${Constants.baseURL}/claim`, newClaim)
    .then((res) => {
      console.log("save new claim", res.data);
      return res.data;
    })
    .catch((err) => {
      console.log("save new claim", "error");
      return err;
    });
};
// get all claims of the user
export const getClaim = (id) => {
  axios
    .get(`${Constants.baseURL}/claims`, id)
    .then((res) => {
      console.log("get claim", res.data);
      return res.data;
    })
    .catch((err) => {
      console.log("get claim", "Not found");
      return false;
    });
};

export const getAllClaims = (userId) => {
  axios
    .get(`${Constants.baseURL}/claims/all`, userId)
    .then((res) => {
      console.log("get all claim", res.data);
      return res.data;
    })
    .catch((err) => {
      console.log("get all claim", "Not found");
      return false;
    });
};
