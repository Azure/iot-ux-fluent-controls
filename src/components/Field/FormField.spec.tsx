import * as React from 'react';
import * as sinon from 'sinon';
import * as classNames from 'classnames/bind';
import { expect, assert } from 'chai';
import { mount } from 'enzyme';
import FormField, { FormFieldProps } from './FormField';
import { keyCode } from '../../Common';
import { TestHookWrapper } from '../../common/testHookWrapper.spec';
import { describe, it } from 'mocha';

describe('Form Field Component', () => {
    it('should toggle tool tip when alt + f1 is pressed', () => {
        const wrapper = new TestHookWrapper<FormFieldProps>(
            <FormField
                name='test-field'
                tooltip='test tooltip'
                attr={{
                    fieldLabel: {
                        balloon: {
                            balloonContent: {
                                id: 'abc123'
                            }
                        }
                    }
                }}
            >
                <div>empty</div>
            </FormField>,
            ['children']
        )

        expect(wrapper.state.tooltipVisible).to.equal(false);

        wrapper.ref('children').keyDown(111, {altKey: true});

        expect(wrapper.state.tooltipVisible).to.equal(true);
    });

    it('should untoggle tool tip when alt + f1 is pressed and then escape is pressed', () => {
        const wrapper = new TestHookWrapper<FormFieldProps>(
            <FormField
                name='test-field'
                tooltip='test tooltip'
                attr={{
                    fieldLabel: {
                        balloon: {
                            balloonContent: {
                                id: 'abc123'
                            }
                        }
                    }
                }}
            >
                <div>empty</div>
            </FormField>,
            ['children']
        )

        expect(wrapper.state.tooltipVisible).to.equal(false);

        wrapper.ref('children').keyDown(111, {altKey: true});

        expect(wrapper.state.tooltipVisible).to.equal(true);

        wrapper.ref('children').keyDown('escape');

        expect(wrapper.state.tooltipVisible).to.equal(false);
    });

    it('should leave tooltip toggled when any key other than escape is pressed', () => {
        const wrapper = new TestHookWrapper<FormFieldProps>(
            <FormField
                name='test-field'
                tooltip='test tooltip'
                attr={{
                    fieldLabel: {
                        balloon: {
                            balloonContent: {
                                id: 'abc123'
                            }
                        }
                    }
                }}
            >
                <div>empty</div>
            </FormField>,
            ['children']
        )

        expect(wrapper.state.tooltipVisible).to.equal(false);

        wrapper.ref('children').keyDown(111, {altKey: true});

        expect(wrapper.state.tooltipVisible).to.equal(true);

        wrapper.ref('children').keyDown(35);

        expect(wrapper.state.tooltipVisible).to.equal(true);
    });
});
