const app = require("../src/server/index");
const supertest = require("supertest");
const request = supertest(app)
import 'regenerator-runtime/runtime'

it('gets the test endpoint', async done => {
  const response = await request.get('/test')
  expect(response.status).toBe(200)
  expect(response.body.message).toBe('this is a message')
  done()
})