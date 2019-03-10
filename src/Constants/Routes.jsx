import SplashScreen from '../Screens/SplashScreen';
import LoginScreen from '../Screens/LoginScreen';
import HomeScreen from '../Screens/HomeScreen';
import React from 'react';

const routes = [
    {
        path: '/login',
        renderFn: function () {
            return (
                <LoginScreen/>
            );
        }
    },
    {
        path: '/home',
        renderFn: function () {
            return (
                <HomeScreen/>
            );
        }
    },
    {
        path: '/',
        exact: true,
        renderFn: function () {
            return (
                <SplashScreen/>
            );
        }
    }
];

export default routes;