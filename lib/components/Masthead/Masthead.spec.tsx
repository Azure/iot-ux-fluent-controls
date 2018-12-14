import * as React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { Masthead } from './Masthead';
import { describe, it } from 'mocha';

describe('<Masthead />', () => {
    it('properly passes branding, render Masthead not Panel', () => {
        const wrapper = shallow(<Masthead
            branding='brand'
            searchBar={false}
        />);

        // Render the mastHead
        expect(wrapper.first().html()).to.equal('<div role="banner" class="masthead"><div class="masthead-branding inline-text-overflow" data-test-hook="masthead-application-name">brand</div><div class="masthead-toolbar-container"><ul class="masthead-toolbar"><li><button type="button" aria-label="search-button" data-test-hook="masthead-btn-search" class="action-trigger-button masthead-toolbar-btn sm"><div class="action-trigger-container action-trigger-label-empty"><span class="icon-xsmall icon-search"></span></div></button></li><li><button type="button" aria-label="settings" data-test-hook="masthead-btn-settings" class="action-trigger-button masthead-toolbar-btn"><div class="action-trigger-container action-trigger-label-empty"><span class="icon-xsmall icon-settings"></span></div></button></li><li><button type="button" aria-label="help" data-test-hook="masthead-btn-help" class="action-trigger-button masthead-toolbar-btn"><div class="action-trigger-container action-trigger-label-empty"><span class="icon-xsmall icon-help"></span></div></button></li><li><div class="circle masthead masthead-toolbar-btn user-btn"><span class="icon icon-alias-user"></span></div></li></ul></div></div>');
        // Don't render the ContentPanel
        expect(wrapper.at(1).html()).to.be.null;
    });   
});
