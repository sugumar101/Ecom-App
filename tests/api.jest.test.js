const request = require('supertest');
const app = require('../src/app');

describe('User APIs', () => {
  it('should signup a new user (positive)', async () => {
    const res = await request(app)
      .post('/api/user/signup')
      .send({ email: 'jestuser@example.com', password: 'testpass', userType: 'Normal' });
    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe('User registered successfully.');
  });

  it('should not signup with missing fields (negative)', async () => {
    const res = await request(app)
      .post('/api/user/signup')
      .send({ email: '' });
    expect(res.statusCode).toBe(400);
  });

  it('should not signup with duplicate email (negative)', async () => {
    await request(app)
      .post('/api/user/signup')
      .send({ email: 'jestdup@example.com', password: 'testpass', userType: 'Normal' });
    const res = await request(app)
      .post('/api/user/signup')
      .send({ email: 'jestdup@example.com', password: 'testpass', userType: 'Normal' });
    expect(res.statusCode).toBe(409);
  });

  it('should signin and return a JWT token (positive)', async () => {
    await request(app)
      .post('/api/user/signup')
      .send({ email: 'jestlogin@example.com', password: 'testpass', userType: 'Normal' });
    const res = await request(app)
      .post('/api/user/signin')
      .send({ email: 'jestlogin@example.com', password: 'testpass' });
    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  it('should not signin with wrong password (negative)', async () => {
    const res = await request(app)
      .post('/api/user/signin')
      .send({ email: 'jestlogin@example.com', password: 'wrongpass' });
    expect(res.statusCode).toBe(401);
  });
});

describe('Product APIs', () => {
  let token;
  beforeAll(async () => {
    await request(app)
      .post('/api/user/signup')
      .send({ email: 'jestproduct@example.com', password: 'testpass', userType: 'Business' });
    const res = await request(app)
      .post('/api/user/signin')
      .send({ email: 'jestproduct@example.com', password: 'testpass' });
    token = res.body.token;
  });

  it('should get product list (positive)', async () => {
    const res = await request(app)
      .get('/api/product?page=1')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.products).toBeInstanceOf(Array);
  });

  it('should not get product list without token (negative)', async () => {
    const res = await request(app)
      .get('/api/product?page=1');
    expect(res.statusCode).toBe(401);
  });

  it('should get product detail by ID (positive)', async () => {
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

  it('should return 404 for non-existent product (negative)', async () => {
    const res = await request(app)
      .get('/api/product/999999')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(404);
  });
});

describe('Cart APIs', () => {
  let token;
  beforeAll(async () => {
    await request(app)
      .post('/api/user/signup')
      .send({ email: 'jestcart@example.com', password: 'testpass', userType: 'Normal' });
    const res = await request(app)
      .post('/api/user/signin')
      .send({ email: 'jestcart@example.com', password: 'testpass' });
    token = res.body.token;
  });

  it('should get user cart (positive)', async () => {
    const res = await request(app)
      .get('/api/cart')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should not get cart without token (negative)', async () => {
    const res = await request(app)
      .get('/api/cart');
    expect(res.statusCode).toBe(401);
  });

  // Add more cart tests as needed
});
