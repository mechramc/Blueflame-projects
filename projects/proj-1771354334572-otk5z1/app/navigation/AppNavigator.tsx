import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ThemeSelectionScreen from '../screens/ThemeSelectionScreen';

const Stack = createStackNavigator();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="ThemeSelection" component={ThemeSelectionScreen} options={{ title: 'Theme Selection' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;