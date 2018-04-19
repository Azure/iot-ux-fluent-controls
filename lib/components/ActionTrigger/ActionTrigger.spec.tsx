import * as React from 'react';
import * as sinon from 'sinon';
import { expect, assert } from 'chai';
import { mount } from 'enzyme';
import { ActionTrigger, ActionTriggerAttributes } from './ActionTrigger';
import { keyCode } from '../../Common';
import { TestHookWrapper } from '../Tests';
import { describe, it } from 'mocha';

describe('<ActionTrigger />', () => {
    it('properly passes through className property (bug 1625745)', () => {
        const onChange = sinon.spy();
        const wrapper = new TestHookWrapper<ActionTriggerAttributes>(
            <ActionTrigger
                icon='info'
                className='test-class-name'
            />,
            ['container']
        );

        const container = wrapper.ref('container');

        expect(container.hasClass('test-class-name')).to.equal(true);
    });
});
