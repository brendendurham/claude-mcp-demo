/**
 * Tests for utility helper functions
 */

const { formatDate, isValidString, safeJsonParse, generateId } = require('../utils/helpers');

describe('formatDate', () => {
  test('should format Date object correctly', () => {
    const date = new Date('2025-01-01T12:00:00Z');
    expect(formatDate(date)).toBeTruthy();
    expect(typeof formatDate(date)).toBe('string');
  });

  test('should throw error for non-Date input', () => {
    expect(() => formatDate('not a date')).toThrow(TypeError);
    expect(() => formatDate(null)).toThrow(TypeError);
  });
});

describe('isValidString', () => {
  test('should return true for valid strings', () => {
    expect(isValidString('hello')).toBe(true);
    expect(isValidString('a')).toBe(true);
  });

  test('should return false for invalid inputs', () => {
    expect(isValidString('')).toBe(false);
    expect(isValidString('   ')).toBe(false);
    expect(isValidString(null)).toBe(false);
    expect(isValidString(undefined)).toBe(false);
    expect(isValidString(123)).toBe(false);
    expect(isValidString({})).toBe(false);
  });
});

describe('safeJsonParse', () => {
  test('should parse valid JSON string', () => {
    const jsonStr = '{"name":"test","value":123}';
    const expected = { name: 'test', value: 123 };
    expect(safeJsonParse(jsonStr)).toEqual(expected);
  });

  test('should return null for invalid JSON', () => {
    const invalidJson = '{name:test}';
    expect(safeJsonParse(invalidJson)).toBeNull();
  });
});

describe('generateId', () => {
  test('should generate ID with default length', () => {
    const id = generateId();
    expect(id.length).toBe(8);
    expect(typeof id).toBe('string');
  });

  test('should generate ID with specified length', () => {
    const length = 12;
    const id = generateId(length);
    expect(id.length).toBe(length);
  });

  test('should generate unique IDs', () => {
    const id1 = generateId();
    const id2 = generateId();
    expect(id1).not.toBe(id2);
  });
});
