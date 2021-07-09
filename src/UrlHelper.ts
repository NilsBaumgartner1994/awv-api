'use strict';

/**
 * Server class
 *
 * @class FetchHelper
 */
export default class UrlHelper {
  static BASE_URL = 'https://www.abfallwirtschaft-vechta.de/CALENDER';
  static CALENDAR_URL = UrlHelper.BASE_URL + '/inc.get_calender.php';

  static getCitySearchURL(citySearch: string) {
    return UrlHelper.BASE_URL + '/inc.suche_stadt.php?term=' + citySearch;
  }

  static getStreetSearchURL(cityId: string, streetSearch: string) {
    return (
      UrlHelper.BASE_URL +
      '/inc.suche_strasse.php?stadt=' +
      cityId +
      '&term=' +
      streetSearch
    );
  }
}
