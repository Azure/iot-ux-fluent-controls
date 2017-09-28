import * as React from 'react';
import * as sinon from 'sinon';
import { expect, assert } from 'chai';
import { mount, ReactWrapper } from 'enzyme';
import { DatePicker, DatePickerProps, DateFormat } from './DatePicker';

class DatePickerWrapper extends ReactWrapper<DatePickerProps, any> {
    input: any;

    constructor(props: DatePickerProps) {
        super(<DatePicker {...props}/>);
        this.input = this.find('input');
    }

    focus() {
        this.input.simulate('focus');
    }

    change(newValue: string) {
        this.input.simulate('input', {target: {value: newValue}});
    }

    paste(newValue: string) {
        this.input.simulate('paste');
    }

    get value(): any {
        return this.state('value');
    }
}

const testDatePickerInput = (wrapper: any, onChange: any, values: string[][]) => {
    for (let index in values) {
        wrapper.change(values[index][0]);
        if (values[index][1]) {
            expect(wrapper.value).to.equal(values[index][1]);
        } else {
            expect(wrapper.value).to.equal(values[index][0]);
        }
        expect(onChange.args[index][0]).to.equal(values[index][2]);
    }
};

describe('DatePicker', () => {
    it('should handle typing with initial value', () => {
        const onChange = sinon.spy();
        const wrapper = new DatePickerWrapper({
            name: 'date-picker',
            initialValue: 'Thu, 28 Sep 2017 17:28:40 GMT',
            localTimezone: true,
            format: DateFormat.DDMMYYYY,
            onChange: onChange
        });

        expect(wrapper.value).to.equal('28/09/2017');

        

        wrapper.focus();
        expect(wrapper.state('visible')).to.equal(true);

        testDatePickerInput(wrapper, onChange, [
            ['28/09/201', '', 'invalid'],
            ['28/09/2018', '', 'Fri, 28 Sep 2018 17:28:40 GMT'],
            ['2/09/2018', '', 'invalid'],
            ['21/09/2018', '', 'Fri, 21 Sep 2018 17:28:40 GMT'],            
        ]);
    });
});
