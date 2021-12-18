/* eslint-disable */
const supertest = require('supertest');
const server = require('../app');
const requestWithSupertest = supertest(server);

describe('Proof of concept', () => {
  it('GET / Server is running', async () => {
    const res = await requestWithSupertest.get('/');

    expect(res.status).toEqual(200);
  });

  it('notFound Middleware', async () => {
    const res = await requestWithSupertest.get('/asd');

    expect(res.status).toEqual(404);
    expect(res.type).toEqual(expect.stringContaining('json'));
    expect(res.body).toHaveProperty('error');
  });
});

describe('Auth Endpoints', () => {
  const user = { email: 'test@mail.com', password: 'test123' };

  it('POST /auth/register New user registration ', async () => {
    const res = await requestWithSupertest.post('/auth/register').send(user);

    expect(res.status).toEqual(201);
    expect(res.type).toEqual(expect.stringContaining('json'));
    expect(res.body).toHaveProperty('token');
    expect(res.body).toHaveProperty('email', user.email);
    expect(res.body).toHaveProperty('userId');
  });

  it('POST /auth/login User login', async () => {
    const res = await requestWithSupertest.post('/auth/login').send(user);

    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining('json'));
    expect(res.body).toHaveProperty('token');
    expect(res.body).toHaveProperty('email', user.email);
    expect(res.body).toHaveProperty('userId');
  });
});
