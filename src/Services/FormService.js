import axios from 'axios';
import { MOCK } from './../Constants/AppConstants';
import ContestForm from './../MockData/ContestForm.json';
import UserForm from './../MockData/UserForm.json';

const baseUrl = 'http://localhost:3001/api/v1';
const serviceName = 'FormService';

/**
 * The Form service gets the JSON for the form type asked for as a new or existing form.
 * TODO: Think about where the key 'contest' should come from?
 */
export default class FormService {
    getForm (type, tenantId, id) {
        const methodName = 'getForm';
        const logPrefix = `${serviceName}.${methodName}: `;
        let url = `/${tenantId}/forms/${type}`;
        if (id !== null && id !== undefined) {
            url = `${url}/${id}`;
        }
        try {
            if (MOCK) {
                let data = null;
                switch (type) {
                    case 'contest':
                        data = ContestForm[type];
                        break;
                    case 'user':
                        data = UserForm[type];
                        break;
                }
                return new Promise((resolve, reject) => {
                    resolve({
                        status: 200,
                        data: data
                    });
                });
            }
            return axios({
                method: 'get',
                headers: { 'content-type': 'application/json' },
                baseURL: baseUrl,
                url: url
            });
        }
        catch (e) {
            console.error(`${logPrefix}Error: ${e.message}`, e);
            throw e;
        }
    }
}