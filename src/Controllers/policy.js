import axios from "axios";
import Constants from "../constants";
import { getUserId } from "./user";

export const savePolicy = () => {
  const date = new Date();
  const endDate = new Date(date.setFullYear(date.getFullYear() + 1));
  const newPolicy = {
    userId: getUserId(),
    startDate: date,
    endDate: endDate,
  };
  console.log(newPolicy);
  axios
    .post(`${Constants.baseURL}/policy`, newPolicy)
    .then((res) => {
      console.log("save new policy", res.data);
      return res.data;
    })
    .catch((err) => {
      console.log("save new policy", "error");
      return err;
    });
};
// get all policies of the user
export const getPolicy = (id) => {
  axios
    .get(`${Constants.baseURL}/policy`, id)
    .then((res) => {
      console.log("get policy", res.data);
      return res.data;
    })
    .catch((err) => {
      console.log("get policy", "Not found");
      return false;
    });
};
