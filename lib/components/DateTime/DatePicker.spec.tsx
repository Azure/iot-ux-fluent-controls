import * as React from 'react';
import * as sinon from 'sinon';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import { DateFormat} from '../../Common';
import { DatePicker, DatePickerProps} from './DatePicker';
import { describe, it } from 'mocha';
import { AttrElementWrapper } from '../../Attributes';

// class DatePickerWrapper extends ReactWrapper<DatePickerProps, any> {
//     input: any;

//     constructor(props: DatePickerProps) {
//         super(<DatePicker {...props as any}/>);
//         this.input = this.find('input');
//     }

//     focus() {
//         this.input.simulate('focus');
//     }

//     change(newValue: string) {
//         this.input.simulate('input', {target: {value: newValue}});
//     }

//     get value(): any {
//         return this.state('value');
//     }
// }

describe('DatePicker', () => {
    it('should accept a valid date string for initial value', () => {
        const onChange = sinon.spy();
        const wrapper = shallow(<DatePicker
            name='date-picker'
            initialValue='Thu, 28 Sep 2017 17:28:40 GMT'
            localTimezone={true}
            format={DateFormat.DDMMYYYY}
            onChange={onChange}
        />);

        expect(wrapper.instance().state.value).to.equal('28/09/2017');
    });

    it('should tell caller when date value is invalid', () => {
        const onChange = sinon.spy();
        const wrapper = shallow(<DatePicker
            name='date-picker'
            initialValue='Thu, 28 Sep 2017 17:28:40 GMT'
            localTimezone={true}
            format={DateFormat.DDMMYYYY}
            onChange={onChange}
        />);

        const input = wrapper.find('date-picker-input');
        input.simulate('change', 'foo');
        expect(onChange.called).to.equal(true);
        expect(onChange.calledOnceWith('invalid'));
    });



    // wrapper.focus();
    // expect(wrapper.state('visible')).to.equal(true);

    // wrapper.change('28/09/201');
    // expect(wrapper.value).to.equal('28/09/201');
    // expect(onChange.args[0][0]).to.equal('Mon, 28 Sep 0201 17:28:40 GMT');

    // wrapper.change('28/09/2018');
    // expect(wrapper.value).to.equal('28/09/2018');
    // expect(onChange.args[1][0]).to.equal('Fri, 28 Sep 2018 17:28:40 GMT');

    // wrapper.change('2/09/2018');
    // expect(wrapper.value).to.equal('2/09/2018');
    // expect(onChange.args[2][0]).to.equal('Sun, 02 Sep 2018 17:28:40 GMT');

    // wrapper.change('21/09/2018');
    // expect(wrapper.value).to.equal('21/09/2018');
    // expect(onChange.args[3][0]).to.equal('Fri, 21 Sep 2018 17:28:40 GMT');

    // wrapper.change('21/0/2018');
    // expect(wrapper.value).to.equal('21/0/2018');
    // expect(onChange.args[4][0]).to.equal('invalid');

    // wrapper.change('21/08/2018');
    // expect(wrapper.value).to.equal('21/08/2018');
    // expect(onChange.args[5][0]).to.equal('Tue, 21 Aug 2018 17:28:40 GMT');

    // it('should handle typing with invalid initial value until the invalid value is corrected and then take it as the initial value', () => {
    //     const onChange = sinon.spy();
    //     const wrapper = new DatePickerWrapper({
    //         name: 'date-picker',
    //         initialValue: 'Thu, 283 Sep 2017 17:28:40 GM',
    //         localTimezone: true,
    //         format: DateFormat.DDMMYYYY,
    //         onChange: onChange
    //     });

    //     expect(wrapper.value).to.equal('Thu, 283 Sep 2017 17:28:40 GM');

    //     wrapper.focus();
    //     expect(wrapper.state('visible')).to.equal(true);

    //     wrapper.change('Thu, 28 Sep 2017 17:28:40 GM');
    //     expect(wrapper.value).to.equal('Thu, 28 Sep 2017 17:28:40 GM');
    //     expect(onChange.args[0][0]).to.equal('invalid');

    //     wrapper.change('Thu, 28 Sep 2017 17:28:40 GMT');
    //     expect(wrapper.value).to.equal('28/09/2017');
    //     expect(onChange.args[1][0]).to.equal('Thu, 28 Sep 2017 17:28:40 GMT');

    //     wrapper.change('28/09/201');
    //     expect(wrapper.value).to.equal('28/09/201');
    //     expect(onChange.args[2][0]).to.equal('Mon, 28 Sep 0201 17:28:40 GMT');

    //     wrapper.change('21/09/2018');
    //     expect(wrapper.value).to.equal('21/09/2018');
    //     expect(onChange.args[3][0]).to.equal('Fri, 21 Sep 2018 17:28:40 GMT');
    // });

    // it('should handle typing with empty value', () => {
    //     const onChange = sinon.spy();
    //     const wrapper = new DatePickerWrapper({
    //         name: 'date-picker',
    //         initialValue: 'Fri, 21 Sep 2018 17:28:40 GMT',
    //         localTimezone: true,
    //         format: DateFormat.DDMMYYYY,
    //         onChange: onChange
    //     });

    //     expect(wrapper.value).to.equal('21/09/2018');

    //     wrapper.focus();
    //     expect(wrapper.state('visible')).to.equal(true);

    //     wrapper.change('');
    //     expect(wrapper.value).to.equal('');
    //     expect(onChange.args[0][0]).to.equal('invalid');

    //     wrapper.change('4');
    //     expect(wrapper.value).to.equal('04/');
    //     expect(onChange.args[1][0]).to.equal('invalid');

    //     wrapper.change('04/5');
    //     expect(wrapper.value).to.equal('04/05/');
    //     expect(onChange.args[2][0]).to.equal('invalid');

    //     wrapper.change('04/05/2');
    //     expect(wrapper.value).to.equal('04/05/2');
    //     expect(onChange.args[3][0]).to.equal('Sat, 04 May 0002 17:28:40 GMT');

    //     wrapper.change('04/05/20');
    //     expect(wrapper.value).to.equal('04/05/20');
    //     expect(onChange.args[4][0]).to.equal('Mon, 04 May 0020 17:28:40 GMT');

    //     wrapper.change('04/05/201');
    //     expect(wrapper.value).to.equal('04/05/201');
    //     expect(onChange.args[5][0]).to.equal('Mon, 04 May 0201 17:28:40 GMT');

    //     wrapper.change('04/05/2015');
    //     expect(wrapper.value).to.equal('04/05/2015');
    //     expect(onChange.args[6][0]).to.equal('Mon, 04 May 2015 17:28:40 GMT');
    // });

    // it('should allow pasted value to update value and allow editing when invalid', () => {
    //     const onChange = sinon.spy();
    //     const wrapper = new DatePickerWrapper({
    //         name: 'date-picker',
    //         initialValue: 'Fri, 21 Sep 2018 17:28:40 GMT',
    //         localTimezone: true,
    //         format: DateFormat.DDMMYYYY,
    //         onChange: onChange
    //     });

    //     expect(wrapper.value).to.equal('21/09/2018');

    //     wrapper.focus();
    //     expect(wrapper.state('visible')).to.equal(true);

    //     wrapper.input.simulate('paste');
    //     wrapper.change('21/09/2018Fri, 21 Sep 2018 10:00:00 GMT');
    //     expect(wrapper.value).to.equal('21/09/2018Fri, 21 Sep 2018 10:00:00 GMT');
    //     expect(onChange.args[0][0]).to.equal('invalid');

    //     wrapper.change('21/09Fri, 21 Sep 2018 10:00:00 GMT');
    //     expect(wrapper.value).to.equal('21/09Fri, 21 Sep 2018 10:00:00 GMT');
    //     expect(onChange.args[1][0]).to.equal('invalid');

    //     wrapper.change('2Fri, 21 Sep 2018 10:00:00 GMT');
    //     expect(wrapper.value).to.equal('2Fri, 21 Sep 2018 10:00:00 GMT');
    //     expect(onChange.args[2][0]).to.equal('invalid');

    //     wrapper.change('Fri, 21 Sep 2018 10:00:00 GMT');
    //     expect(wrapper.value).to.equal('21/09/2018');
    //     expect(onChange.args[3][0]).to.equal('Fri, 21 Sep 2018 10:00:00 GMT');
    // });

    // it('(TMZ-GMT Overflow) should handle typing with initial value while preserving input Time', () => {
    //     const onChange = sinon.spy();
    //     const wrapper = new DatePickerWrapper({
    //         name: 'date-picker',
    //         initialValue: 'Thu, 28 Sep 2017 03:28:40 GMT',
    //         localTimezone: true,
    //         format: DateFormat.DDMMYYYY,
    //         onChange: onChange
    //     });

    //     expect(wrapper.value).to.equal('27/09/2017');

    //     wrapper.focus();
    //     expect(wrapper.state('visible')).to.equal(true);

    //     wrapper.change('27/09/201');
    //     expect(wrapper.value).to.equal('27/09/201');
    //     expect(onChange.args[0][0]).to.equal('Mon, 28 Sep 0201 03:28:40 GMT');

    //     wrapper.change('27/09/2018');
    //     expect(wrapper.value).to.equal('27/09/2018');
    //     expect(onChange.args[1][0]).to.equal('Fri, 28 Sep 2018 03:28:40 GMT');

    //     wrapper.change('2/09/2018');
    //     expect(wrapper.value).to.equal('2/09/2018');
    //     expect(onChange.args[2][0]).to.equal('Mon, 03 Sep 2018 03:28:40 GMT');

    //     wrapper.change('21/09/2018');
    //     expect(wrapper.value).to.equal('21/09/2018');
    //     expect(onChange.args[3][0]).to.equal('Sat, 22 Sep 2018 03:28:40 GMT');

    //     wrapper.change('21/0/2018');
    //     expect(wrapper.value).to.equal('21/0/2018');
    //     expect(onChange.args[4][0]).to.equal('invalid');

    //     wrapper.change('21/08/2018');
    //     expect(wrapper.value).to.equal('21/08/2018');
    //     expect(onChange.args[5][0]).to.equal('Wed, 22 Aug 2018 03:28:40 GMT');
    // });

    // it('(TMZ-GMT Overflow) should handle typing with invalid initial value until the invalid value is corrected and then take it as the initial value', () => {
    //     const onChange = sinon.spy();
    //     const wrapper = new DatePickerWrapper({
    //         name: 'date-picker',
    //         initialValue: 'Thu, 283 Sep 2017 03:28:40 GM',
    //         localTimezone: true,
    //         format: DateFormat.DDMMYYYY,
    //         onChange: onChange
    //     });

    //     expect(wrapper.value).to.equal('Thu, 283 Sep 2017 03:28:40 GM');

    //     wrapper.focus();
    //     expect(wrapper.state('visible')).to.equal(true);

    //     wrapper.change('Thu, 28 Sep 2017 03:28:40 GM');
    //     expect(wrapper.value).to.equal('Thu, 28 Sep 2017 03:28:40 GM');
    //     expect(onChange.args[0][0]).to.equal('invalid');

    //     wrapper.change('Thu, 28 Sep 2017 03:28:40 GMT');
    //     expect(wrapper.value).to.equal('27/09/2017');
    //     expect(onChange.args[1][0]).to.equal('Thu, 28 Sep 2017 03:28:40 GMT');

    //     wrapper.change('27/09/201');
    //     expect(wrapper.value).to.equal('27/09/201');
    //     expect(onChange.args[2][0]).to.equal('Mon, 28 Sep 0201 03:28:40 GMT');

    //     wrapper.change('27/09/2018');
    //     expect(wrapper.value).to.equal('27/09/2018');
    //     expect(onChange.args[3][0]).to.equal('Fri, 28 Sep 2018 03:28:40 GMT');
    // });

    // it('(TMZ-GMT Overflow) should handle typing with empty value', () => {
    //     const onChange = sinon.spy();
    //     const wrapper = new DatePickerWrapper({
    //         name: 'date-picker',
    //         initialValue: 'Fri, 21 Sep 2018 03:28:40 GMT',
    //         localTimezone: true,
    //         format: DateFormat.DDMMYYYY,
    //         onChange: onChange
    //     });

    //     expect(wrapper.value).to.equal('20/09/2018');

    //     wrapper.focus();
    //     expect(wrapper.state('visible')).to.equal(true);

    //     wrapper.change('');
    //     expect(wrapper.value).to.equal('');
    //     expect(onChange.args[0][0]).to.equal('invalid');

    //     wrapper.change('4');
    //     expect(wrapper.value).to.equal('04/');
    //     expect(onChange.args[1][0]).to.equal('invalid');

    //     wrapper.change('04/5');
    //     expect(wrapper.value).to.equal('04/05/');
    //     expect(onChange.args[2][0]).to.equal('invalid');

    //     wrapper.change('04/05/2');
    //     expect(wrapper.value).to.equal('04/05/2');
    //     expect(onChange.args[3][0]).to.equal('Sun, 05 May 0002 03:28:40 GMT');

    //     wrapper.change('04/05/20');
    //     expect(wrapper.value).to.equal('04/05/20');
    //     expect(onChange.args[4][0]).to.equal('Tue, 05 May 0020 03:28:40 GMT');

    //     wrapper.change('04/05/201');
    //     expect(wrapper.value).to.equal('04/05/201');
    //     expect(onChange.args[5][0]).to.equal('Tue, 05 May 0201 03:28:40 GMT');

    //     wrapper.change('04/05/2015');
    //     expect(wrapper.value).to.equal('04/05/2015');
    //     expect(onChange.args[6][0]).to.equal('Tue, 05 May 2015 03:28:40 GMT');
    // });
});

