import * as React from 'react';
import * as sinon from 'sinon';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { NumberInput } from './NumberInput';
import { describe, it } from 'mocha';

xdescribe('<NumberInput />', () => {
    it('should pass null through change call back when input is empty', () => {
        const onChange = sinon.spy();
        const wrapper = mount(<NumberInput
            name='combo-input'
            initialValue='3'
            onChange={onChange}
        />);

        wrapper.find('input').simulate('change', { target: { value: '' } });
        expect(onChange.called).to.equal(true);
        expect(onChange.firstCall.args[0]).to.equal(null);
    });

    it('should return a number when a number is input', () => {
        const onChange = sinon.spy();
        const wrapper = mount(<NumberInput
            name='combo-input'
            initialValue=''
            onChange={onChange}
        />);

        wrapper.find('input').simulate('change', { target: { value: '3' } });
        expect(onChange.called).to.equal(true);
        expect(onChange.firstCall.args[0]).to.equal(3);
    });

    it('should return invalid when input is not a number or empty', () => {
        const onChange = sinon.spy();
        const wrapper = mount(<NumberInput
            name='combo-input'
            initialValue=''
            onChange={onChange}
        />);

        wrapper.find('input').simulate('change', { target: { value: 'foo' } });
        expect(onChange.called).to.equal(true);
        expect(onChange.firstCall.args[0]).to.equal('invalid');
    });
});
