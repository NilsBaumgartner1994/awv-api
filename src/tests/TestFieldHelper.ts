import FieldHelper from '../helper/FieldHelper';

test('Test isNotEmptyString on empty string', async () => {
  expect(FieldHelper.isNotEmptyString(null)).toBe(false);
  expect(FieldHelper.isNotEmptyString('')).toBe(false);
});

test('Test isNotEmptyString on not empty string', async () => {
  expect(FieldHelper.isNotEmptyString('Hello')).toBe(true);
  expect(FieldHelper.isNotEmptyString('a')).toBe(true);
});

test('Test hasNotEmptyStringFields with an empty field', async () => {
  let key = 'A random Key';
  let value = null;
  let object = {[key]: value};
  expect(FieldHelper.hasNotEmptyStringFields(object, key)).toBe(false);
});

test('Test hasNotEmptyStringFields without empty field', async () => {
  let key = 'A random Key';
  let secondKey = key + '2';
  let value = 'A filled field';
  let object = {[key]: value, [secondKey]: value + '2'};
  expect(FieldHelper.hasNotEmptyStringFields(object, key, secondKey)).toBe(
    true
  );
});
