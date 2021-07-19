import AwvAPI from '../AwvAPI';
import FakeBackend from '../ignoreCoverage/FakeBackend';
import Street from '../models/Street';
import City from '../models/City';

const year = 2021;

test('Test downloadAllCitiesAndStreetsAndEvents', async () => {
  FakeBackend.IS_ACTIVE = true;
  const allCitiesWithEvents = await AwvAPI.downloadAllCitiesAndStreetsAndEvents(
    year
  );
  FakeBackend.IS_ACTIVE = false;

  expect(allCitiesWithEvents).toBeTruthy();
  expect(allCitiesWithEvents.length).toBe(FakeBackend.getFakeCities().length);
  for (const city of allCitiesWithEvents) {
    expect(city).toBeTruthy();
    const streets = city.getStreets();
    expect(streets).toBeTruthy();
    expect(streets.length).toBe(FakeBackend.getFakeCities().length);
    for (const street of streets) {
      expect(street).toBeTruthy();
      const events = street.getEvents();
      expect(events).toBeTruthy();
      expect(events.length).toBe(FakeBackend.getFakeEvents().length);
    }
  }
});

test('Test downloadEventsForStreet', async () => {
  const fakeCity = FakeBackend.getFakeCities()[0];
  const fakeStreet = FakeBackend.getFakeStreets()[0];

  FakeBackend.IS_ACTIVE = true;
  const events = await AwvAPI.downloadEventsForStreet(
    year,
    fakeCity,
    fakeStreet
  );
  FakeBackend.IS_ACTIVE = false;

  expect(events).toBeTruthy();
  const expectedEvents = FakeBackend.getFakeEvents();
  expect(events.length).toBe(expectedEvents.length);
});

test('Test downloadEventsForStreet with real backend', async () => {
  const streetRaw = {
    id: 542,
    label: 'Bernhardstraße',
    value: 'Bernhardstraße',
    pamo: '4',
    siemer: '1',
    abfuhrbezirk: '1',
  };
  const street = new Street(
    streetRaw.id,
    streetRaw.label,
    streetRaw.value,
    streetRaw.pamo,
    streetRaw.siemer,
    streetRaw.abfuhrbezirk
  );

  const cityRaw = {id: 3, label: 'Dinklage', value: 'Dinklage', streets: []};
  const city = new City(cityRaw.id, cityRaw.value, cityRaw.value);

  const events = await AwvAPI.downloadEventsForStreet(year, city, street);

  expect(events).toBeTruthy();
  expect(events.length > 0).toBeTruthy();
});
