import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "./gesture-handler";
import AppNavigation from "./src/navigations/AppNavigation";
import { QueryProvider } from "./src/providers/QueryProvider";
import { AppContextProvider } from "./src/context/AppContext";
import { Toaster } from "sonner-native";
import { StatusBarProvider } from "src/context/StatusBarProvider";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBarProvider>
        <QueryProvider>
          <SafeAreaProvider>
            <AppContextProvider>
              <AppNavigation />
              <Toaster />
            </AppContextProvider>
          </SafeAreaProvider>
        </QueryProvider>
      </StatusBarProvider>
    </GestureHandlerRootView>
  );
}
