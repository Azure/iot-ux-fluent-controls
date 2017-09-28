import * as React from 'react';
import * as classNames from 'classnames/bind';
import {MethodNode} from '../../Common';
import {DatePicker, DateFormat} from './DatePicker';
import {FormField} from '../Form/FormField';

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
            loading={props.loading}
            required={props.required}
            className={props.className}
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
                onChange={props.onChange}
                className={props.inputClassName}
            />
        </FormField>
    );
};

DateField.defaultProps = {
    format: DateFormat.MMDDYYYY,
    tabIndex: -1,
    localTimezone: true,
    showAbove: false,
};

export default DateField;
