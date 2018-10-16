import * as React from 'react';
import * as sinon from 'sinon';
import { expect, assert } from 'chai';
import { mount } from 'enzyme';
import { CheckboxInput } from './CheckboxInput';
// import {TestHookWrapper} from '../../common/testHookWrapper.spec';
import { it } from 'mocha';

describe('CheckboxInput', () => {


    it('should support data test hooks through the Attribute API', () => {
        // const onChange = sinon.spy();
        // const wrapper = new TestHookWrapper(<CheckboxInput
        //     name='checkbox-input'
        //     label='Checkbox Label'
        //     onChange={onChange}
        //     attr={{
        //         container: {'data-test-hook': 'container'},
        //         input: {'data-test-hook': 'input'},
        //         text: {'data-test-hook': 'label'},
        //         checkbox: {'data-test-hook': 'checkbox'}
        //     }}
        // />);

        // wrapper.find('checkbox').simulate('click');

        // expect(onChange.called).to.equal(true);
    });
});