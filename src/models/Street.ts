'use strict';

import FieldHelper from '../helper/FieldHelper';
import Event from './Event';
import {Provider} from './Provider';

/**
 * Street class
 *
 * @class Street
 */
export default class Street {
  id: number;
  label: string;
  value: string;
  pamo: string;
  siemer: string;
  abfuhrbezirk: string;
  events: Event[];

  constructor(
    id: number,
    label: string,
    value: string,
    pamo: string,
    siemer: string,
    abfuhrbezirk: string
  ) {
    this.id = id;
    this.label = label;
    this.value = value;
    this.pamo = pamo;
    this.siemer = siemer;
    this.abfuhrbezirk = abfuhrbezirk;
    this.events = [];
    if (!this.isValid()) {
      throw new Error('Street is not valid! ' + this.toString());
    }
  }

  getEvents() {
    return this.events;
  }

  setEvents(events: Event[]) {
    this.events = events;
  }

  getProviderValue(provider: Provider) {
    switch (provider) {
      case Provider.VECHTA:
        return '';
      case Provider.PAMO:
        return this.pamo;
      case Provider.SIEMER:
        return this.siemer;
    }
  }

  isValid() {
    return (
      !isNaN(this.id) &&
      FieldHelper.hasNotEmptyStringFields(
        this,
        'label',
        'value',
        'pamo',
        'siemer',
        'abfuhrbezirk'
      )
    );
  }
}
