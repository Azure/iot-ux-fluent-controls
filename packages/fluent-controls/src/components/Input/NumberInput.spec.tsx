import * as React from 'react';
import * as sinon from 'sinon';
import { expect, assert } from 'chai';
import { mount } from 'enzyme';
import { NumberInput, NumberInputAttributes } from './NumberInput';
import { keyCode } from '../../Common';
import { TestHookWrapper } from '../Tests';

describe('<NumberInput />', () => {
    it('closes dropdown when the text input field loses focus (bug 1608336)', () => {
        const onChange = sinon.spy();
        const wrapper = new TestHookWrapper<NumberInputAttributes>(
            <NumberInput
                name='combo-input'
                initialValue=''
                onChange={onChange}
            />,
            ['container', 'input']
        );

        const input = wrapper.ref('input');

        
    });
});
