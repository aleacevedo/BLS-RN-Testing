import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';
import { State } from '@interfaces/reduxInterfaces';
import Routes from '@constants/routes';
import { RoutesParamList } from '@constants/routesParamList';
import {authStackNavConfig,appStackNavConfig, tabNavConfig} from '@config/navigation';
import { inferRoute } from '@utils/navUtils';
import Login from '@authScreens/Login';
import SignUp from '@authScreens/SignUp';
import Home from '@screens/Home';

const Stack = createStackNavigator<RoutesParamList>();

const AuthStack = () => (
  <>
    {inferRoute(Stack)(Routes.Login, Login)}
    {inferRoute(Stack)(Routes.SignUp, SignUp)}
  </>
);

const Tab = createBottomTabNavigator<RoutesParamList>();
function HomeTabs() {
  return (
    <Tab.Navigator {...tabNavConfig}>
      {inferRoute(Tab)(Routes.Tab1, Home)}
      {inferRoute(Tab)(Routes.Tab2, Home)}
    </Tab.Navigator>
  );
}

function AppStack() {
  return <>{inferRoute(Stack)(Routes.Home,HomeTabs)}</>;
}

const Navigator = () => {
  const currentUser = useSelector((state: State) => state.auth.currentUser);
  const defaultStackConfig = currentUser ? appStackNavConfig : authStackNavConfig;
  return <Stack.Navigator {...defaultStackConfig}>{currentUser ? AppStack() : AuthStack()}</Stack.Navigator>;
};

export default Navigator;
