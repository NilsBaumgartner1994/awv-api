'use strict';
import DownloadHelper from './helper/DownloadHelper';
import City from './models/City';
import Street from './models/Street';

/**
 * AwvAPI class
 *
 * @class AwvAPI
 */
export default class AwvAPI {
  static BASE_URL = 'https://www.abfallwirtschaft-vechta.de/CALENDER';
  static CALENDAR_URL = AwvAPI.BASE_URL + '/inc.get_calender.php';

  constructor() {}

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
    return DownloadHelper.searchCityOnly(year, '');
  }

  static async downloadAllStreetsForCity(year: number, city: City) {
    return DownloadHelper.searchStreetOnly(year, city.id, '');
  }

  static async downloadEventsForStreet(year: number, street: Street) {}
}
