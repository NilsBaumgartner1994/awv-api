'use strict';

import UrlHelper from './UrlHelper';
import FetchHelper from '../ignoreCoverage/FetchHelper';
import City from '../models/City';
import Event from '../models/Event';
import Street from '../models/Street';

/**
 * EventDownloadHelper class
 *
 * @class EventDownloadHelper
 */
export default class EventDownloadHelper {
  static async downloadEventsForCities(year: number, cities: City[]) {
    let events: Event[] = [];
   
    return events;
  }
}
