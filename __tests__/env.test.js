const originalEnv = process.env;

describe('env module', () => {
  beforeEach(() => {
    process.env = { ...originalEnv };
    delete process.env.NODE_ENV;
    delete process.env.PORT;
    jest.resetModules();
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  test('exports defaults when env vars are undefined', () => {
    const env = require('../utils/env');
    expect(env.NODE_ENV).toBe('development');
    expect(env.PORT).toBe(3000);
  });

  test('uses env variables when provided', () => {
    process.env.NODE_ENV = 'production';
    process.env.PORT = '8080';
    const env = require('../utils/env');
    expect(env.NODE_ENV).toBe('production');
    expect(env.PORT).toBe('8080');
  });
});
