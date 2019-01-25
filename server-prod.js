
var express = require('express');
var path = require('path');
const http = require('http');
const httpProxy = require('http-proxy');
const historyApiFallback = require("connect-history-api-fallback");

const forwardHost = process.env.FORWARDHOST || '104.196.24.70'; // Thingsboard Demo Server
const forwardPort = process.env.FORWARDPORT || 80;
const PORT = process.env.PORT || 3000;

const nodeEnv = process.env.NODE_ENV || "Debug Mode";

console.log(forwardHost);
console.log(forwardPort);
console.log(nodeEnv);

const ruleNodeUiforwardHost = 'localhost';
const ruleNodeUiforwardPort = 8080;
const app = express();
const server = http.createServer(app);

app.use(historyApiFallback());
app.use(express.static(path.join(__dirname, '')));

const apiProxy = httpProxy.createProxyServer({
    target: {
        host: forwardHost,
        port: forwardPort
    }
});

const ruleNodeUiApiProxy = httpProxy.createProxyServer({
    target: {
        host: ruleNodeUiforwardHost,
        port: ruleNodeUiforwardPort
    }
});

apiProxy.on('error', function (err, req, res) {
    console.warn('API proxy error: ' + err);
    res.end('Error.');
});

ruleNodeUiApiProxy.on('error', function (err, req, res) {
    console.warn('RuleNode UI API proxy error: ' + err);
    res.end('Error.');
});

console.info(`Forwarding API requests to http://${forwardHost}:${forwardPort}`);
console.info(`Forwarding Rule Node UI requests to http://${ruleNodeUiforwardHost}:${ruleNodeUiforwardPort}`);

app.all('/api/*', (req, res) => {
    apiProxy.web(req, res);
});

app.all('/static/rulenode/*', (req, res) => {
    ruleNodeUiApiProxy.web(req, res);
});

server.on('upgrade', (req, socket, head) => {
    apiProxy.ws(req, socket, head);
});

server.listen(PORT, '0.0.0.0', (error) => {
    if (error) {
        console.error(error);
    } else {
        console.info(`==> 🌎  Listening on port ${PORT}. Open up http://localhost:${PORT}/ in your browser.`);
    }
});


