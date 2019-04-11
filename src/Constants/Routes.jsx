import SplashScreen from '../Screens/SplashScreen';
import LoginScreen from '../Screens/LoginScreen';
import HomeScreen from '../Screens/HomeScreen';
import ContactScreen from '../Screens/ContactScreen';
import ProgramsScreen from '../Screens/ProgramsScreen';
import ContestScreen from '../Screens/ContestScreen';
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
        path: '/programs',
        renderFn: function () {
            return (
                <ProgramsScreen/>
            );
        }
    },
    {
        path: '/contest',
        renderFn: function () {
            return (
                <ContestScreen/>
            );
        }
    },
    {
        path: '/contact',
        renderFn: function () {
            return (
                <ContactScreen/>
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