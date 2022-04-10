// get userid from state
export const getUserId = () => {
  return localStorage.getItem("userId");
};
//set userid in browser
export const setUserId = (id) => {
  localStorage.setItem("userId", id);
};