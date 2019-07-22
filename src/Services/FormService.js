import axios from 'axios';

const baseUrl = 'http://localhost:3001/api/v1';
const serviceName = 'FormService';

/**
 * The Form service gets the JSON for the form type asked for as a new or existing form.
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