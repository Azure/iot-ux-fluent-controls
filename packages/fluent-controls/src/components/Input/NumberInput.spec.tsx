import * as React from 'react';
import * as sinon from 'sinon';
import { expect, assert } from 'chai';
import { mount } from 'enzyme';
import { NumberInput } from './NumberInput';
import { TextInputAttributes } from './TextInput';
import { keyCode } from '../../Common';
import { TestHookWrapper } from '../Tests';

describe('<NumberInput />', () => {
    it('handles null case', () => {
        let value = '';
        const onChange = (newValue) => value = newValue;
        const wrapper = new TestHookWrapper<TextInputAttributes>(
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
        expect(value).to.equal(null);

        input.input('1');
        expect(input.value).to.equal('1');
        expect(value).to.equal(1);

        input.input('2');
        expect(input.value).to.equal('2');
        expect(value).to.equal(2);
    });
});

describe('<NumberInput />', () => {
    it('handles floats', () => {
        let value = '';
        const onChange = (newValue) => value = newValue;
        const wrapper = new TestHookWrapper<TextInputAttributes>(
            <NumberInput
                name='combo-input'
                initialValue=''
                step='any'
                onChange={onChange}
            />,
            ['container', 'input']
        );

        const input = wrapper.ref('input');

        input.input('1');
        expect(input.value).to.equal('1');
        expect(value).to.equal(1);

        input.input('1.');
        expect(input.value).to.equal('1.');
        expect(value).to.equal(1);

        input.input('1.2');
        expect(input.value).to.equal('1.2');
        expect(value).to.equal(1.2);

        input.input('2.2');
        expect(input.value).to.equal('2.2');
        expect(value).to.equal(2.2);

        input.input('-2.2');
        expect(input.value).to.equal('-2.2');
        expect(value).to.equal(-2.2);
    });
});
