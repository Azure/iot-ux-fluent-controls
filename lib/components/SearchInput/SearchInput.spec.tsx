import * as React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { SearchInput } from './SearchInput';
import { describe, it } from 'mocha';

describe('<SearchInput />', () => {
    it(`properly passes all the params with value null, render Search but not the search button`, () => {
        const wrapper = shallow(<SearchInput
            label='search'
            onClick={() => alert('onclick')}
            value=''
            onChange={() => alert('onchange')}
        />);


        expect(wrapper.html()).to.equal('<div class="search-input-container"><span class="icon-medium icon-search search-prefix-icon"></span><div class="text-input-container search-input"><div class="input-container"><input type="text" name="search-input" value="" placeholder="search" autoComplete="off" class="input input-component"/><button type="button" tabindex="-1" class="cancel icon icon-cancelLegacy"></button></div></div></div>');
        expect(wrapper.html()).to.not.contains('search-button');
    });

    it(`properly passes all the params with value not null, render Search with the search button`, () => {
        const wrapper = shallow(<SearchInput
            label='search'
            onClick={() => alert('onclick')}
            value='value'
            onChange={() => alert('onchange')}
        />);
        expect(wrapper.html()).to.contains('search-button');
    });
});
