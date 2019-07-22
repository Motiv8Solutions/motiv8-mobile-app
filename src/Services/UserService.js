import axios from 'axios';
import { MOCK } from './../Constants/AppConstants';
const baseUrl = 'http://localhost:3001/api/v1';
const serviceName = 'UserService';


/** Interface for interacting with the user entities */
export default class UserService {
    lookupMobileNumber (countryCode, mobileNumber) {
        const methodName = 'lookupMobileNumber';
        const logPrefix = `${serviceName}.${methodName}: `;
        countryCode = countryCode || '1';
        console.log(`${logPrefix}MOCK: ${MOCK}`);
        if (!mobileNumber || mobileNumber.trim().length < 1) {
            throw new Error(`${logPrefix}mobileNumber argument cannot be null or empty`);
        }
        try {
            if (MOCK) {
                return new Promise((resolve, reject) => {
                    resolve({
                        status: 200,
                        data: [
                            {
                            "userID": 123235,
                            "tenantID": 32323232,
                            "orgName": "org1",
                            "publiURL": "https://www.moti8solutions.com"
                            },
                            {
                            "userID": 123235,
                            "tenantID": 45657322,
                            "orgName": "org2",
                            "publiURL": "https://www.wikipedia.org"
                            }
                        ]
                    });
                });
            }
            return axios({
                method: 'get',
                headers: { 'content-type': 'application/json' },
                baseURL: baseUrl,
                url: `/lookup/phone?phone=${countryCode}-${mobileNumber}`
            });
        }
        catch (e) {
            console.error(`${logPrefix}Error: ${e.message}`, e);
            throw e;
        }
    }

    confirmOrganization (countryCode, mobileNumber, tenantID) {
        const methodName = 'confirmOrganization';
        const logPrefix = `${serviceName}.${methodName}: `;
        countryCode = countryCode || '1';
        if (!mobileNumber || mobileNumber.trim().length < 1) {
            throw new Error(`${logPrefix}mobileNumber argument cannot be null or empty`);
        }
        try {
            if (MOCK) {
                return new Promise((resolve, reject) => {
                    resolve({
                        status: 200,
                        data: {
                            "token": "abcdef",
                            "expires": 12355545
                        }
                    });
                });
            }
            return axios({
                method: 'get',
                headers: { 'content-type': 'application/json' },
                baseURL: baseUrl,
                url: `/${tenantID}/verify/phone?phone=${countryCode}-${mobileNumber}`
            });
        }
        catch (e) {
            console.error(`${logPrefix}Error: ${e.message}`, e);
            throw e;
        }
    }

    confirmCode (tenantID, token, code) {
        const methodName = 'confirmCode';
        const logPrefix = `${serviceName}.${methodName}: `;
        try {
            if (MOCK) {
                return new Promise((resolve, reject) => {
                    resolve({
                        status: 200,
                        data: {
                            "token": "bearer-token",
                            "expires": 123455433
                        }
                    });
                });
            }
            return axios({
                method: 'post',
                headers: { 'content-type': 'application/json' },
                baseURL: baseUrl,
                url: `/${tenantID}/authorize`,
                data: {
                    token: token,
                    code: code
                }
            });
        }
        catch (e) {
            console.error(`${logPrefix}Error: ${e.message}`, e);
            throw e;
        }
    }

    getUsers (tenantID) {
        const methodName = 'getUsers';
        const logPrefix = `${serviceName}.${methodName}: `;
        try {
            if (MOCK) {
                return new Promise((resolve, reject) => {
                    resolve({
                        status: 200,
                        data: [
                            {
                            "userID": 34243,
                            "tenantID": 65465,
                            "email": "shcbc@djdjd.com",
                            "phoneNumber": 4253062745,
                            "password": "djfhdj",
                            "passwordHash": "rfjretr",
                            "active": true,
                            "enabled": true,
                            "created": 123324362,
                            "updated": 339583409,
                            "version": "1.0"
                            },
                            {
                            "userID": 34243,
                            "tenantID": 65465,
                            "email": "shcbc@djdjd.com",
                            "phoneNumber": 4253062745,
                            "password": "djfhdj",
                            "passwordHash": "rfjretr",
                            "active": true,
                            "enabled": true,
                            "created": 123324362,
                            "updated": 339583409,
                            "version": "2.0"
                            },
                            {
                            "userID": 686869,
                            "tenantID": 334543,
                            "email": "shcbc@jgjgjgj.com",
                            "phoneNumber": 4253062754,
                            "password": "djgnbdf",
                            "passwordHash": "reknerer",
                            "active": true,
                            "enabled": true,
                            "created": 345345345,
                            "updated": 845758585,
                            "version": "1.0"
                            }
                        ]
                    });
                })
            }
            return axios({
                method: 'get',
                headers: { 'content-type': 'application/json' },
                baseURL: baseUrl,
                url: `/${tenantID}/users`
            });
        }
        catch (e) {
            console.error(`${logPrefix}Error: ${e.message}`, e);
            throw e;
        }
    }


    addUser (newUser) {

    }

    editUser (updatedUser) {

    }
};