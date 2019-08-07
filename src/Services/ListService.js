import axios from 'axios';
import { MOCK } from './../Constants/AppConstants';
import LocationsList from './../MockData/LocationsList.json';
import RolesList from './../MockData/RolesList.json';

const baseUrl = 'http://localhost:3001/api/v1';
const serviceName = 'ListService';

/**
 * The List service gets the JSON for the list asked for.
 * TODO: Do we need any sort of form ID?
 */
export default class ListService {
    getList (list, tenantId) {
        const methodName = 'getList';
        const logPrefix = `${serviceName}.${methodName}: `;
        let url = `/${tenantId}/lists/${list}`;
        try {
            if (MOCK) {
                let data = null;
                switch (list) {
                    case 'locations':
                        data = LocationsList;
                        break;
                    case 'roles':
                        data = RolesList;
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