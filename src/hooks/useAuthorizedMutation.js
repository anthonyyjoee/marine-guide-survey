import { useContext, useMemo } from "react";

import { useMutation } from "react-query";
import { NavigationContext } from "@react-navigation/native";

import { generateFetchInit, generateUrl, getUserAuthToken, removeUserAuthToken } from "@utils";

export const useAuthorizedMutation = ({ urlPath, method, reactQueryOptions, contentType }) => {
  const navigation = useContext(NavigationContext);
  const fetcher = useMemo(() => {
    return async (body) => {
      try {
        const url = generateUrl(urlPath);
        const authToken = await getUserAuthToken();

        if (!authToken) {
          return;
        }

        const fetchInit = generateFetchInit({ method, body, authToken, contentType });
        const response = await fetch(url, fetchInit);

        if (!response.ok) {
          if (response.status === 401) {
            removeUserAuthToken();
            navigation.navigate("Login");
            return;
          }
          const { message } = await response.json();
          throw new Error(message);
        }

        if (response.status === 204) {
          return;
        }

        return response.json();
      } catch (error) {
        throw error;
      }
    };
  }, [urlPath, method]);

  return useMutation(urlPath, fetcher, {
    ...reactQueryOptions,
    refetchOnWindowFocus: false,
  });
};
