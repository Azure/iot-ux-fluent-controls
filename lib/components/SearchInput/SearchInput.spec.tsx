import * as React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { SearchInput } from './SearchInput';
import { describe, it } from 'mocha';

xdescribe('<SearchInput />', () => {
    it(`properly passes all the params with value null, render Search but not the search button`, () => {
        const wrapper = shallow(<SearchInput
            label='search'
            onSubmit={() => alert('onclick')}
            value=''
            onChange={() => alert('onchange')}
        />);
        expect(wrapper.html()).to.not.contains('search-button');
    });

    it(`properly passes all the params with value not null, render Search with the search button`, () => {
        const wrapper = shallow(<SearchInput
            label='search'
            onSubmit={() => alert('onclick')}
            value='value'
            onChange={() => alert('onchange')}
        />);
        expect(wrapper.html()).to.contains('search-button');
    });
});
