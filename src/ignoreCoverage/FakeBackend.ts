'use strict';

import Event from '../models/Event';
import {Provider} from '../models/Provider';
import UrlHelper from '../helper/UrlHelper';

/**
 * FakeBackend class
 *
 * @class FakeBackend
 */
export default class FakeBackend {
  static IS_ACTIVE = false;

  static getFakeEventsResult(
    url: string,
    year: number,
    cityId: any,
    streetId: any,
    abfuhrbezirkId: any,
    papier: any,
    abfuhrbezirkpapier: any
  ): Event[] {
    let fakeEvents: Event[] = [
      new Event('05.01.' + year, 'Restabfall', Provider.VECHTA),
      new Event('12.01.' + year, 'Bioabfall', Provider.VECHTA),
      new Event('18.01.' + year, 'Gelbe Tonne', Provider.VECHTA),
      new Event('27.01.' + year, 'Altkleider', Provider.VECHTA),
      new Event('07.02.' + year, 'Mobile Schadstoff.', Provider.VECHTA),
    ];

    if (abfuhrbezirkpapier !== '0' || cityId === -1) {
      if (
        papier === UrlHelper.getProviderSearchField(Provider.PAMO) ||
        cityId === -1
      ) {
        fakeEvents.push(new Event('10.02.' + year, 'Altpapier', Provider.PAMO));
      }
      if (
        papier === UrlHelper.getProviderSearchField(Provider.SIEMER) ||
        cityId === -1
      ) {
        fakeEvents.push(
          new Event('19.02.' + year, 'Altpapier', Provider.SIEMER)
        );
      }
    }

    return fakeEvents;
  }

  static async returnFakeEventsRequest(
    url: string,
    year: number,
    cityId: any,
    streetId: any,
    abfuhrbezirkId: any,
    papier: any,
    abfuhrbezirkpapier: any
  ) {
    let fakeEvents = FakeBackend.getFakeEventsResult(
      url,
      year,
      cityId,
      streetId,
      abfuhrbezirkId,
      papier,
      abfuhrbezirkpapier
    );
    return {
      text: () => {
        let html = '<span class="an_other_class">01.02. : Restmüll</span>'; //to be ignored
        for (let event of fakeEvents) {
          let dateString = event.date.substr(0, 5);
          let label = event.label;
          html +=
            '<span class="month_termin">' +
            dateString +
            ' : ' +
            label +
            '</span>';
        }
        return html;
      },
    };
  }

  static async fakeFetch(
    url: string,
    year: number,
    cityId: any,
    streetId: any,
    abfuhrbezirkId: any,
    papier: any,
    abfuhrbezirkpapier: any
  ) {
    if (url === UrlHelper.CALENDAR_URL) {
      return FakeBackend.returnFakeEventsRequest(
        url,
        year,
        cityId,
        streetId,
        abfuhrbezirkId,
        papier,
        abfuhrbezirkpapier
      );
    }

    return null;
  }
}