// describe('DatePicker (TMZ-YYYYMMDD)', () => {
//     it('(DAYLIGHT SAVINGS) should handle typing with initial value while preserving input Time', () => {
//         const onChange = sinon.spy();
//         const wrapper = new DatePickerWrapper({
//             name: 'date-picker',
//             initialValue: 'Thu, 28 Sep 2017 17:28:40 GMT',
//             localTimezone: true,
//             format: DateFormat.YYYYMMDD,
//             onChange: onChange
//         });

//         expect(wrapper.value).to.equal('2017/09/28');

//         wrapper.focus();
//         expect(wrapper.state('visible')).to.equal(true);

//         wrapper.change('2017/09/2');
//         expect(wrapper.value).to.equal('2017/09/2');
//         expect(onChange.args[0][0]).to.equal('Sat, 02 Sep 2017 17:28:40 GMT');

//         wrapper.change('2017/09/21');
//         expect(wrapper.value).to.equal('2017/09/21');
//         expect(onChange.args[1][0]).to.equal('Thu, 21 Sep 2017 17:28:40 GMT');

//         wrapper.change('201/09/21');
//         expect(wrapper.value).to.equal('201/09/21');
//         expect(onChange.args[2][0]).to.equal('Mon, 21 Sep 0201 17:28:40 GMT');

