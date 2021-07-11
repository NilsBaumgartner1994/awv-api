import Street from "../models/Street";

let id = 6;
let label = "Label";
let value = "Value";
let pamo = "0";
let siemer = "2";
let abfuhrbezirk = "1";
let street: Street;

beforeEach(() => {
  street = new Street(id, label, value, pamo, siemer, abfuhrbezirk);
});

test('Test street constructor', async () => {
  expect(street.id).toBe(id);
  expect(street.label).toBe(label);
  expect(street.value).toBe(value);
  expect(street.pamo).toBe(pamo);
  expect(street.siemer).toBe(siemer);
  expect(street.abfuhrbezirk).toBe(abfuhrbezirk);
});

test('Test invalid street', async () => {
  // @ts-ignore //ignore invalid type passing
  expect(() => {new Street("a", null, null, null, null, null)}).toThrow();
});
