import axios from 'axios';

const refresh = localStorage.getItem("refresh-token");

const refreshAuthLogic = failedRequest => axios.post(process.env.REACT_APP_BASE_URL + '/auth/jwt/refresh', {refresh})
    .then(tokenRefreshResponse => {
        localStorage.setItem('token', tokenRefreshResponse.data.access);
        failedRequest.response.config.headers['Authorization'] = 'Bearer ' + tokenRefreshResponse.data.access;
        return Promise.resolve();
    })
    .catch( error => {
        console.log(error.response)
    });

export default refreshAuthLogic

