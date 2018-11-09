import * as React from 'react';
import * as sinon from 'sinon';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { DateFormat} from '../../Common';
import { DatePicker} from './DatePicker';
import { describe, it } from 'mocha';
import { adjustForTimezone } from './helpers';

describe('DatePicker', () => {
    let clock;
    beforeEach(() => {
        clock = sinon.useFakeTimers();
    });

    afterEach(() => {
        clock.restore();
    });

    it('should set the text box value when initial value is a valid date', () => {
        const onChange = sinon.spy();
        const wrapper = shallow(<DatePicker
            name='date-picker'
            initialValue={'2018-12-06T00:00:00.000'}
            format={DateFormat.DDMMYYYY}
            onChange={onChange}
        />);

        expect(wrapper.instance().state.value).to.equal('06/12/2018');
    });

    it('should pass through initial value to text box when initial value is not a valid date', () => {
        const onChange = sinon.spy();
        const wrapper = shallow(<DatePicker
            name='date-picker'
            initialValue={'2018-28-28T00:00:00.000'}
            format={DateFormat.DDMMYYYY}
            onChange={onChange}
        />);

        expect(wrapper.instance().state.value).to.equal('2018-28-28T00:00:00.000');
    });

    it('should pass invalid through change callback when date value is garbage text', () => {
        const onChange = sinon.spy();
        const wrapper = shallow(<DatePicker
            name='date-picker'
            initialValue='2018-10-28T00:00:00.000'
            format={DateFormat.DDMMYYYY}
            onChange={onChange}
        />);

        const input = wrapper.find('.date-picker-input');
        input.simulate('change', {target: {value: 'foo'}});
        expect(onChange.called).to.equal(true);
        expect(onChange.calledOnceWith('invalid'));
    });

    it('should pass invalid through change callback when date value is bad date', () => {
        const onChange = sinon.spy();
        const wrapper = shallow(<DatePicker
            name='date-picker'
            initialValue='2018-10-28T00:00:00.000'
            format={DateFormat.DDMMYYYY}
            onChange={onChange}
        />);

        const input = wrapper.find('.date-picker-input');
        input.simulate('change', {target: {value: '13/13/2013'}});
        expect(onChange.called).to.equal(true);
        expect(onChange.calledOnceWith('invalid'));
    });

    it('should pass invalid through change callback when date value is empty string', () => {
        const onChange = sinon.spy();
        const wrapper = shallow(<DatePicker
            name='date-picker'
            initialValue='2018-10-28T00:00:00.000'
            format={DateFormat.DDMMYYYY}
            onChange={onChange}
        />);

        const input = wrapper.find('.date-picker-input');
        input.simulate('change', {target: {value: ''}});
        expect(onChange.called).to.equal(true);
        expect(onChange.calledOnceWith('invalid'));
    });

    it('should pass invalid through change callback when pasted value is a garbage string', () => {
        const onChange = sinon.spy();
        const wrapper = shallow(<DatePicker
            name='date-picker'
            initialValue='2018-10-28T00:00:00.000'
            format={DateFormat.DDMMYYYY}
            onChange={onChange}
        />);

        const input = wrapper.find('.date-picker-input');
        input.simulate('paste');
        input.simulate('change', {target: {value: '13/13/2013'}});
        expect(onChange.called).to.equal(true);
        expect(onChange.calledOnceWith('invalid'));
    });

    it('should show calendar when calendar button is clicked', () => {
        const onChange = sinon.spy();
        const wrapper = shallow(<DatePicker
            name='date-picker'
            format={DateFormat.DDMMYYYY}
            onChange={onChange}
        />);

        const button = wrapper.find('.date-picker-calendar-icon');
        button.simulate('click');
        expect(wrapper.instance().state.expanded).to.equal(true);
    });

    it('should accept dd/mm/yyyy format as a valid input', () => {
        const onChange = sinon.spy();
        const wrapper = shallow(<DatePicker
            name='date-picker'
            format={DateFormat.DDMMYYYY}
            onChange={onChange}
        />);

        const input = wrapper.find('.date-picker-input');
        input.simulate('change', {target: {value: '28/09/2018'}});
        expect(onChange.called).to.equal(true);
        expect(adjustForTimezone(onChange.firstCall.args[0])).to.equal('2018-09-28T00:00:00.000Z'); 
    });

    it('should accept iso format as a valid input', () => {
        const onChange = sinon.spy();
        const wrapper = shallow(<DatePicker
            name='date-picker'
            format={DateFormat.YYYYMMDD}
            onChange={onChange}
        />);

        const input = wrapper.find('.date-picker-input');
        input.simulate('change', {target: {value: '2018/09/28'}});
        expect(onChange.called).to.equal(true);
        expect(adjustForTimezone(onChange.firstCall.args[0])).to.equal('2018-09-28T00:00:00.000Z');
    });

    it('should set time to midnight gmt + localoffest when initial value is empty', () => {
        const onChange = sinon.spy();
        const wrapper = shallow(<DatePicker
            name='date-picker'
            format={DateFormat.YYYYMMDD}
            onChange={onChange}
        />);

        const input = wrapper.find('.date-picker-input');
        input.simulate('change', {target: {value: '2018/09/28'}});
        expect(onChange.called).to.equal(true);
        expect(adjustForTimezone(onChange.firstCall.args[0])).to.equal('2018-09-28T00:00:00.000Z');
    });

    it('should set time to midnight gmt + localoffest when initial value is not empty', () => {
        const onChange = sinon.spy();
        const wrapper = shallow(<DatePicker
            name='date-picker'
            format={DateFormat.YYYYMMDD}
            onChange={onChange}
            initialValue={'2018-10-28T00:00:00.000'}
        />);

        const input = wrapper.find('.date-picker-input');
        input.simulate('change', {target: {value: '2018/09/29'}});
        expect(onChange.called).to.equal(true);
        expect(adjustForTimezone(onChange.firstCall.args[0])).to.equal('2018-09-29T00:00:00.000Z');
    });

    it('should set time to midnight when initial value is not empty and localTimezone is false', () => {
        const onChange = sinon.spy();
        const wrapper = shallow(<DatePicker
            name='date-picker'
            format={DateFormat.YYYYMMDD}
            onChange={onChange}
            initialValue={'2018-10-28T00:00:00.000Z'}
            localTimezone={false}
        />);

        const input = wrapper.find('.date-picker-input');
        input.simulate('change', {target: {value: '2018/09/29'}});
        expect(onChange.called).to.equal(true);
        expect(onChange.firstCall.args[0]).to.equal('2018-09-29T00:00:00.000Z');
    });
});