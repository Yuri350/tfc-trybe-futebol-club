import Sinon, * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import Users from '../database/models/user.model';

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const dumpUser = {
  email: 'teste@teste.com',
  password: 'notadmin'
}

describe('Test /login', () => {
  describe('/POST', () => {

    beforeAll(() => {
      Sinon.stub(Users, 'create').resolves({ id: 1, ...dumpUser } as Users);
    });

    afterAll(() => {
      Sinon.restore();
    });

    it('Create user successfully', async () => {
      const response = await (await (await chai.request(app).post('/login')).setEncoding(dumpUser).header({'token': 'FalsetokenTest'}));
      chai.expect(response.status).to.equal(201);
      chai.expect(response.body).to.deep.equal({ id: 1, ...dumpUser });
    });

    it('Is not possible to create an user without Email', async () => {
      const response = await chai.request(app).post('/login').send({ ...dumpUser, email: '', });
      chai.expect(response.status).to.equal(400);
    });
  })
});
