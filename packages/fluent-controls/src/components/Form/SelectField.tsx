import * as React from 'react';
import * as classNames from 'classnames/bind';
import {MethodNode, FormOption} from '../../Common';
import {SelectInput} from './SelectInput';
import {FormField} from './FormField';
const css = classNames.bind(require('./Field.scss'));

export interface SelectFieldType {}

export interface SelectFieldProps extends React.Props<SelectFieldType> {
    /** HTML form element name */
    name: string;
    /** 
     * Current value of HTML select element
     * 
     * This must be an `Object` that is in `SelectInputProps.options`
     */
    value: any;
    /** 
     * List of HTML select element options in the format:
     * 
     * `{
     *     label: string,
     *     value: any
     * }`
     */
    options: FormOption[];
    
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

    /** Callback for HTML select element `onChange` events */
    onChange: (newValue: any) => void;

    /** Classname to append to top level element */
    className?: string;
    /** Classname to append to top level element of SelectInput */
    inputClassName?: string;
}

/**
 * High level form select box control
 * 
 * IMPORTANT: The options provided to this control must all be UNIQUE. The 
 * `value` property of option tags is the numerical index of the option in
 * `SelectField.options` so `SelectField.value` is compared to each value in
 * `options` (===) to decide which option is the one currently selected.
 * 
 * @param props: Object fulfilling `SelectFieldProps` interface
 */
export const SelectField = (props: SelectFieldProps) => {
    return (
        <FormField
            name={props.name}
            label={props.label}
            error={props.error}
            loading={props.loading}
            required={props.required}
            className={props.className}
        >
            <SelectInput
                name={props.name}
                value={props.value}
                options={props.options}
                error={!!props.error}
                disabled={props.disabled}
                onChange={props.onChange}
                className={props.inputClassName}
            />
        </FormField>
    );
};

export default SelectField;