//         wrapper.change('2010/09/21');
//         expect(wrapper.value).to.equal('2010/09/21');
//         expect(onChange.args[3][0]).to.equal('Tue, 21 Sep 2010 17:28:40 GMT');

//         wrapper.change('2010/0/21');
//         expect(wrapper.value).to.equal('2010/0/21');
//         expect(onChange.args[4][0]).to.equal('invalid');

//         wrapper.change('2010/02/21');
//         expect(wrapper.value).to.equal('2010/02/21');
//         expect(onChange.args[5][0]).to.equal('Sun, 21 Feb 2010 18:28:40 GMT');
//     });
// });

// describe('DatePicker (GMT-YYYYMMDD)', () => {
//     it('should handle typing with initial value while preserving input Time', () => {
//         const onChange = sinon.spy();
//         const wrapper = new DatePickerWrapper({
//             name: 'date-picker',
//             initialValue: 'Thu, 28 Sep 2017 17:28:40 GMT',
//             localTimezone: false,
//             format: DateFormat.YYYYMMDD,
//             onChange: onChange
//         });

//         expect(wrapper.value).to.equal('2017/09/28');

//         wrapper.focus();
//         expect(wrapper.state('visible')).to.equal(true);

//         wrapper.change('2017/09/2');
//         expect(wrapper.value).to.equal('2017/09/2');
//         expect(onChange.args[0][0]).to.equal('Sat, 02 Sep 2017 17:28:40 GMT');

