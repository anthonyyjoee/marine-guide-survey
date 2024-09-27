import { useMemo } from "react";

import { useMutation } from "react-query";

import { generateFetchInit, generateUrl } from "@utils";

export const useNonAuthorizedMutation = ({ urlPath, method, reactQueryOptions }) => {
  const fetcher = useMemo(() => {
    return async (body) => {
      try {
        const url = generateUrl(urlPath);
        const fetchInit = generateFetchInit({ method, body });
        const response = await fetch(url, fetchInit);

        if (!response.ok) {
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
