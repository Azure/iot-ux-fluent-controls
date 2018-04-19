import * as React from 'react';
import * as sinon from 'sinon';
import * as classNames from 'classnames/bind';
import { expect, assert } from 'chai';
import { mount } from 'enzyme';
import { RadioField } from './RadioField';
import { RadioInputAttributes } from '../Input/RadioInput';
import { keyCode } from '../../Common';
import { TestHookWrapper } from '../../common/testHookWrapper.spec';
import { describe, it } from 'mocha';

const css = classNames.bind(require('../Input/RadioInput.scss'));

describe('<RadioField />', () => {
    it('passes attributes from props.options', () => {
        const onChange = sinon.spy();
        const radioRefs: HTMLInputElement[] = [];
        const getAttr = (index: number) => {
            return {
                radio: {
                    ref: (element) => radioRefs.push(element),
                    className: `test-radio-${index}`,
                    'data-test-hook': `test-radio-${index}`
                }
            };
        };
        const wrapper = new TestHookWrapper<RadioInputAttributes>(
            <RadioField
                name='radio-field'
                value='Option 1'
                label='Radio Field'
                options={
                    [
                        {label: 'Label 1', value: 'Option 1', attr: getAttr(1)},
                        {label: 'Label 2', value: 'Option 2', attr: getAttr(2)},
                        {label: 'Label 3', value: 'Option 3', attr: getAttr(3)},
                        {label: 'Label 4', value: 'Option 4', attr: getAttr(4), hidden: true},
                        {label: 'Label 5', value: 'Option 5', attr: getAttr(5), disabled: true},
                        {label: 'Label 6', value: 'Option 6', attr: getAttr(6)},
                    ]
                }
                onChange={onChange}
            />,
            []
        );

        expect(wrapper.find('test-radio-1').first().hasClass('test-radio-1')).to.equal(true);
        expect(wrapper.find('test-radio-1').first().hasClass('test-radio-6')).to.equal(false);
        expect(wrapper.find('test-radio-1').first().hasClass(css('radio-button'))).to.equal(true);

        expect(wrapper.find('test-radio-6').first().hasClass('test-radio-6')).to.equal(true);
        expect(wrapper.find('test-radio-6').first().hasClass('test-radio-1')).to.equal(false);
        expect(wrapper.find('test-radio-6').first().hasClass(css('radio-button'))).to.equal(true);
    });
});
