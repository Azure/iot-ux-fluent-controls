import * as React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { Masthead } from './Masthead';
import { describe, it } from 'mocha';

describe('<Masthead />', () => {
    it('properly passes all the params, render Masthead', () => {
        const wrapper = shallow(<Masthead
            branding='brand'
            search={{ label: 'search', onSubmit: () => { }, value: '', onChange: () => { } }}
            more={{
                label: 'label',
                icon: 'icon icon-help',
                onClick: () => { },
                isSelected: false
            }}
            toolBarItems={[{
                label: 'label',
                icon: 'icon icon-help',
                onClick: () => { },
                isSelected: false
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
        
        expect(wrapper.html()).to.equal('<div role="banner" class="masthead"><span data-test-hook="masthead-application-name" class="masthead-branding inline-text-overflow">brand</span><div class="search-input-container search-input-container"><span class="icon-medium icon-search search-prefix-icon"></span><div class="text-input-container search-input masthead-search-input"><div class="input-container"><input type="text" name="search-input" value="" placeholder="search" autoComplete="off" class="input input-component"/><button type="button" tabindex="-1" class="cancel icon icon-cancelLegacy"></button></div></div></div><div class="masthead-toolbar-container"><ul class="masthead-toolbar"><li class="search-input-button"><button type="button" aria-label="search" data-test-hook="masthead-btn-search" class="action-trigger-button masthead-toolbar-btn"><div class="action-trigger-container action-trigger-label-empty"><span class="icon-xsmall icon-search"></span></div></button></li><li class="show-label"><button type="button" class="action-trigger-button masthead-toolbar-btn"><div class="action-trigger-container"><span class="icon-xsmall icon-icon icon-help"><span class="action-trigger-label">label</span></span></div></button></li><li class="more-menu-item"><div class="inline-popup-container"><button aria-expanded="false" class="inline-popup-label inline-btn masthead-toolbar-btn more-menu-btn" tabindex="0"><button type="button" class="action-trigger-button masthead-toolbar-btn"><div class="action-trigger-container action-trigger-label-empty"><span class="icon-xsmall icon-icon icon-help"></span></div></button></button></div></li><li class="user-menu-item"><div class="inline-popup-container"><button aria-expanded="false" class="inline-popup-label inline-btn masthead-toolbar-btn user-menu-btn" tabindex="0"><div aria-label="aria-label" class="circle masthead masthead-toolbar-btn user-btn"><span class="icon icon-alias-user"></span></div></button></div></li></ul></div></div>');
    });
});
