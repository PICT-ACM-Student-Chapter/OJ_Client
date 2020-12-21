import axios from 'axios';

const refresh = localStorage.getItem("refresh-token");

const refreshAuthLogic = failedRequest => axios.post(process.env.REACT_APP_BASE_URL + '/auth/jwt/refresh', {refresh})
    .then(tokenRefreshResponse => {
        localStorage.setItem('token', tokenRefreshResponse.data.access);
        failedRequest.response.config.headers['Authorization'] = 'Bearer ' + tokenRefreshResponse.data.access;
        return Promise.resolve();
    })
    .catch(error => {
        console.log(error.response)
    });

function b64Encode(str){
    try{
        return btoa(str)
    } catch (e){
        return null
    }
}

function b64Decode(str) {
    // Going backwards: from bytestream, to percent-encoding, to original string.
    try {
        return decodeURIComponent(atob(str).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    } catch (e){
        return null
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export {
    refreshAuthLogic,
    b64Decode,
    b64Encode,
    sleep
}

