import * as React from 'react';
import * as classNames from 'classnames/bind';
import {MethodNode} from '../../Common';
import {Icon, IconSize, IconBackground} from '../Icon';
import {TextInput} from './TextInput';
const css = classNames.bind(require('./TextField.scss'));

export interface TextFieldType {}

export interface TextFieldProps extends React.Props<TextFieldType> {
    /** HTML form element name */
    name: string;
    /** Current value of HTML input element */
    value: string;
    /** HTML input element placeholder */
    placeholder?: string;
    
    /** Label to display above input element */
    label: MethodNode;
    /** Error to display below input element */
    error?: MethodNode;
    
    /** Disable HTML input element */
    disabled?: boolean;
    /** Form field is required (appends a red asterisk to the label) */
    required?: boolean;

    /** Callback for HTML input element `onChange` events */
    onChange: (newValue: string) => void;

    /** Classname to append to top level element */
    className?: string;
}

/**
 * High level form text field
 * 
 * @param props Control properties (defined in `TextFieldProps` interface)
 */
export const TextField = (props: TextFieldProps) => {
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
            <TextInput
                name={props.name}
                value={props.value}
                placeholder={props.placeholder}
                onChange={props.onChange}
                disabled={props.disabled}
                error={!!props.error}
            />

            <div className={errorClass}>
                {props.error}
            </div>
        </div>
    );
};
