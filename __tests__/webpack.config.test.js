const path = require('path');
const originalEnv = process.env;

describe('webpack config', () => {
  beforeEach(() => {
    process.env = { ...originalEnv };
    jest.resetModules();
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  test('defaults to development mode', () => {
    delete process.env.NODE_ENV;
    const config = require('../webpack.config');
    expect(config.mode).toBe('development');
    expect(config.entry.history).toBe(path.join(__dirname, '..', 'src', 'js', 'history.js'));
  });

  test('honors NODE_ENV when provided', () => {
    process.env.NODE_ENV = 'production';
    const config = require('../webpack.config');
    expect(config.mode).toBe('production');
  });
});
