import DownloadHelper from "../helper/DownloadHelper";
import FakeBackendOfAWV from "../ignoreCoverage/FakeBackendOfAWV";
import City from "../models/City";
import Street from "../models/Street";

let id = 6;
let label = "Label";
let value = "Value";
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
  // @ts-ignore //ignore invalid type passing
  expect(() => {new City("a", null, null)}).toThrow();
});


test('Test city set streets', async () => {
  let street = new Street(1, "label", "value", "pamo", "siemer", "abfuhrbezirk");
  let listOfStreets = [street];
  city.setStreets(listOfStreets);
  expect(city.streets).toBe(listOfStreets);
});

