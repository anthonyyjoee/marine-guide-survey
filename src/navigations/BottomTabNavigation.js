import { StyleSheet, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { BottomTabBar } from "@components";

import { Dashboard, List, Profile, Report } from "@screens";

const Tab = createBottomTabNavigator();

const transparentHeaderStyle = {
  headerTitleStyle: {
    fontWeight: "bold",
    color: "white",
  },
  headerTitleAlign: "center",
};

const BottomTabNavigation = () => {
  return (
    <View style={styles.container}>
      <Tab.Navigator initialRouteName="Dashboard" tabBar={(props) => <BottomTabBar {...props} />} screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Dashboard" component={Dashboard} />
        <Tab.Screen
          name="ReportList"
          component={Report}
          options={{
            ...transparentHeaderStyle,
            headerTitle: "Laporan",
            headerShown: true,
            headerTransparent: true,
          }}
        />
        <Tab.Screen name="PlaceholderScreen" component={Dashboard} />
        <Tab.Screen
          name="List"
          component={List}
          options={{
            ...transparentHeaderStyle,
            headerShown: true,
            headerTransparent: true,
          }}
        />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red", // Set default background color here
  },
});

export default BottomTabNavigation;
