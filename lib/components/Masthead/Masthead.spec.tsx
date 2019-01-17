import * as React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { Masthead } from './Masthead';
import { describe, it } from 'mocha';

describe('<Masthead />', () => {
    it('properly passes all the params, render Masthead', () => {
        const wrapper = shallow(<Masthead
            branding='brand'
            search={{ label: 'search', onSubmit: () => { }, value: '', onChange: () => { }, onClick: () => { } }}
            more={{
                label: 'label',
                icon: 'icon icon-help',
                onClick: () => { },
                selected: false
            }}
            toolBarItems={[{
                label: 'label',
                icon: 'icon icon-help',
                onClick: () => { },
                selected: false
            }]}
            user={{
                userMenuAriaLabel: 'aria-label',
                userMenuItems: [{
                    key: 'test',
                    label: 'test',
                    onClick: () => alert('user')
                }]
            }}
        />);

        // Render the masthead
        expect(wrapper.html()).to.contains('masthead');
        expect(wrapper.html()).to.contains('masthead-branding');
        expect(wrapper.html()).to.contains('masthead-toolbar');
        expect(wrapper.html()).to.contains('search-input-button');
        expect(wrapper.html()).to.contains('user-menu-item');
    });
});
