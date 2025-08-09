const request = require('supertest');
const app = require('../src/app');

describe('User APIs', () => {
  it('should signup a new user', async () => {
    const res = await request(app)
      .post('/api/user/signup')
      .send({ email: 'testuser@example.com', password: 'testpass', userType: 'Normal' });
    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe('User registered successfully.');
  });

  it('should signin and return a JWT token', async () => {
    const res = await request(app)
      .post('/api/user/signin')
      .send({ email: 'testuser@example.com', password: 'testpass' });
    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });
});

describe('Product APIs', () => {
  let token;
  beforeAll(async () => {
    const res = await request(app)
      .post('/api/user/signin')
      .send({ email: 'testuser@example.com', password: 'testpass' });
    token = res.body.token;
  });

  it('should get product list with pagination', async () => {
    const res = await request(app)
      .get('/api/product?page=1')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.products).toBeInstanceOf(Array);
  });

  it('should get product detail by ID', async () => {
    const resList = await request(app)
      .get('/api/product?page=1')
      .set('Authorization', `Bearer ${token}`);
    const productId = resList.body.products[0].id;
    const res = await request(app)
      .get(`/api/product/${productId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(productId);
  });
});

describe('Cart APIs', () => {
  let token;
  beforeAll(async () => {
    const res = await request(app)
      .post('/api/user/signin')
      .send({ email: 'testuser@example.com', password: 'testpass' });
    token = res.body.token;
  });

  it('should get user cart', async () => {
    const res = await request(app)
      .get('/api/cart')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // Add more cart tests as needed
});
