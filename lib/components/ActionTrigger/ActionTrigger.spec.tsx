import * as React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { ActionTrigger } from './ActionTrigger';
import { describe, it } from 'mocha';

describe('<ActionTrigger />', () => {
    it('properly passes through className property (bug 1625745)', () => {
        const wrapper = shallow(<ActionTrigger
            icon='info'
            className='test-class-name'
        />);

        expect(wrapper.getDOMNode().classList).to.contain('.test-class-name');
    });
});