//         wrapper.change('2017/09/21');
//         expect(wrapper.value).to.equal('2017/09/21');
//         expect(onChange.args[1][0]).to.equal('Thu, 21 Sep 2017 17:28:40 GMT');

//         wrapper.change('201/09/21');
//         expect(wrapper.value).to.equal('201/09/21');
//         expect(onChange.args[2][0]).to.equal('Mon, 21 Sep 0201 17:28:40 GMT');

//         wrapper.change('2010/09/21');
//         expect(wrapper.value).to.equal('2010/09/21');
//         expect(onChange.args[3][0]).to.equal('Tue, 21 Sep 2010 17:28:40 GMT');

//         wrapper.change('2010/0/21');
//         expect(wrapper.value).to.equal('2010/0/21');
//         expect(onChange.args[4][0]).to.equal('invalid');

//         wrapper.change('2010/02/21');
//         expect(wrapper.value).to.equal('2010/02/21');
//         expect(onChange.args[5][0]).to.equal('Sun, 21 Feb 2010 17:28:40 GMT');
//     });

//     it('should handle typing with invalid initial value until the invalid value is corrected and then take it as the initial value', () => {
//         const onChange = sinon.spy();
//         const wrapper = new DatePickerWrapper({
//             name: 'date-picker',
//             initialValue: 'Thu, 283 Sep 2017 17:28:40 GM',
//             localTimezone: false,
//             format: DateFormat.YYYYMMDD,
//             onChange: onChange
//         });

