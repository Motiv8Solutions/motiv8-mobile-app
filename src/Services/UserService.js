import axios from 'axios';

const baseUrl = 'http://localhost:3001/api/v1';
const serviceName = 'UserService';

/** Interface for interacting with the user entities */
export default class UserService {
    lookupMobileNumber (countryCode, mobileNumber) {
        const methodName = 'lookupMobileNumber';
        const logPrefix = `${serviceName}.${methodName}: `;
        countryCode = countryCode || '1';
        if (!mobileNumber || mobileNumber.trim().length < 1) {
            throw new Error(`${logPrefix}mobileNumber argument cannot be null or empty`);
        }
        try {
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