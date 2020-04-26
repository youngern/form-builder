/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import Logger from './services/Logger';
import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ApolloProvider } from '@apollo/client';

import client from '~/src/services/apollo';

import Edit from './screens/Edit';
import View from './screens/View';

if (__DEV__) {
  import('./support/ReactotronConfig').then(() =>
    Logger.log('Reactotron Configured'),
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="View" component={View} />
          <Tab.Screen name="Edit" component={Edit} />
        </Tab.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}
