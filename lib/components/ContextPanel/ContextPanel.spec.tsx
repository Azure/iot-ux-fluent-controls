import * as React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { ContextPanelPortal } from './ContextPanel';
import { describe, it } from 'mocha';

describe('<ContentPanel />', () => {
    it('properly passes header, footer, and content strings', () => {
        const wrapper = shallow(
            <ContextPanelPortal header='header' footer='footer' onClose={() => {}}>
                content
            </ContextPanelPortal>
        );

        expect(wrapper.contains('header'), 'header');
        expect(wrapper.contains('content'), 'content');
        expect(wrapper.contains('footer'), 'footer');
    }); 
    
    it('works without a footer', () => {
        const wrapper = shallow(
            <ContextPanelPortal header='header' onClose={() => {}}>content</ContextPanelPortal>
        );

        expect(wrapper.contains('header'), 'header');
        expect(wrapper.contains('content'), 'content');
    });
});
