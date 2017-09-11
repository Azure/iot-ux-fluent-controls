import * as React from 'react';
import * as classNames from 'classnames/bind';
import {MethodNode, FormOption} from '../../Common';
import {SelectInput} from './SelectInput';
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

    /** Callback for HTML select element `onChange` events */
    onChange: (newValue: any) => void;

    /** Classname to append to top level element */
    className?: string;
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
    const labelClass = css('label');
    const containerClass = css('input-container', {
        'input-error': props.error,
        'required': props.required,
    }, props.className);
    const inputClass = css({
        'input': true,
        'input-error': props.error
    });
    const errorClass = css('field-error');    

    return (
        <div className={containerClass} >
            <label className={labelClass} htmlFor={props.name} >
                {props.label}
            </label>
            <SelectInput
                name={props.name}
                value={props.value}
                onChange={props.onChange}
                disabled={props.disabled}
                error={!!props.error}
                options={props.options}
            />
            <div className={errorClass}>
                {props.error}
            </div>
        </div>
    );
};

export default SelectField;
