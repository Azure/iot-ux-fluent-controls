import * as React from 'react';
import * as classNames from 'classnames/bind';
import {MethodNode, FormOption} from '../../Common';
import {TimeInput, TimeInputAttributes} from './TimeInput';
import {FormField, FormFieldAttributes} from '../Field/FormField';

export interface TimeFieldType {}

export interface TimeFieldProps extends React.Props<TimeFieldType> {
    /** HTML form element name */
    name: string;
    /** Value */
    value?: string | Date;
    /** Label for "AM" select option */
    amLabel?: string;
    /** Label for "PM" select option */
    pmLabel?: string;

    /**
     * Show the time in the local timezone instead of GMT
     *
     * Default: true
     */
    localTimezone?: boolean;
    /** Display the seconds dropdown */
    showSeconds?: boolean;
    /** Use 24 hour clock */
    militaryTime?: boolean;
    
    /** Label to display above input element */
    label: MethodNode;
    /** Error to display below input element */
    error?: MethodNode;

    /** Disable HTML input element */
    disabled?: boolean;
    /** Form field is required (appends a red asterisk to the label) */
    required?: boolean;
    /** Display horizontal loading animation instead of error */
    loading?: boolean;
    
    /** Callback for HTML input element `onChange` events */
    onChange: (newValue: string) => void;

    /** Classname to append to top level element */
    className?: string;
    /** Classname to append to top level element of TextInput */
    inputClassName?: string;

    attr?: TimeInputAttributes & FormFieldAttributes;
}

/**
 * High level form text field
 * 
 * @param props Control properties (defined in `TimeFieldProps` interface)
 */
export const TimeField: React.StatelessComponent<TimeFieldProps> = (props: TimeFieldProps) => {
    return (
        <FormField
            name={props.name}
            label={props.label}
            error={props.error}
            loading={props.loading}
            required={props.required}
            className={props.className}
            attr={{
                fieldContainer: props.attr.fieldContainer,
                fieldContent: props.attr.fieldContent,
                fieldError: props.attr.fieldError,
                fieldLabel: props.attr.fieldLabel,
            }}
        >
            <TimeInput
                name={props.name}
                value={props.value}
                amLabel={props.amLabel}
                pmLabel={props.pmLabel}
                localTimezone={props.localTimezone}
                showSeconds={props.showSeconds}
                militaryTime={props.militaryTime}
                error={!!props.error}
                disabled={props.disabled}
                onChange={props.onChange}
                className={props.inputClassName}
                attr={{
                    container: this.props.attr.container,
                    hourSelect: this.props.attr.hourSelect,
                    hourOption: this.props.attr.hourOption,
                    minuteSelect: this.props.attr.minuteSelect,
                    minuteOption: this.props.attr.minuteOption,
                    secondSelect: this.props.attr.secondSelect,
                    secondOption: this.props.attr.secondOption,
                    periodSelect: this.props.attr.periodSelect,
                    periodOption: this.props.attr.periodOption,
                }}
            />
        </FormField>
    );
};

TimeField.defaultProps = {
    showSeconds: false,
    militaryTime: false,
    disabled: false,
    localTimezone: true,
    amLabel: 'AM',
    pmLabel: 'PM',
    attr: {
        ...FormField.defaultProps.attr,
        ...TimeInput.defaultProps.attr
    }
};

export default TimeField;
