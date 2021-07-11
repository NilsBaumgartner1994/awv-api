import UrlHelper from '../helper/UrlHelper';
const faker = require('faker');

test('Test getCitySearchURL', async () => {
  let containsLetter = faker.address.city();
  let expectation = UrlHelper.SEARCH_CITY_URL + containsLetter;
  expect(UrlHelper.getCitySearchURL(containsLetter)).toBe(expectation);
});

test('Test getStreetSearchURL', async () => {
  let containsLetter = faker.address.streetName();
  let cityId = 4;
  let expectation =
    UrlHelper.SEARCH_STREET_BASE_URL + cityId + '&term=' + containsLetter;
  expect(UrlHelper.getStreetSearchURL(cityId, containsLetter)).toBe(
    expectation
  );
});
