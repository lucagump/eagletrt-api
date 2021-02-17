import express from 'express'
import morgan from 'morgan'
import getVersionRouter from './routes/router';
import config from './config';

var app = express();
app.use(morgan('dev'));

app.get('/', function (req, res) {
   res.send('Hello World');
})

app.get('/doc', (req, res) => { res.status(301).redirect('https://google.com/'); });
app.use('/api', getVersionRouter());

app.listen(config.port, () => {
    console.log('\x1b[5m%s\x1b[0m', 'Server is up and running on ' + config.port + '\n');
});

export default app; // for testing
