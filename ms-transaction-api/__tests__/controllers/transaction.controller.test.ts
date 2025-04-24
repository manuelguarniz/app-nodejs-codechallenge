jest.mock('../../src/services/transaction.service.ts', () => ({
  checkExistTransaction: jest
    .fn()
    .mockReturnValueOnce(Promise.resolve(false))
    .mockReturnValue(Promise.resolve(true)),
  getTransactionDetails: jest.fn().mockReturnValue(
    Promise.resolve({
      transactionExternalId: '4dd03d55-a29a-449d-8f0e-22bef7cc590d',
      transactionType: {
        name: 'approved',
      },
      transactionStatus: {
        name: 'transferencia',
      },
      value: 999,
      createdAt: '2025-04-24 13:40:18',
    }),
  ),
  tranferFunds: jest
    .fn()
    .mockReturnValueOnce(
      Promise.resolve({
        message: 'Invalid Fields',
        errors: [
          'Account debit is required',
          'Account credit is required',
          'Transfer type is required',
          'Value transfer is required',
        ],
      }),
    )
    .mockReturnValueOnce(
      Promise.resolve({
        message: 'Invalid Fields',
        errors: ['Minimum value transfer is 1', 'Value transfer is invalid'],
      }),
    )
    .mockReturnValue(
      Promise.resolve({
        operationTransactionId: '3e5778a0-3691-4707-b93b-762c1d82374b',
      }),
    ),
}));

import supertest from 'supertest';
import app from '../../src/app';

describe('transaction route', () => {
  it('get any transaction Fail', async () => {
    const transactionId = 'unknow-transaction';
    const res = await supertest(app).get(`/api/transaction/${transactionId}`);
    expect(res.status).toBe(404);
  });

  it('get status OK', async () => {
    const transactionId = '4dd03d55-a29a-449d-8f0e-22bef7cc590d';
    const res = await supertest(app).get(`/api/transaction/${transactionId}`);
    expect(res.status).toBe(200);
  });

  it('get approved transaction OK', async () => {
    const transactionId = '4dd03d55-a29a-449d-8f0e-22bef7cc590d';
    const res = await supertest(app).get(`/api/transaction/${transactionId}`);
    expect(res.status).toBe(200);
    expect(res.body.transactionType.name).toEqual('approved');
  });

  it('get approved transaction OK', async () => {
    const transactionId = '4dd03d55-a29a-449d-8f0e-22bef7cc590d';
    const res = await supertest(app).get(`/api/transaction/${transactionId}`);
    expect(res.status).toBe(200);
    expect(res.body.transactionType.name).toEqual('approved');
  });

  it('create transaction - invalid request', async () => {
    const request = {};
    const res = await supertest(app)
      .post(`/api/transaction`)
      .send(request)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');

    expect(res.status).toBe(400);
    expect(res.body?.message).toEqual('Invalid Fields');
    expect(res.body?.errors?.length).toBe(4);
  });

  it('create transaction - negative amount value', async () => {
    const request = {
      accountExternalIdDebit: '1aa80dd2-a68f-40c8-b5bb-8c6afea8d3d7',
      accountExternalIdCredit: '2aa80dd2-a68f-40c8-b5bb-8c6afea8d3d7',
      tranferTypeId: 1,
      value: -5,
    };
    const res = await supertest(app)
      .post(`/api/transaction`)
      .send(request)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');

    expect(res.status).toBe(400);
    expect(res.body?.message).toEqual('Invalid Fields');
    expect(res.body?.errors).toContain('Minimum value transfer is 1');
    expect(res.body?.errors).toContain('Value transfer is invalid');
  });

  it('create transaction - creating OK', async () => {
    const request = {
      accountExternalIdDebit: '1aa80dd2-a68f-40c8-b5bb-8c6afea8d3d7',
      accountExternalIdCredit: '2aa80dd2-a68f-40c8-b5bb-8c6afea8d3d7',
      tranferTypeId: 1,
      value: 100,
    };
    const res = await supertest(app)
      .post(`/api/transaction`)
      .send(request)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');

    expect(res.status).toBe(200);
    expect(res.body?.operationTransactionId).not.toBeNull();
  });
});
