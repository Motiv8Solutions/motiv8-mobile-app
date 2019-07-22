import SplashScreen from '../Screens/SplashScreen';
import LoginScreen from '../Screens/LoginScreen';
import HomeScreen from '../Screens/HomeScreen';
import ContactScreen from '../Screens/ContactScreen';
import ProgramsScreen from '../Screens/ProgramsScreen';
import ContestScreen from '../Screens/ContestScreen';
import SignupScreen from '../Screens/SignupScreen';
import UsersScreen from '../Screens/UsersScreen';
import FormScreen from '../Screens/FormScreen';
import { ParticipantView } from 'motiv8-atoms';
import React from 'react';

const routes = [
    {
        path: '/signin',
        renderFn: function () {
            return (
                <LoginScreen/>
            );
        }
    },
    {
        path: '/signup',
        renderFn: function () {
            return (
                <SignupScreen/>
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
        path: '/bonus',
        renderFn: function () {
            return (
                <ParticipantView/>
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
        path: '/:tenantId/users/:id',
        renderFn: function (routeProps) {
            return (
                <FormScreen type='contest' tenantId={routeProps.match.params.tenantId} id={routeProps.match.params.id}/>
            );
        }
    },
    {
        path: '/:tenantId/users',
        exact: true,
        renderFn: function (routeProps) {
            return (
                <UsersScreen tenantID={routeProps.match.params.tenantID}/>
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