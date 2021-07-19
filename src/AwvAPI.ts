'use strict';
import CityDownloadHelper from './helper/CityDownloadHelper';
import StreetDownloadHelper from './helper/StreetDownloadHelper';
import City from './models/City';
import Street from './models/Street';
import Event from './models/Event';
import EventDownloadHelper from './helper/EventDownloadHelper';

/**
 * AwvAPI class
 *
 * @class AwvAPI
 */
export default class AwvAPI {
  static async downloadAllCitiesAndStreetsAndEvents(
    year: number
  ): Promise<City[]> {
    const allCities = await AwvAPI.downloadAllCitiesAndStreets(year);
    return EventDownloadHelper.downloadEventsAndAddToCities(year, allCities);
  }

  static async downloadAllCitiesAndStreets(year: number): Promise<City[]> {
    const allCities = await AwvAPI.downloadAllCities(year);
    for (const city of allCities) {
      const allStreetsForCity = await AwvAPI.downloadAllStreetsForCity(
        year,
        city
      );
      city.setStreets(allStreetsForCity);
    }
    return allCities;
  }

  static async downloadAllCities(year: number): Promise<City[]> {
    return CityDownloadHelper.searchCityOnly(year, '');
  }

  static async downloadAllStreetsForCity(year: number, city: City) {
    return StreetDownloadHelper.searchStreetOnly(year, city.id, '');
  }

  static async downloadEventsForStreet(
    year: number,
    city: City,
    street: Street
  ): Promise<Event[]> {
    return EventDownloadHelper.downloadEventsForStreet(year, city, street);
  }
}
