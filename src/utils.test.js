import { objectWithoutProperties } from './utils';

const testObj = {
  a: 1,
  b: 2,
  c: 3,
};

describe('utils', () => {
  describe('objectWithoutProperties', () => {
    test('remove a property', () => {
      const obj = objectWithoutProperties(testObj, ['a']);
      expect(obj).toEqual({ b: 2, c: 3 });
    });
    test('remove all properties', () => {
      const obj = objectWithoutProperties(testObj, Object.keys(testObj));
      expect(obj).toEqual({});
    });
    test('remove nothing', () => {
      const obj = objectWithoutProperties(testObj, []);
      expect(obj).toEqual(testObj);
    });
    test('remove unknown property', () => {
      const obj = objectWithoutProperties(testObj, ['d']);
      expect(obj).toEqual(testObj);
    });
  });
});
