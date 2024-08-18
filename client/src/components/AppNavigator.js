// src/navigation/AppNavigator.js
import React from 'react';
import {
    createStackNavigator
} from '@react-navigation/stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import VerificationScreen from '../screens/VerificationScreen';
import SuccessScreen from '../screens/SuccessScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
    return ( 
        <Stack.Navigator >  
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Verification" component={VerificationScreen} />
            <Stack.Screen name="Success" component={SuccessScreen} />
        </Stack.Navigator>
    );
};

export default AppNavigator;