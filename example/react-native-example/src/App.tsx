import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SplashScreen, ExampleScreen} from './screens';
import {LogoHeader} from './components/LogoHeader';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={SplashScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Example"
          options={{
            // eslint-disable-next-line react/no-unstable-nested-components
            headerTitle: () => <LogoHeader />,
            headerBackVisible: false,
          }}
          component={ExampleScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
