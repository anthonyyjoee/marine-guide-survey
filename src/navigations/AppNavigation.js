import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";

import {
  CreateSurvey,
  CreateWorkUnit,
  Login,
  CreateUser,
  WorkUnitList,
  UserList,
  ToolsList,
  CreateTools,
  SplashScreen,
  SurveyList,
  SurveyDetail,
  SurveyDescription,
  SurveyTools,
  SurveyProcedure,
  CreateReport,
  ReportDetail,
  ChangePassword,
} from "@screens";
import { HeaderBack } from "@components";
import BottomTabNavigation from "./BottomTabNavigation";

import { useAppContext } from "@context";

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  const { userData, isLoadingUserData } = useAppContext();

  const headerStyle = {
    headerShadowVisible: false,
    headerTitleAlign: "center",
    headerStyle: {
      backgroundColor: "white",
    },
    headerTitleStyle: {
      fontWeight: "bold",
    },
  };

  return (
    <NavigationContainer
      theme={{
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          background: "white",
        },
      }}
    >
      <Stack.Navigator>
        {userData ? (
          <>
            <Stack.Screen name="Main" options={{ headerShown: false }} component={BottomTabNavigation} />
            <Stack.Screen
              name="CreateUser"
              options={{ ...headerStyle, headerTitle: "Formulir Akun", headerLeft: (props) => <HeaderBack {...props} /> }}
              component={CreateUser}
            />
            <Stack.Screen
              name="CreateSurvey"
              options={{ ...headerStyle, headerTitle: "Formulir Survey", headerLeft: (props) => <HeaderBack {...props} /> }}
              component={CreateSurvey}
            />
            <Stack.Screen
              name="CreateWorkUnit"
              options={{ ...headerStyle, headerTitle: "Formulir Unit Kerja", headerLeft: (props) => <HeaderBack {...props} /> }}
              component={CreateWorkUnit}
            />
            <Stack.Screen
              name="CreateTools"
              options={{ ...headerStyle, headerTitle: "Formulir Peralatan", headerLeft: (props) => <HeaderBack {...props} /> }}
              component={CreateTools}
            />
            <Stack.Screen
              name="WorkUnitList"
              options={{ ...headerStyle, headerTitle: "List Unit Kerja", headerLeft: (props) => <HeaderBack {...props} /> }}
              component={WorkUnitList}
            />
            <Stack.Screen
              name="UserList"
              options={{ ...headerStyle, headerTitle: "List User / Admin", headerLeft: (props) => <HeaderBack {...props} /> }}
              component={UserList}
            />
            <Stack.Screen
              name="ToolsList"
              options={{ ...headerStyle, headerTitle: "List Peralatan", headerLeft: (props) => <HeaderBack {...props} /> }}
              component={ToolsList}
            />
            <Stack.Screen
              name="SurveyDescription"
              options={{
                ...headerStyle,
                headerShadowVisible: true,
                headerTitle: "Deskripsi Survey",
                headerLeft: (props) => <HeaderBack {...props} />,
              }}
              component={SurveyDescription}
            />
            <Stack.Screen
              name="SurveyTools"
              options={{
                ...headerStyle,
                headerShadowVisible: true,
                headerTitle: "Peralatan Survey",
                headerLeft: (props) => <HeaderBack {...props} />,
              }}
              component={SurveyTools}
            />
            <Stack.Screen
              name="SurveyProcedure"
              options={{
                ...headerStyle,
                headerShadowVisible: true,
                headerTitle: "Prosedur Survey",
                headerLeft: (props) => <HeaderBack {...props} />,
              }}
              component={SurveyProcedure}
            />
            <Stack.Screen
              name="SurveyDetail"
              options={{
                ...headerStyle,
                headerTransparent: true,
                headerLeft: (props) => <HeaderBack {...props} style={{ color: "white" }} />,
                headerStyle: {
                  backgroundColor: "transparent",
                },
                headerTitleStyle: {
                  fontWeight: "bold",
                  color: "white",
                },
                headerTitle: "Detail Survey",
              }}
              component={SurveyDetail}
            />
            <Stack.Screen
              name="SurveyList"
              options={{
                ...headerStyle,
                headerTransparent: true,
                headerTitle: "List Survey",
                headerLeft: (props) => <HeaderBack {...props} style={{ color: "white" }} />,
                headerStyle: {
                  backgroundColor: "transparent",
                },
                headerTitleStyle: {
                  fontWeight: "bold",
                  color: "white",
                },
              }}
              component={SurveyList}
            />
            <Stack.Screen
              name="CreateReport"
              options={{
                ...headerStyle,
                // headerTransparent: true,
                headerTitle: "Buat Laporan",
                headerLeft: (props) => <HeaderBack {...props} />,
                headerStyle: {
                  backgroundColor: "transparent",
                },
              }}
              component={CreateReport}
            />
            <Stack.Screen
              name="ReportDetail"
              options={{
                ...headerStyle,
                headerShadowVisible: true,
                headerTitle: "Laporan",
                headerLeft: (props) => <HeaderBack {...props} />,
              }}
              component={ReportDetail}
            />
            <Stack.Screen
              name="ChangePassword"
              options={{
                ...headerStyle,
                headerShadowVisible: true,
                headerTitle: "Laporan",
                headerLeft: (props) => <HeaderBack {...props} />,
              }}
              component={ChangePassword}
            />
          </>
        ) : isLoadingUserData ? (
          <Stack.Screen name="SplashScreen" options={{ headerShown: false }} component={SplashScreen} />
        ) : (
          <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
