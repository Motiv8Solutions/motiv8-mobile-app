import SplashScreen from '../Screens/SplashScreen';
import LoginScreen from '../Screens/LoginScreen';
import HomeScreen from '../Screens/HomeScreen';
import ContactScreen from '../Screens/ContactScreen';
import ProgramsScreen from '../Screens/ProgramsScreen';
import ContestScreen from '../Screens/ContestScreen';
import SignupScreen from '../Screens/SignupScreen';
import UsersScreen from '../Screens/UsersScreen';
import UserForm from '../Screens/UserForm';
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
        path: '/:tenantID/users/:id',
        renderFn: function (routeProps) {
            return (
                <UserForm tenantID={routeProps.match.params.tenantID} id={routeProps.match.params.id}/>
            );
        }
    },
    {
        path: '/:tenantID/users',
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