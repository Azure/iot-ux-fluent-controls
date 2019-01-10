import * as React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import FormField from './FormField';
import { describe, it } from 'mocha';
import { keyCode } from '../../Common';

describe('Form Field Component', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(
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
                <input id='test-field' type='text' />
            </FormField>
        );
    });

    it('should toggle tool tip when alt + f1 is pressed', () => {
        expect(wrapper.instance().state.tooltipVisible).to.equal(false);
        wrapper.find('#test-field').simulate('keyDown', { keyCode: keyCode.f1, altKey: true });
        expect(wrapper.instance().state.tooltipVisible).to.equal(true);
    });

    it('should untoggle tool tip when alt + f1 is pressed and then escape is pressed', () => {
        expect(wrapper.instance().state.tooltipVisible).to.equal(false);
        wrapper.find('#test-field').simulate('keyDown', { keyCode: keyCode.f1, altKey: true });
        expect(wrapper.instance().state.tooltipVisible).to.equal(true);
        wrapper.find('#test-field').simulate('keyDown', { keyCode: keyCode.escape });
        expect(wrapper.instance().state.tooltipVisible).to.equal(false);
    });

    it('should untoggle tool tip when alt + f1 is pressed and then tab is pressed', () => {
        expect(wrapper.instance().state.tooltipVisible).to.equal(false);
        wrapper.find('#test-field').simulate('keyDown', { keyCode: keyCode.f1, altKey: true });
        expect(wrapper.instance().state.tooltipVisible).to.equal(true);
        wrapper.find('#test-field').simulate('keyDown', { keyCode: keyCode.tab });
        expect(wrapper.instance().state.tooltipVisible).to.equal(false);
    });

    it('should leave tooltip toggled when any key other than escape is pressed', () => {
        expect(wrapper.instance().state.tooltipVisible).to.equal(false);
        wrapper.find('#test-field').simulate('keyDown', { keyCode: keyCode.f1, altKey: true });
        expect(wrapper.instance().state.tooltipVisible).to.equal(true);
        wrapper.find('#test-field').simulate('keyDown', { keyCode: 35 });
        expect(wrapper.instance().state.tooltipVisible).to.equal(true);
    });
});
