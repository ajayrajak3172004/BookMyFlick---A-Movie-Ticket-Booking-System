import express from 'express';
import { handleClerkWebhook } from '../controllers/webhooksController.js';
import bodyParser from 'body-parser';

const webhookrouter = express.Router();

webhookrouter.post('/clerk', express.raw({ type: '*/*' }), handleClerkWebhook);

export default webhookrouter;
