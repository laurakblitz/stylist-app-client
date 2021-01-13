let APIURL = '';

switch (window.location.hostname) {
    case 'localhost' || '127.0.0.1':

    APIURL = 'http://localhost:3005';

    break;

    case 'lb-stylist-client.herokuapp.com':

    APIURL = 'https://lb-stylist-server.herokuapp.com'
}

export default APIURL;