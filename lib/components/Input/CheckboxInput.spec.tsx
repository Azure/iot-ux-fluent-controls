import * as React from 'react';
import * as sinon from 'sinon';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { CheckboxInput } from './CheckboxInput';
import { describe, it } from 'mocha';

xdescribe('CheckboxInput', () => {
    it('should support data test hooks through the Attribute API', () => {
        const onChange = sinon.spy();
        const wrapper = mount(<CheckboxInput
            name='checkbox-input'
            label='Checkbox Label'
            onChange={onChange}
            attr={{
                container: {'data-test-hook': 'container'},
                input: {'data-test-hook': 'input'},
                text: {'data-test-hook': 'label'},
                checkbox: {'data-test-hook': 'checkbox'}
            }}
        />);

        wrapper.find('input').simulate('change');

        expect(onChange.called).to.equal(true);
    });
});