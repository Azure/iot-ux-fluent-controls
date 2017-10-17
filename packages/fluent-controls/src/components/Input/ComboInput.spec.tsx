import * as React from 'react';
import * as sinon from 'sinon';
import { expect, assert } from 'chai';
import { mount } from 'enzyme';
import { ComboInput, ComboInputAttributes } from './ComboInput';
import { keyCode } from '../../Common';
import { TestHookWrapper } from '../Tests';

describe('<ComboInput />', () => {
    it('closes dropdown when the text input field loses focus (bug 1608336)', () => {
        const onChange = sinon.spy();
        const wrapper = new TestHookWrapper<ComboInputAttributes>(
            <ComboInput
                name='combo-input'
                value=''
                options={
                    [
                        {label: 'Label 1', value: 'Option 1'},
                        {label: 'Label 2', value: 'Option 2'},
                        {label: 'Label 3', value: 'Option 3'},
                        {label: 'Label 4', value: 'Option 4', hidden: true},
                        {label: 'Label 5', value: 'Option 5', disabled: true},
                    ]
                }
                onChange={onChange}
            />,
            ['container', 'input', 'dropdown']
        );

        const input = wrapper.ref('input');
        const dropdown = wrapper.ref('dropdown');

        expect(wrapper.state.visible).to.equal(false);
        input.focus();
        expect(dropdown.hasClass('visible')).to.equal(true);

        wrapper.dispatchEvent('focusin', {target: input.node});
        expect(dropdown.hasClass('visible')).to.equal(true);

        wrapper.dispatchEvent('focusin', {target: dropdown.node});
        expect(dropdown.hasClass('visible')).to.equal(true);
        
        wrapper.dispatchEvent('focusin', {target: document.body});
        expect(dropdown.hasClass('visible')).to.equal(false);
    });
});

describe('<ComboInput />', () => {
    it('does not throw an error when the user hits enter without selecting an option (bug 1608338)', () => {
        const onChange = sinon.spy();
        const wrapper = new TestHookWrapper<ComboInputAttributes>(
            <ComboInput
                name='combo-input'
                value=''
                options={
                    [
                        {label: 'Label 1', value: 'Option 1'},
                        {label: 'Label 2', value: 'Option 2'},
                        {label: 'Label 3', value: 'Option 3'},
                        {label: 'Label 4', value: 'Option 4', hidden: true},
                        {label: 'Label 5', value: 'Option 5', disabled: true},
                    ]
                }
                onChange={onChange}
            />,
            ['container', 'input', 'dropdown']
        );

        const input = wrapper.ref('input');
        const dropdown = wrapper.ref('dropdown');

        expect(wrapper.state.visible).to.equal(false);
        input.focus();
        expect(dropdown.hasClass('visible')).to.equal(true);

        input.keyDown('enter');
        /**
         * We don't actually have to test anything here, test will throw an
         * error there is a regression 
         */
    });
});

describe('<ComboInput />', () => {
    it('does not show a dropdown when props.options is empty (bug 1619044)', () => {
        const onChange = sinon.spy();
        const wrapper = new TestHookWrapper<ComboInputAttributes>(
            <ComboInput
                name='combo-input'
                value=''
                options={
                    []
                }
                onChange={onChange}
            />,
            ['container', 'input', 'dropdown']
        );

        const input = wrapper.ref('input');
        const dropdown = wrapper.ref('dropdown');

        expect(wrapper.state.visible).to.equal(false);
        input.focus();
        expect(dropdown).to.equal(null);
    });
});
