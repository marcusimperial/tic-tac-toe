import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { https } from 'firebase-functions';
import { authHandler, createHandler, enterHandler, getHandler, updateHandler } from './handlers.js';

const app = express();

app.use(cors({ credentials: true, origin: true }));
app.use(express.json());

app.use(authHandler);

app.route('/game/:type?').get(getHandler).post(createHandler);
app.route('/games/:gameId').post(enterHandler).put(updateHandler);

app.get('/', async (req, res) => res.send('hi'));

export const api = https.onRequest(app);