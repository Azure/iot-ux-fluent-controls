import * as React from 'react';
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
    /** i18n locale */
    locale?: string;
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
    /** Set error field to display: none */
    hideError?: boolean;

    /** Disable HTML input element */
    disabled?: boolean;
    /** Form field is required (appends a red asterisk to the label) */
    required?: boolean;
    /** Display horizontal loading animation instead of error */
    loading?: boolean;
    /** Tooltip text to display in info icon bubble */
    tooltip?: MethodNode;
    /** Callback for HTML input element `onChange` events */
    onChange: (newValue: string) => void;

    /** Classname to append to top level element */
    className?: string;
    /** Classname to append to top level element of TextInput */
    inputClassName?: string;

    /**
     * callback for clicking the calendar icon
     */
    onExpand?: (expanded: boolean) => void;

    /** React node to render at the far side of the label. */
    labelFarSide?: React.ReactNode;
    /** Label to be announced before the error message to announce to the user that there's an error */
    errorAriaLabel?: string;

    attr?: DatePickerAttributes & FormFieldAttributes;
}

/**
 * High level form text field
 *
 * @param props Control properties (defined in `DateFieldProps` interface)
 * @deprecated This is not fully localized/accessible. Use https://developer.microsoft.com/en-us/fabric/#/controls/web/datepicker instead.
 */
export const DateField: React.StatelessComponent<DateFieldProps> = (props: DateFieldProps) => {
    const errorId = `${props.name}-error`;
    let describedby = errorId;
    const dateAttr: DatePickerAttributes = {
        input: Object.assign({
            'aria-label': props.label,
            'aria-describedby': describedby
        }, props.attr?.input),
        inputContainer: props.attr?.inputContainer,
        inputIcon: props.attr?.inputIcon,
        calendar: props.attr?.calendar
    };
    const fieldAttr: FormFieldAttributes = {
        fieldLabel: props.attr?.fieldLabel,
        fieldError: Object.assign({
            id: errorId
        }, props.attr?.fieldError),
        fieldContent: props.attr?.fieldContent,
        fieldContainer: props.attr?.fieldContainer
    };

    return (
        <FormField
            name={props.name}
            label={props.label}
            error={props.error}
            hideError={props.hideError}
            loading={props.loading}
            required={props.required}
            className={props.className}
            attr={fieldAttr}
            tooltip={props.tooltip}
            labelFarSide={props.labelFarSide}
            errorAriaLabel={props.errorAriaLabel}
            disabled={props.disabled}
        >
            <DatePicker
                name={props.name}
                initialValue={props.initialValue}
                locale={props.locale}
                localTimezone={props.localTimezone}
                tabIndex={props.tabIndex}
                showAbove={props.showAbove}
                format={props.format}
                error={!!props.error}
                disabled={props.disabled}
                required={props.required}
                onChange={props.onChange}
                onExpand={props.onExpand}
                className={props.inputClassName}
                attr={dateAttr}
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
        inputContainer: {},
        input: {},
        inputIcon: {},
        calendar: {},
    }
};

export default DateField;
