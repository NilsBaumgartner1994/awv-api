import EventDownloadHelper from '../helper/EventDownloadHelper';
import City from '../models/City';
import Street from '../models/Street';
import FakeBackend from '../ignoreCoverage/FakeBackend';
const year = new Date().getFullYear();

test('Test download Events for a city', async () => {
  const city = new City(3, 'Dinklage', 'Dinklage');
  /**
   id: 542,
   label: 'Bernhardstraße',
   value: 'Bernhardstraße',
   pamo: '4',
   siemer: '1',
   abfuhrbezirk: '1',
   */
  const street = new Street(
    542,
    'Bernhardstraße',
    'Bernhardstraße',
    '4',
    '1',
    '1'
  );
  //FakeBackend.IS_ACTIVE = true;
  const events = await EventDownloadHelper.downloadEventsForStreet(
    2021,
    city,
    street
  );
  //FakeBackend.IS_ACTIVE = false;
  expect(events).toBeTruthy();
});
