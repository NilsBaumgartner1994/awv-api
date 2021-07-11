import City from '../models/City';
import Street from '../models/Street';

const id = 6;
const label = 'Label';
const value = 'Value';
let city: City;

beforeEach(() => {
  city = new City(id, label, value);
});

test('Test city constructor', async () => {
  expect(city.id).toBe(id);
  expect(city.label).toBe(label);
  expect(city.value).toBe(value);
  expect(city.streets.length).toBe([].length);
});

test('Test invalid city', async () => {
  expect(() => {
    // @ts-ignore //ignore invalid type passing
    new City('a', null, null);
  }).toThrow();
});

test('Test city set streets', async () => {
  const street = new Street(
    1,
    'label',
    'value',
    'pamo',
    'siemer',
    'abfuhrbezirk'
  );
  const listOfStreets = [street];
  city.setStreets(listOfStreets);
  expect(city.streets).toBe(listOfStreets);
});
