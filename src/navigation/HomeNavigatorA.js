/**
 * Food Delivery - React Native Template
 *
 * @format
 * @flow
 */

// import dependencies
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MaterialCommunityIcons as Icon} from '@expo/vector-icons';


// import Home screen
import Home from '../screens/home/HomeA';

// import Favorites screen
import Favorites from '../screens/favorites/FavoritesA';

// import Cart screen
import Cart from '../screens/cartaoVisita/CartaoVisita';


// import colors
import Colors from '../theme/colors';

//import ICON
import { FontAwesome5 } from '@expo/vector-icons';

import { } from '../screens/home/styles';
// HomeNavigator Config

type Props = {
  color: string,
  focused: string,
  size: number,
};

// create bottom tab navigator
const Tab = createBottomTabNavigator();

// HomeNavigator
function HomeNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      backBehavior="initialRoute"
      screenOptions={({route}) => ({
        tabBarIcon: ({color, focused, size}: Props) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = `home${focused ? '' : '-outline'}`;
          } else if (route.name === 'Favorites') {
            iconName = `star${focused ? '' : '-outline'}`;
          }

          // You can return any component that you like here!
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        keyboardHidesTabBar: true,
        activeTintColor: '#DAA520',
        inactiveTintColor: Colors.secondaryText,
        showLabel: false, // hide labels
        style: {
          backgroundColor: Colors.surface, // TabBar background
        },
      }}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          tabBarIcon: props => (
            <FontAwesome5
              name={`address-card${props.focused ? '' : ''}`}
              {...props}
            />
          ),
        }}
      />
      <Tab.Screen name="Favorites" component={Favorites} />
    </Tab.Navigator>
  );
}

export default HomeNavigator;
