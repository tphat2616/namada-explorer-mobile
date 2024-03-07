import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ReactQueryProvider } from "./libs/reactQuery/ReactQueryProvider";
import ProposalsScreen from "./screen/proposals";
import ValidatorsScreen from "./screen/validators";
import BlocksScreen from "./screen/blocks";
import OverviewScreen from "./screen/overview";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import DetailScreen from "./screen/detail";
import { createStackNavigator } from "@react-navigation/stack";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function Navigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: {
          fontWeight: "600",
          fontSize: 12,
          paddingBottom: 16,
        },
        tabBarIconStyle: { display: "none" },
      }}
    >
      <Tab.Screen name="Overview" component={OverviewScreen} />
      <Tab.Screen name="Blocks" component={BlocksScreen} />
      <Tab.Screen name="Proposals" component={ProposalsScreen} />
      <Tab.Screen name="Validators" component={ValidatorsScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <ReactQueryProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={Navigator}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Detail" component={DetailScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
    </ReactQueryProvider>
  );
}
