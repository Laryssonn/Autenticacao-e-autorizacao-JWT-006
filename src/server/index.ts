import express from 'express';

import { routeAdapter } from './adapters/routeAdapter';

import { makeListLeadController } from '../factories/makeListLeadsController';
import { makeSignInController } from '../factories/makeSignInController';
import { makeSignUpController } from '../factories/makeSignUpController';

const app = express();

app.use(express.json());

app.post('/sign-up', routeAdapter(makeSignUpController()));
app.post('/sign-in', routeAdapter(makeSignInController()));

app.get('/leads', routeAdapter(makeListLeadController()));

app.listen(3001, () => {
  console.log('Server started at http://localhost:3001 👽');
});
