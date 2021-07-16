'use strict';

import UrlHelper from './UrlHelper';
import FetchHelper from '../ignoreCoverage/FetchHelper';
import City from '../models/City';
import Event from '../models/Event';
import Street from '../models/Street';
import {parse} from 'node-html-parser';
import {Provider} from '../models/Provider';
import EventFilterHelper from './EventFilterHelper';

/**
 * EventDownloadHelper class
 *
 * @class EventDownloadHelper
 */
export default class EventDownloadHelper {
  static async downloadEventsAndAddToCities(
    year: number,
    cities: City[]
  ): Promise<City[]> {
    let citiesWithEvents: City[] = [];
    for (const city of cities) {
      const cityWithEvents: City =
        await EventDownloadHelper.downloadEventsAndAddToCity(year, city);
      citiesWithEvents.push(cityWithEvents);
    }
    return citiesWithEvents;
  }

  static async downloadEventsAndAddToCity(
    year: number,
    city: City
  ): Promise<City> {
    let streetsWithEvents: Street[] = [];
    const streets = city.getStreets();
    for (const street of streets) {
      const streetWithEvents =
        await EventDownloadHelper.downloadEventsAndAddToStreet(
          year,
          city,
          street
        );
      streetsWithEvents.push(streetWithEvents);
    }
    city.setStreets(streetsWithEvents);
    return city;
  }

  static async downloadEventsAndAddToStreet(
    year: number,
    city: City,
    street: Street
  ): Promise<Street> {
    let events: Event[] = await EventDownloadHelper.downloadEventsForStreet(
      year,
      city,
      street
    );
    street.setEvents(events);
    return street;
  }

  static async downloadEventsForStreet(
    year: number,
    city: City,
    street: Street
  ): Promise<Event[]> {
    let vechtaEvents: Event[] = await EventDownloadHelper.downloadEvents(
      year,
      city,
      street,
      Provider.VECHTA,
      []
    );
    let rawPamoEvents: Event[] = await EventDownloadHelper.downloadEvents(
      year,
      city,
      street,
      Provider.PAMO,
      vechtaEvents
    );
    let rawSiemerEvents: Event[] = await EventDownloadHelper.downloadEvents(
      year,
      city,
      street,
      Provider.SIEMER,
      vechtaEvents
    );
    let mergedEvents = vechtaEvents.concat(rawPamoEvents, rawSiemerEvents);
    return EventFilterHelper.sortListOfEvents(mergedEvents);
  }

  private static async downloadEvents(
    year: number,
    city: City,
    street: Street,
    provider: Provider,
    baseEvents: Event[]
  ): Promise<Event[]> {
    const providerField = UrlHelper.getProviderSearchField(provider);
    const abfuhrbezirkpapier = street.getProviderValue(provider);
    const url = UrlHelper.CALENDAR_URL;

    let events: Event[] = [];

    if (abfuhrbezirkpapier !== '0') {
      let response = await FetchHelper.fetchWithCookie(
        url,
        year,
        city.id,
        street.id,
        street.abfuhrbezirk,
        providerField,
        abfuhrbezirkpapier
      );
      let html = await response.text();
      events = EventDownloadHelper.parseWebsiteTextToEvents(
        html,
        provider,
        year,
        baseEvents
      );
    }

    return events;
  }

  private static parseWebsiteTextToEvents(
    html: string,
    provider: Provider,
    year: number,
    baseEvents: Event[]
  ): Event[] {
    let events: Event[] = [];
    let dictOfBaseEvents =
      EventFilterHelper.parseListOfEventsToDict(baseEvents);

    const root = parse(html);
    let elements = root.querySelectorAll('span');
    for (let element of elements) {
      if (element.classList.contains('month_termin')) {
        let text = element.text; // 05.01 : Restabfall
        let split = text.split(' : ');
        let dateAsString = split[0] + '.' + year;
        let label = split[1];
        let event: Event = new Event(dateAsString, label, provider);
        if (!EventFilterHelper.isEventInDictOfEvents(event, dictOfBaseEvents)) {
          events.push(event);
        }
      }
    }
    return events;
  }
}
