'use strict';
import CityDownloadHelper from './helper/CityDownloadHelper';
import StreetDownloadHelper from './helper/StreetDownloadHelper';
import City from './models/City';
import Street from './models/Street';
import EventDownloadHelper from './helper/EventDownloadHelper';

/**
 * AwvAPI class
 *
 * @class AwvAPI
 */
export default class AwvAPI {
  static async downloadAllCitiesAndStreetsAndEvents(year: number) {
    let allCities = await AwvAPI.downloadAllCitiesAndStreets(year);
    let citiesWithEvents =
      await EventDownloadHelper.downloadEventsAndAddToCities(year, allCities);
    return citiesWithEvents;
  }

  static async downloadAllCitiesAndStreets(year: number) {
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

  static async downloadAllCities(year: number) {
    return CityDownloadHelper.searchCityOnly(year, '');
  }

  static async downloadAllStreetsForCity(year: number, city: City) {
    return StreetDownloadHelper.searchStreetOnly(year, city.id, '');
  }

  static async downloadEventsForStreet(
    year: number,
    city: City,
    street: Street
  ) {
    await EventDownloadHelper.downloadEventsAndAddToStreet(year, city, street);
  }
}
