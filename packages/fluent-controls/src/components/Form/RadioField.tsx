import * as React from 'react';
import * as classNames from 'classnames/bind';
import {MethodNode, FormOption} from '../../Common';
import {RadioInput} from './RadioInput';
const css = classNames.bind(require('./Field.scss'));

export interface RadioFieldType {}

export interface RadioFieldProps extends React.Props<RadioFieldType> {
    /** HTML form element name */
    name: string;
    /** 
     * Current value of HTML radio button element
     * 
     * This must be an `Object` that is in `RadioFieldProps.options`
     */
    value: any;
    /** 
     * List of HTML radio button element options in the format:
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

    /** Callback for HTML radio button element `onChange` events */
    onChange: (newValue: any) => void;

    /** Classname to append to top level element */
    className?: string;
}

/**
 * High level form select box control
 * 
 * IMPORTANT: The options provided to this control must all be UNIQUE. The
 * `value` property of radio buttons is the numerical index of the option in
 * `RadioField.options` so `RadioField.value` is compared to each value in
 * `options` (===) to decide which option is the one currently selected.
 * 
 * @param props: Object fulfilling `RadioFieldProps` interface
 */
export const RadioField = (props: RadioFieldProps) => {
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

    const onChange = (newValue) => {
        const index = parseInt(newValue);
        props.onChange(props.options[index].value);
    };

    const options = props.options.map((option, index) => {
        return (
            <RadioInput
                name={props.name}
                value={`${index}`}
                label={option.label}
                checked={props.value === option.value}
                onChange={onChange}
                disabled={props.disabled}
                key={`${props.name}-${index}`}
            />
        );
    });

    return (
        <div className={containerClass} >
            <label className={labelClass} htmlFor={props.name} >
                {props.label}
            </label>
            {options}
            <div className={errorClass}>
                {props.error}
            </div>
        </div>
    );
};

export default RadioField;
