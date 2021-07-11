import DownloadHelper from '../helper/DownloadHelper';
const year = new Date().getFullYear();

test('Test searchCityOnly', async () => {
  let citySearchName = 'Dinklage';
  let cities = await DownloadHelper.searchCityOnly(year, citySearchName);
  expect(cities).toBeTruthy();
  expect(cities.length).toBe(1);
  expect(cities[0].label).toBe(citySearchName);
});

test('Test searchStreetOnly', async () => {
  let streetSearchName = 'Bernhardstra';
  let expectedStreetName = 'Bernhardstraße';
  let dinklageId = 3;
  let streets = await DownloadHelper.searchStreetOnly(
    year,
    dinklageId,
    streetSearchName
  );
  expect(streets).toBeTruthy();
  expect(streets.length).toBe(1);
  expect(streets[0].label).toBe(expectedStreetName);
});

test('Test searchStreetOnly without matches', async () => {
  let streetSearchName = 'MaxMustermann Straße';
  let dinklageId = 3;
  let streets = await DownloadHelper.searchStreetOnly(
    year,
    dinklageId,
    streetSearchName
  );
  expect(streets).toBeTruthy();
  expect(streets.length).toBe(0);
});
