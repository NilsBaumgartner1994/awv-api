import EventDownloadHelper from '../helper/EventDownloadHelper';
import City from '../models/City';
import Street from '../models/Street';
import FakeBackend from '../ignoreCoverage/FakeBackend';
import UrlHelper from "../helper/UrlHelper";
import Event from "../models/Event";
import {Provider} from "../models/Provider";

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
  let streets = [street, street];
  city.setStreets(streets);
  let cities = [city, city];

  let year = 2021;

  FakeBackend.IS_ACTIVE = true;
  const citiesWithEvents = await EventDownloadHelper.downloadEventsAndAddToCities(
      year,
      cities
  );
  FakeBackend.IS_ACTIVE = false;

  expect(citiesWithEvents).toBeTruthy();
  expect(citiesWithEvents.length).toBe(cities.length);
  for(let cityWithEvents of citiesWithEvents){
    let streetsWithEvents = cityWithEvents.getStreets();
    expect(streetsWithEvents).toBeTruthy();
    expect(streetsWithEvents.length).toBe(streets.length);
    for(let streetWithEvents of streetsWithEvents){
      let events = streetWithEvents.getEvents();
      let expectedFakeResults = FakeBackend.getFakeEventsResult(UrlHelper.CALENDAR_URL, year, -1, -1, -1, -1, -1);
      expect(events.length).toBe(expectedFakeResults.length);
      for(let i=0; i<events.length; i++){
        let receivedEvent: Event = events[i];
        let expectedEvent: Event = expectedFakeResults[i];
        expect(receivedEvent.toString()===expectedEvent.toString());
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

  let year = 2021;

  FakeBackend.IS_ACTIVE = true;
  const events = await EventDownloadHelper.downloadEventsForStreet(
      year, city, streetWithOutPaper
  );
  FakeBackend.IS_ACTIVE = false;

  expect(events).toBeTruthy();
  for(let event of events){
    expect(event.provider!==Provider.SIEMER).toBeTruthy();
  }

});
