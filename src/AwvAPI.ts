'use strict';
import CityDownloadHelper from './helper/CityDownloadHelper';
import City from './models/City';
import Street from './models/Street';

/**
 * AwvAPI class
 *
 * @class AwvAPI
 */
export default class AwvAPI {
  static async downloadAllCitiesAndStreets(year: number) {
    const allCities = await AwvAPI.downloadAllCities(year);
    for (const city of allCities) {
      const allStreetsForCity = await AwvAPI.downloadAllStreetsForCity(
        year,
        city
      );
      city.setStreets(allStreetsForCity);
    }
  }

  static async downloadAllCities(year: number) {
    return CityDownloadHelper.searchCityOnly(year, '');
  }

  static async downloadAllStreetsForCity(year: number, city: City) {
    //return CityDownloadHelper.searchStreetOnly(year, city.id, '');
  }

  static async downloadEventsForStreet(year: number, street: Street) {}
}
