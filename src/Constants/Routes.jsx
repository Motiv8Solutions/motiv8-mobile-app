import { LoginView } from 'motiv8-atoms';
import SplashScreen from '../Components/SplashScreen';
import React from 'react';

const routes = [
    {
        path: '/login',
        renderFn: function () {
            return (
                <LoginView/>
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