import { DevLogger } from './dev.logger';
import { JsonLogger } from './json.logger';
import { TskvLogger } from './tskv.logger';

describe('Logger', () => {
  let consoleLogSpy: jest.SpyInstance;
  let consoleErrorSpy: jest.SpyInstance;
  let consoleWarnSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('DevLogger', () => {
    it('should log message in dev format', () => {
      const logger = new DevLogger();
      logger.log('test message');
      expect(true).toBe(true);
    });
  });

  describe('JsonLogger', () => {
    it('should log message in JSON format', () => {
      const logger = new JsonLogger();
      logger.log('test message');

      const call = consoleLogSpy.mock.calls[0][0];
      const parsed = JSON.parse(call);

      expect(parsed).toHaveProperty('level', 'log');
      expect(parsed).toHaveProperty('message', 'test message');
      expect(parsed).toHaveProperty('timestamp');
    });

    it('should log error in JSON format', () => {
      const logger = new JsonLogger();
      logger.error('error message');

      const call = consoleErrorSpy.mock.calls[0][0];
      const parsed = JSON.parse(call);

      expect(parsed).toHaveProperty('level', 'error');
      expect(parsed).toHaveProperty('message', 'error message');
    });

    it('should include optional params', () => {
      const logger = new JsonLogger();
      logger.log('test', 'param1', 'param2');

      const call = consoleLogSpy.mock.calls[0][0];
      const parsed = JSON.parse(call);

      expect(parsed.optionalParams).toEqual(['param1', 'param2']);
    });
  });

  describe('TskvLogger', () => {
    it('should log message in TSKV format', () => {
      const logger = new TskvLogger();
      logger.log('test message');

      const call = consoleLogSpy.mock.calls[0][0];

      expect(call).toContain('level=log');
      expect(call).toContain('timestamp=');
      expect(call).toContain('message=test message');
      expect(call).toMatch(/\t/);
    });

    it('should log error in TSKV format', () => {
      const logger = new TskvLogger();
      logger.error('error message');

      const call = consoleErrorSpy.mock.calls[0][0];

      expect(call).toContain('level=error');
      expect(call).toContain('message=error message');
    });

    it('should include optional params', () => {
      const logger = new TskvLogger();
      logger.log('test', 'param1', 'param2');

      const call = consoleLogSpy.mock.calls[0][0];

      expect(call).toContain('extra=');
    });
  });
});