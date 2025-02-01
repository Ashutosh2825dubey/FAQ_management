const request = require('supertest');
const app = require('../app'); // Ensure your Express app is exported from app.js
const cookie = require('cookie');
const { expect } = require('chai');

describe('Admin Authentication & FAQ Retrieval', function () {
  let token; // Variable to store JWT token

  it('should log in and redirect to the dashboard with token in cookies', async function () {
    const response = await request(app)
      .post('/admin/login') // Adjust to your login endpoint if necessary
      .send({
        username: 'admin',
        password: 'admin',
      })
      .expect(302); // Expecting a redirect

    // Verify the redirect location
    expect(response.header.location).to.equal('/admin/dashboard');

    // Parse the cookie from the response headers and store the token
    const cookies = cookie.parse(response.headers['set-cookie'][0]);
    expect(cookies.token).to.exist;
    expect(cookies.token).to.not.equal('');
    token = cookies.token; // Save the token for later use
  });

  it('should not allow invalid credentials and return 401', async function () {
    const response = await request(app)
      .post('/admin/login')
      .send({
        username: 'wrongUsername',
        password: 'wrongPassword',
      })
      .expect(401);

    // Verify the error message returned in the response
    expect(response.body.error).to.equal('Invalid login credentials');
  });

  it('should fetch the FAQs EJS page', async function () {
    const response = await request(app)
      .get('/api/faqs')
      .expect(200);
  });

  it('should fetch the FAQs EJS page for language "hi"', async function () {
    const response = await request(app)
      .get('/api/faqs/?lang=hi')
      .expect(200);
  });

  it('should fetch the FAQs EJS page for language "bn"', async function () {
    const response = await request(app)
      .get('/api/faqs/?lang=bn')
      .expect(200);
  });
});
