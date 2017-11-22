import * as React from 'react';
import * as classNames from 'classnames/bind';
import {MethodNode, DateFormat} from '../../Common';
import {DatePicker, DatePickerAttributes} from './DatePicker';
import {FormField, FormFieldAttributes} from '../Field/FormField';

export interface DateFieldType {}

export interface DateFieldProps extends React.Props<DateFieldType> {
    /** HTML form element name */
    name: string;
    /**
     * Initial value of date picker
     * 
     * The onChange callback API does not receives invalid Date UTC ISO strings
     * so we can only provide an initialValue to the DatePicker
     */
    initialValue?: Date | string;
    
    /** Tab index for calendar control */
    tabIndex?: number;
    /**
     * Display the date in local timezone instead of GMT
     *
     * Default: true
     */
    localTimezone?: boolean;
    /**
     * Show Calendar below date picker input
     */
    showAbove?: boolean;

    /** Date format in text input */
    format?: DateFormat;

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

    attr?: DatePickerAttributes & FormFieldAttributes;
}

/**
 * High level form text field
 * 
 * @param props Control properties (defined in `DateFieldProps` interface)
 */
export const DateField: React.StatelessComponent<DateFieldProps> = (props: DateFieldProps) => {
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
            <DatePicker
                name={props.name}
                initialValue={props.initialValue}
                localTimezone={props.localTimezone}
                tabIndex={props.tabIndex}
                showAbove={props.showAbove}
                format={props.format}
                error={!!props.error}
                disabled={props.disabled}
                required={props.required}
                onChange={props.onChange}
                className={props.inputClassName}
                attr={props.attr}
            />
        </FormField>
    );
};

DateField.defaultProps = {
    name: undefined,
    label: undefined,
    onChange: undefined,
    format: DateFormat.MMDDYYYY,
    tabIndex: -1,
    localTimezone: true,
    showAbove: false,
    attr: {
        fieldContainer: {},
        fieldLabel: {},
        fieldContent: {},
        fieldError: {},
        container: {},
        inputContainer: {},
        input: {},
        inputIcon: {},
        dropdownContainer: {},
        dropdownTriangle: {},
        calendar: {},
    }
};

export default DateField;
