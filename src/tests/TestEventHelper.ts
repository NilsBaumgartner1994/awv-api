import Event from '../models/Event';
import {EventLabels} from '../models/EventLabels';
import {Provider} from '../models/Provider';
import EventHelper from '../helper/EventHelper';

test('Test isPapierPamo', async () => {
  const event = new Event('01.01.2021', EventLabels.PAPIER, Provider.PAMO);
  expect(EventHelper.isPapierPamo(event)).toBeTruthy();
  expect(EventHelper.isPapierSiemer(event)).toBeFalsy();
});

test('Test isPapierSiemer', async () => {
  const event = new Event('01.01.2021', EventLabels.PAPIER, Provider.SIEMER);
  expect(EventHelper.isPapierSiemer(event)).toBeTruthy();
  expect(EventHelper.isPapierPamo(event)).toBeFalsy();
});

test('Test isRestabfall', async () => {
  const event = new Event(
    '01.01.2021',
    EventLabels.RESTABFALL,
    Provider.VECHTA
  );
  expect(EventHelper.isRestabfall(event)).toBeTruthy();
});

test('Test isAltkleider', async () => {
  const event = new Event(
    '01.01.2021',
    EventLabels.ALTKLEIDER,
    Provider.VECHTA
  );
  expect(EventHelper.isAltkleider(event)).toBeTruthy();
});

test('Test isBioabfall', async () => {
  const event = new Event('01.01.2021', EventLabels.BIOABFALL, Provider.VECHTA);
  expect(EventHelper.isBioabfall(event)).toBeTruthy();
});

test('Test isGelbeTonne', async () => {
  const event = new Event(
    '01.01.2021',
    EventLabels.GELBE_TONNE,
    Provider.VECHTA
  );
  expect(EventHelper.isGelbeTonne(event)).toBeTruthy();
});

test('Test isSchadstoff', async () => {
  const event = new Event(
    '01.01.2021',
    EventLabels.SCHADSTOFF,
    Provider.VECHTA
  );
  expect(EventHelper.isSchadstoff(event)).toBeTruthy();
});
