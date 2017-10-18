import * as React from 'react';
import * as sinon from 'sinon';
import { expect, assert } from 'chai';
import { mount } from 'enzyme';
import { NumberInput, NumberInputAttributes } from './NumberInput';
import { keyCode } from '../../Common';
import { TestHookWrapper } from '../Tests';

describe('<NumberInput />', () => {
    it('handles null case', () => {
        let value = '';
        const onChange = (newValue) => value = newValue;
        const wrapper = new TestHookWrapper<NumberInputAttributes>(
            <NumberInput
                name='combo-input'
                initialValue=''
                onChange={onChange}
            />,
            ['container', 'input']
        );

        const input = wrapper.ref('input');

        input.input('1');
        expect(input.value).to.equal('1');
        expect(value).to.equal(1);

        input.input('');
        expect(input.value).to.equal('');
        expect(value).to.equal('');

        input.input('1');
        expect(input.value).to.equal('1');
        expect(value).to.equal(1);

        input.input('1-');
        expect(input.value).to.equal('1');
        expect(value).to.equal(1);
    });
});
