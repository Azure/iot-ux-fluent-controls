import * as React from 'react';
import * as classNames from 'classnames/bind';
import {MethodNode} from '../../Common';
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
    /** Error HTML title in case of overflow */
    errorTitle?: string;

    /** Disable HTML input element */
    disabled?: boolean;
    /** Form field is required (appends a red asterisk to the label) */
    required?: boolean;
    /** Appends a red asterisk to the label */
    requiredLabel?: boolean;
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
            errorTitle={props.errorTitle}
            loading={props.loading}
            requiredLabel={props.requiredLabel}
            className={props.className}
            attr={props.attr}
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
                attr={props.attr}
            />
        </FormField>
    );
};

TimeField.defaultProps = {
    name: undefined,
    label: undefined,
    onChange: undefined,
    showSeconds: false,
    militaryTime: false,
    disabled: false,
    localTimezone: true,
    amLabel: 'AM',
    pmLabel: 'PM',
    attr: {
        fieldContainer: {},
        fieldLabel: {},
        fieldContent: {},
        fieldError: {},
        container: {},
        hourSelect: {},
        hourOption: {},
        minuteSelect: {},
        minuteOption: {},
        secondSelect: {},
        secondOption: {},
        periodSelect: {},
        periodOption: {},
    }
};

export default TimeField;
