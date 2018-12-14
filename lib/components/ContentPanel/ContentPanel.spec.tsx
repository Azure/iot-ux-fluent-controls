import * as React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { ContentPanel } from './ContentPanel';
import { describe, it } from 'mocha';

describe('<ContentPanel />', () => {
    it('properly passes title and content string', () => {
        const wrapper = shallow(<ContentPanel
            title='title'
            content='test-content'
        />);

        expect(wrapper.html()).to.equal('<div role="complementary" class="content-panel sm md"><button type="button" class="action-trigger-button close-button"><div class="action-trigger-container action-trigger-label-empty"><span aria-label="close-panel" class="icon-xsmall icon-cancel"></span></div></button><div class="title inline-text-overflow">title </div><div class="content">test-content</div></div>');
        expect(wrapper.contains('test-content')).to.equal(true);
    });

    it('properly passes title and content DOM', () => {
        const wrapper = shallow(<ContentPanel
            title='title'
            content={<div>test-content-div</div>}
        />);

        expect(wrapper.html()).to.equal('<div role="complementary" class="content-panel sm md"><button type="button" class="action-trigger-button close-button"><div class="action-trigger-container action-trigger-label-empty"><span aria-label="close-panel" class="icon-xsmall icon-cancel"></span></div></button><div class="title inline-text-overflow">title </div><div class="content"><div>test-content-div</div></div></div>');
    });

    it('properly passes title, content and action', () => {
        const wrapper = shallow(<ContentPanel
            title='title'
            content={<div>test-content-div</div>}
            actions={{
                confirm: { label: 'action', event: () => alert('action triggered') },
                cancel: { label: 'action', event: () => alert('cancel triggered') }
            }}
        />);
        expect(wrapper.html()).to.equal('<div role="complementary" class="content-panel sm md"><button type="button" class="action-trigger-button close-button"><div class="action-trigger-container action-trigger-label-empty"><span aria-label="close-panel" class="icon-xsmall icon-cancel"></span></div></button><div class="title inline-text-overflow">title </div><div class="content"><div>test-content-div</div></div><span class="separator"></span><div class="actions"><button type="button" class="btn btn btn-primary inline-text-overflow">action</button><button type="button" autofocus="" class="btn btn btn-default inline-text-overflow">action</button></div></div>');
    });

});
