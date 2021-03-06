import EventDownloadHelper from '../helper/EventDownloadHelper';
import City from '../models/City';
import Street from '../models/Street';
import FakeBackend from '../ignoreCoverage/FakeBackend';
import Event from '../models/Event';
import {Provider} from '../models/Provider';

const city = new City(3, 'Dinklage', 'Dinklage');
const street = new Street(
  542,
  'Bernhardstraße',
  'Bernhardstraße',
  '4',
  '1',
  '1'
);

test('Test downloadEventsAndAddToCities', async () => {
  const streets = [street, street];
  city.setStreets(streets);
  const cities = [city, city];

  const year = 2021;

  FakeBackend.IS_ACTIVE = true;
  const citiesWithEvents =
    await EventDownloadHelper.downloadEventsAndAddToCities(year, cities);
  FakeBackend.IS_ACTIVE = false;

  expect(citiesWithEvents).toBeTruthy();
  expect(citiesWithEvents.length).toBe(cities.length);
  for (const cityWithEvents of citiesWithEvents) {
    const streetsWithEvents = cityWithEvents.getStreets();
    expect(streetsWithEvents).toBeTruthy();
    expect(streetsWithEvents.length).toBe(streets.length);
    for (const streetWithEvents of streetsWithEvents) {
      const events = streetWithEvents.getEvents();
      const expectedFakeResults = FakeBackend.getFakeEvents();
      expect(events.length).toBe(expectedFakeResults.length);
      for (let i = 0; i < events.length; i++) {
        const receivedEvent: Event = events[i];
        const expectedEvent: Event = expectedFakeResults[i];
        expect(receivedEvent.toString() === expectedEvent.toString());
      }
    }
  }
});

test('Test downloadEvents', async () => {
  const streetWithOutPaper = new Street(
    542,
    'Bernhardstraße',
    'Bernhardstraße',
    '4',
    '0',
    '1'
  );

  const year = 2021;

  FakeBackend.IS_ACTIVE = true;
  const events = await EventDownloadHelper.downloadEventsForStreet(
    year,
    city,
    streetWithOutPaper
  );
  FakeBackend.IS_ACTIVE = false;

  expect(events).toBeTruthy();
  for (const event of events) {
    expect(event.provider !== Provider.SIEMER).toBeTruthy();
  }
});
