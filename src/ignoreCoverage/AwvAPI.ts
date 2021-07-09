/* istanbul ignore file */
'use strict';

import AbfallplanDownload from './AbfallplanDownload';
import FetchHelper from './FetchHelper';

/**
 * Server class
 *
 * @class FetchHelper
 */
export default class AwvAPI {
  static BASE_URL = 'https://www.abfallwirtschaft-vechta.de/CALENDER';
  static CALENDAR_URL = AwvAPI.BASE_URL + '/inc.get_calender.php';

  constructor() {}

  static async downloadAllCities(year: any) {
    return await AbfallplanDownload.searchCity(year, '');
  }
}
