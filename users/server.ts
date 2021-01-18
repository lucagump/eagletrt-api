import express from 'express'
import morgan from 'morgan';
import bodyParser from'body-parser';
import dotenv from 'dotenv';
import path from 'path';

import { userRouter } from './routes/users/routes';

var result = dotenv.config();
console.log(result.parsed);

const expressport = process.env.DATABASE_SERVICE_PORT || 8080;

const app = express();

app.use(bodyParser.json());   

if(process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));                                         
}                                  

// Just an Index 
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.use(userRouter);

app.listen(expressport, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${expressport}⚡️`);
});

export default app; // for testing