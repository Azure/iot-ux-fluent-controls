import * as React from 'react';
import * as classNames from 'classnames/bind';
import {MethodNode, FormOption} from '../../Common';
import {RadioInput} from './RadioInput';
import {FormField} from './FormField';
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
    
    /** Allow radio buttons to show up in columns */
    columns?: boolean;
    /** Disable HTML input element */
    disabled?: boolean;
    /** Form field is required (appends a red asterisk to the label) */
    required?: boolean;
    /** Display horizontal loading animation instead of error */
    loading?: boolean;

    /** Callback for HTML radio button element `onChange` events */
    onChange: (newValue: any) => void;

    /** Classname to append to top level element */
    className?: string;
    /** Classname to append to top level element of RadioInput */
    inputClassName?: string;
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
                columns={props.columns}
                checked={props.value === option.value}
                disabled={props.disabled || option.disabled}
                hidden={option.hidden}
                onChange={onChange}
                className={props.inputClassName}
                key={`${props.name}-${index}`}
            />
        );
    });

    return (
        <FormField
            name={props.name}
            label={props.label}
            error={props.error}
            loading={props.loading}
            required={props.required}
            className={props.className}
        >
            <div>
                {options}
            </div>
        </FormField>
    );
};

export default RadioField;
