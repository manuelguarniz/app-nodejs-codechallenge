import supertest from 'supertest';
import healthRouters from '../../src/routes/health.route';
import app from '../../src/app';

describe('health route', () => {
  it('health OK', async () => {
    await supertest(app).get('/api/health').expect(200);
  });
  it('health Not found', async () => {
    await supertest(app).get('/api/health/randomizepth').expect(404);
  });
});
