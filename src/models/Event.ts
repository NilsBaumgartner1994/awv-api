'use strict';
import FieldHelper from '../helper/FieldHelper';

/**
 * Event class
 *
 * @class Event
 */
export default class Event {

  date: string;
  label: string;
  provider: string;

  constructor(date: string, label: string, provider: string) {
    this.date = date;
    this.label = label;
    this.provider = provider
    if (!this.isValid()) {
      throw new Error('Event is not valid!');
    }
  }

  isValid() {
    return (
      FieldHelper.hasNotEmptyStringFields(this, 'date','label', 'provider')
    );
  }

  getDate() : Date{
    let splits = this.date.split(".");
    return new Date(splits[3]+"-"+splits[1]+"-"+splits[0]);
  }

}
