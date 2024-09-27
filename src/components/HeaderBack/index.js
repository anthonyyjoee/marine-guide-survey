import React, { useContext } from "react";

import AntDesign from "react-native-vector-icons/AntDesign";
import { NavigationContext } from "@react-navigation/native";

export const HeaderBack = (props) => {
  const navigation = useContext(NavigationContext);

  return <AntDesign name="arrowleft" color="black" size={25} onPress={() => navigation.goBack()} {...props} />;
};
