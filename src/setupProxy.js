const proxy = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(proxy('/api', {target: 'http://10.1.44.2:9000/'}));
    app.use(proxy('/v1/kv', {target: 'http://10.1.44.28:8500/'}));
    app.use(proxy('/novnc', {target: 'http://10.1.44.2/'}));
    app.use(proxy('/ssh-web-term', {target: 'http://10.1.44.2/'}));
};