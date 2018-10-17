import * as React from 'react';
import * as sinon from 'sinon';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { RadioField } from './RadioField';
import { describe, it } from 'mocha';

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
        const wrapper = mount(
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
            />
        );

        expect(wrapper.find('.test-radio-1.test-radio-6').exists()).to.equal(false);
        expect(wrapper.find('.test-radio-1').exists()).to.equal(true);
        expect(wrapper.find('input#radio-field_4').props()).to.contain({'disabled': true});
        expect(wrapper.find('input#radio-field_3').props()).to.contain({'hidden': true});
    });
});
