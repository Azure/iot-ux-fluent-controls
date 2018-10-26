import * as React from 'react';
import * as sinon from 'sinon';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { DateFormat} from '../../Common';
import { DatePicker} from './DatePicker';
import { describe, it } from 'mocha';

describe('DatePicker', () => {
    let clock;
    beforeEach(() => {
        clock = sinon.useFakeTimers();
    });

    afterEach(() => {
        clock.restore();
    });

    it('should accept a valid date string for initial value', () => {
        const onChange = sinon.spy();
        const wrapper = shallow(<DatePicker
            name='date-picker'
            initialValue='Thu, 28 Sep 2017 17:28:40 GMT'
            format={DateFormat.DDMMYYYY}
            onChange={onChange}
        />);

        expect(wrapper.instance().state.value).to.equal('28/09/2017');
    });

    it('should pass invalid through change callback when date value is garbage text', () => {
        const onChange = sinon.spy();
        const wrapper = shallow(<DatePicker
            name='date-picker'
            initialValue='Thu, 28 Sep 2017 17:28:40 GMT'
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
            initialValue='Thu, 28 Sep 2017 17:28:40 GMT'
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
            initialValue='Thu, 28 Sep 2017 17:28:40 GMT'
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
            initialValue='Thu, 28 Sep 2017 17:28:40 GMT'
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
        expect(onChange.firstCall.args[0]).to.equal('2018-09-28T23:00:00.000Z');
    });

    it('should accept mm/dd/yyyy format as a valid input', () => {
        const onChange = sinon.spy();
        const wrapper = shallow(<DatePicker
            name='date-picker'
            format={DateFormat.MMDDYYYY}
            onChange={onChange}
        />);

        const input = wrapper.find('.date-picker-input');
        input.simulate('change', {target: {value: '09/28/2018'}});
        expect(onChange.called).to.equal(true);
        expect(onChange.firstCall.args[0]).to.equal('2018-09-28T23:00:00.000Z');
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
        expect(onChange.firstCall.args[0]).to.equal('2018-09-28T23:00:00.000Z');
    });

    it('should set time to epoch when initial value is empty', () => {
        const onChange = sinon.spy();
        const wrapper = shallow(<DatePicker
            name='date-picker'
            format={DateFormat.YYYYMMDD}
            onChange={onChange}
        />);

        const input = wrapper.find('.date-picker-input');
        input.simulate('change', {target: {value: '2018/09/28 10:12:13'}});
        expect(onChange.called).to.equal(true);
        expect(onChange.firstCall.args[0]).to.equal('2018-09-28T23:00:00.000Z');
    });

    it('should set time to epoch when initial value is not empty', () => {
        const onChange = sinon.spy();
        const wrapper = shallow(<DatePicker
            name='date-picker'
            format={DateFormat.YYYYMMDD}
            onChange={onChange}
            initialValue={'2018/09/28 10:12:13AM'}
        />);

        const input = wrapper.find('.date-picker-input');
        input.simulate('change', {target: {value: '2018/09/29 10:12:13'}});
        expect(onChange.called).to.equal(true);
        expect(onChange.firstCall.args[0]).to.equal('2018-09-29T23:00:00.000Z');
    });
});
