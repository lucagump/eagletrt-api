import app from './app';
import config from './config';

let port = 0;
if (process.argv.includes('--port')) {
    port = +process.argv[process.argv.indexOf('--port') + 1];
}

if (port)
    app(port);
else
    app();