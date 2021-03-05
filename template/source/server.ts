import express from 'express'
import {  loaders  } from './loaders';

const app = express();

await loaders.init({ expressApp: app });

export default app; // for testing