//         expect(wrapper.value).to.equal('Thu, 283 Sep 2017 17:28:40 GM');

//         wrapper.focus();
//         expect(wrapper.state('visible')).to.equal(true);

//         wrapper.change('Thu, 28 Sep 2017 10:11:00 GM');
//         expect(wrapper.value).to.equal('Thu, 28 Sep 2017 10:11:00 GM');
//         expect(onChange.args[0][0]).to.equal('invalid');

//         wrapper.change('Thu, 28 Sep 2017 10:11:00 GMT');
//         expect(wrapper.value).to.equal('2017/09/28');
//         expect(onChange.args[1][0]).to.equal('Thu, 28 Sep 2017 10:11:00 GMT');

//         wrapper.change('2017/09/2');
//         expect(wrapper.value).to.equal('2017/09/2');
//         expect(onChange.args[2][0]).to.equal('Sat, 02 Sep 2017 10:11:00 GMT');

//         wrapper.change('2017/09/21');
//         expect(wrapper.value).to.equal('2017/09/21');
//         expect(onChange.args[3][0]).to.equal('Thu, 21 Sep 2017 10:11:00 GMT');
//     });

//     it('should handle typing with empty value', () => {
//         const onChange = sinon.spy();
//         const wrapper = new DatePickerWrapper({
//             name: 'date-picker',
//             initialValue: 'Fri, 21 Sep 2018 17:28:40 GMT',
//             localTimezone: false,
//             format: DateFormat.YYYYMMDD,
//             onChange: onChange
//         });

//         expect(wrapper.value).to.equal('2018/09/21');

//         wrapper.focus();
//         expect(wrapper.state('visible')).to.equal(true);

//         wrapper.change('');
//         expect(wrapper.value).to.equal('');
//         expect(onChange.args[0][0]).to.equal('invalid');

//         wrapper.change('2');
//         expect(wrapper.value).to.equal('2');
//         expect(onChange.args[1][0]).to.equal('invalid');

//         wrapper.change('20');
//         expect(wrapper.value).to.equal('20');
//         expect(onChange.args[2][0]).to.equal('invalid');

//         wrapper.change('201');
//         expect(wrapper.value).to.equal('201');
//         expect(onChange.args[3][0]).to.equal('invalid');

//         wrapper.change('2015');
//         expect(wrapper.value).to.equal('2015/');
//         expect(onChange.args[4][0]).to.equal('invalid');

//         wrapper.change('2015/3');
//         expect(wrapper.value).to.equal('2015/03/');
//         expect(onChange.args[5][0]).to.equal('invalid');

//         wrapper.change('2015/03/5');
//         expect(wrapper.value).to.equal('2015/03/05');
//         expect(onChange.args[6][0]).to.equal('Thu, 05 Mar 2015 17:28:40 GMT');
//     });

//     it('should allow pasted value to update value and allow editing when invalid', () => {
//         const onChange = sinon.spy();
//         const wrapper = new DatePickerWrapper({
//             name: 'date-picker',
//             initialValue: 'Fri, 21 Sep 2018 17:28:40 GMT',
//             localTimezone: false,
//             format: DateFormat.YYYYMMDD,
//             onChange: onChange
//         });

//         expect(wrapper.value).to.equal('2018/09/21');

//         wrapper.focus();
//         expect(wrapper.state('visible')).to.equal(true);

//         wrapper.input.simulate('paste');
//         wrapper.change('2018/09/21Fri, 21 Sep 2018 15:00:00 GMT');
//         expect(wrapper.value).to.equal('2018/09/21Fri, 21 Sep 2018 15:00:00 GMT');
//         expect(onChange.args[0][0]).to.equal('invalid');

//         wrapper.change('2018/Fri, 21 Sep 2018 15:00:00 GMT');
//         expect(wrapper.value).to.equal('2018/Fri, 21 Sep 2018 15:00:00 GMT');
//         expect(onChange.args[1][0]).to.equal('invalid');

//         wrapper.change('2Fri, 21 Sep 2018 15:00:00 GMT');
//         expect(wrapper.value).to.equal('2Fri, 21 Sep 2018 15:00:00 GMT');
//         expect(onChange.args[2][0]).to.equal('invalid');

//         wrapper.change('Fri, 21 Sep 2018 15:00:00 GMT');
//         expect(wrapper.value).to.equal('2018/09/21');
//         expect(onChange.args[3][0]).to.equal('Fri, 21 Sep 2018 15:00:00 GMT');
//     });
// });
