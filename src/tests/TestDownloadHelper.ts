import DownloadHelper from '../helper/DownloadHelper';
const year = new Date().getFullYear();

test('Test searchCityOnly', async () => {
  const citySearchName = 'Dinklage';
  const cities = await DownloadHelper.searchCityOnly(year, citySearchName);
  expect(cities).toBeTruthy();
  expect(cities.length).toBe(1);
  expect(cities[0].label).toBe(citySearchName);
});

test('Test searchStreetOnly', async () => {
  const streetSearchName = 'Bernhardstra';
  const expectedStreetName = 'Bernhardstraße';
  const dinklageId = 3;
  const streets = await DownloadHelper.searchStreetOnly(
    year,
    dinklageId,
    streetSearchName
  );
  expect(streets).toBeTruthy();
  expect(streets.length).toBe(1);
  expect(streets[0].label).toBe(expectedStreetName);
});

test('Test searchStreetOnly without matches', async () => {
  const streetSearchName = 'MaxMustermann Straße';
  const dinklageId = 3;
  const streets = await DownloadHelper.searchStreetOnly(
    year,
    dinklageId,
    streetSearchName
  );
  expect(streets).toBeTruthy();
  expect(streets.length).toBe(0);
});
