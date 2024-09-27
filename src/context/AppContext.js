import React, { useContext, createContext, useState, useEffect, useCallback, useMemo } from "react";
import { StyleSheet } from "react-native";

import { useAuthorizedQuery } from "@hooks";
import { API_PATH, ERROR_MESSAGE } from "@constant";
import { removeUserAuthToken } from "@utils";
import { toast } from "sonner-native";

const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  const {
    data: _userData,
    refetch: refetchUserData,
    isLoading: isLoadingUserData,
    isRefetching: isRefetchingUserData,
  } = useAuthorizedQuery({
    urlPath: API_PATH.SECURE.USER,
    reactQueryOptions: {
      enabled: true,
      // onError: (err) => {
      //   toast.error(ERROR_MESSAGE[err?.message] ?? ERROR_MESSAGE?.INTERNAL_SERVER_ERROR);
      // },
    },
  });

  const logOut = useCallback(() => {
    setUserData(null);
    removeUserAuthToken();
  }, []);

  useEffect(() => {
    if (_userData?.data?.id) {
      setUserData(_userData?.data);
    }
  }, [_userData]);

  const isAdmin = useMemo(() => {
    return userData?.role === "ADMIN";
  }, [userData]);

  return (
    <AppContext.Provider value={{ userData, refetchUserData, isLoadingUserData, isRefetchingUserData, setUserData, logOut, isAdmin }}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppContext component");
  }
  return context;
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});

export { useAppContext, AppContextProvider, AppContext };
