import { LS_KEYS } from "../constant";
import { getItem, removeItem, setItem } from "./AsyncStorage";

export const getUserAuthToken = async () => {
  const token = await getItem(LS_KEYS.AUTH_TOKEN_KEY);
  return token;
};

export const setUserAuthToken = async (authToken) => {
  await setItem(LS_KEYS.AUTH_TOKEN_KEY, authToken);
};

export const removeUserAuthToken = async () => {
  await removeItem(LS_KEYS.AUTH_TOKEN_KEY);
};

// User Details Helper
export const getLocalUserDetails = async () => {
  await JSON.parse(await getItem(LS_KEYS.USER_DETAILS_KEY));
};

export const setLocalUserDetails = async (userDetails) => {
  await setItem(LS_KEYS.USER_DETAILS_KEY, JSON.stringify(userDetails));
};

export const removeLocalUserDetails = async () => {
  await removeItem(LS_KEYS.USER_DETAILS_KEY);
};
