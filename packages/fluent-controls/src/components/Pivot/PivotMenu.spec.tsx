import * as React from 'react';
import * as sinon from 'sinon';
import { expect, assert } from 'chai';
import { mount } from 'enzyme';
import { PivotMenu, PivotMenuAttributes } from './PivotMenu';
import { keyCode } from '../../Common';
import { TestHookWrapper } from '../Tests';

describe('<PivotMenu />', () => {
    it('closes dropdown when the text input field loses focus (bug 1608336)', () => {
        const onChange = sinon.spy();
        const createPivotOption = (num): any => {
            return {
                label: `PivotMenu #${num}`,
                key: `${num}`,
                icon: 'info',
                href: `#/!Page${num}`,
                title: `Title for PivotMenu #${num}`
            };
        };

        const links = [
            createPivotOption(0),
            createPivotOption(1),
            createPivotOption(2),
            createPivotOption(3),
            createPivotOption(4),
            createPivotOption(5),
        ];

        const anchorRefs: HTMLAnchorElement[] = [];
        const containerRefs: HTMLDivElement[] = [];

        links.forEach((link, index) => {
            link.attr = {
                anchor: {
                    'data-test-hook': `link-${index}-anchor`,
                    className: `link-${index} link-${index}-anchor`,
                    ref: (element) => anchorRefs.push(element)
                },
                container: {
                    'data-test-hook': `link-${index}-container`,
                    className: `link-${index} link-${index}-container`,
                    ref: (element) => containerRefs.push(element)
                }
            };
        });

        const wrapper = new TestHookWrapper<PivotMenuAttributes>(
            <PivotMenu
                links={links}
            />,
            ['container', 'anchor']
        );

        const firstAnchor = wrapper.find('link-0-anchor').first();
        expect(firstAnchor.hasClass('link-0')).to.equal(true);
        expect(firstAnchor.hasClass('link-0-anchor')).to.equal(true);        
        expect(firstAnchor.hasClass('link-1')).to.equal(false);

        const firstContainer = wrapper.find('link-0-container').first();
        expect(firstContainer.hasClass('link-0')).to.equal(true);
        expect(firstContainer.hasClass('link-0-container')).to.equal(true);        
        expect(firstContainer.hasClass('link-1')).to.equal(false);

        const lastAnchor = wrapper.find('link-5-anchor').last();
        expect(lastAnchor.hasClass('link-5')).to.equal(true);
        expect(lastAnchor.hasClass('link-5-anchor')).to.equal(true);        
        expect(lastAnchor.hasClass('link-0')).to.equal(false);

        const lastContainer = wrapper.find('link-5-container').last();
        expect(lastContainer.hasClass('link-5')).to.equal(true);
        expect(lastContainer.hasClass('link-5-container')).to.equal(true);        
        expect(lastContainer.hasClass('link-0')).to.equal(false);
    });
});
