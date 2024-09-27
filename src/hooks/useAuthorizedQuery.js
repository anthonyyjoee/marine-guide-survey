import { useContext, useMemo } from "react";

import { useQuery } from "react-query";
import { NavigationContext } from "@react-navigation/native";

import { generateFetchInit, generateUrl, getUserAuthToken, removeUserAuthToken } from "@utils";

export const useAuthorizedQuery = ({ urlPath, method, body, reactQueryOptions }) => {
  const navigation = useContext(NavigationContext);

  const fetcher = useMemo(() => {
    return async () => {
      try {
        const url = generateUrl(urlPath);
        const authToken = await getUserAuthToken();

        if (!authToken) {
          removeUserAuthToken();
          navigation.navigate("Login");
          return;
        }

        const fetchInit = generateFetchInit({ method, authToken });
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

        return await response.json();
      } catch (error) {
        throw error;
      }
    };
  }, [urlPath, method]);

  return useQuery(urlPath, fetcher, {
    ...reactQueryOptions,
    refetchOnWindowFocus: false,
  });
};
