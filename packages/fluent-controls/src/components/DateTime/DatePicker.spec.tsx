import * as React from 'react';
import * as chaiEnzyme from 'chai-enzyme';
import { expect } from 'chai';
import { mount } from 'enzyme';
import {  } from 'karma';

import {DatePicker, DateFormat} from './DatePicker';

const setup = (initialValue, newProps) => {
  const props = {
    name: 'date-picker',
    initialValue,
    tabIndex: -1,

    ...newProps
  };

  const wrapper = mount(<DatePicker {...props} />);

  return {
    props,
    wrapper
  };
};

describe('DatePicker', () => {
  it('should handle typing', () => {
    const { props, wrapper } = setup('Thu, 28 Sep 2017 17:28:40 GMT', {
        localTimezone: true,
        format: DateFormat.DDMMYYYY
    });

    expect(wrapper.find('input').value).toEqual('28/09/2017');
  });
});