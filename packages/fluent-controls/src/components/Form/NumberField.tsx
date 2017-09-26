import * as React from 'react';
import * as classNames from 'classnames/bind';
import {MethodNode} from '../../Common';
import {TextInput} from './TextInput';
import {FormField} from './FormField';
const css = classNames.bind(require('./Field.scss'));

export interface NumberFieldType {}

export interface NumberFieldProps extends React.Props<NumberFieldType> {
    /** HTML form element name */
    name: string;
    /** Current value of HTML input element */
    value: number;
    /** HTML input element placeholder */
    placeholder?: string;
    
    /** Label to display above input element */
    label: MethodNode;
    /** Error to display below input element */
    error?: MethodNode;

    /** Node to draw to the left of the input box */
    prefix?: MethodNode;
    /** Class to append to prefix container */
    prefixClassName?: string;
    /** Node to draw to the right of the input box */
    postfix?: MethodNode;
    /** Class to append to postfix container */
    postfixClassName?: string;
    
    /** Disable HTML input element */
    disabled?: boolean;
    /** Form field is required (appends a red asterisk to the label) */
    required?: boolean;
    /** Display horizontal loading animation instead of error */
    loading?: boolean;

    /** Callback for HTML input element `onChange` events */
    onChange: (newValue: number) => void;

    /** Classname to append to top level element */
    className?: string;
    /** Classname to append to top level element of TextInput */
    inputClassName?: string;
}

/**
 * High level form text field
 * 
 * @param props Control properties (defined in `NumberFieldProps` interface)
 */
export const NumberField: React.StatelessComponent<NumberFieldProps> = (props: NumberFieldProps) => {
    return (
        <FormField
            name={props.name}
            label={props.label}
            error={props.error}
            loading={props.loading}
            required={props.required}
            className={props.className}
        >
            <TextInput
                name={props.name}
                value={props.value ? props.value.toString() : '0'}
                placeholder={props.placeholder}
                type={'number'}
                prefix={props.prefix}
                prefixClassName={props.prefixClassName}
                postfix={props.postfix}
                postfixClassName={props.postfixClassName}
                error={!!props.error}
                disabled={props.disabled}
                onChange={value => props.onChange(value ? parseInt(value) : null) }
                className={props.inputClassName}
            />
        </FormField>
    );
};

NumberField.defaultProps = {
};

export default NumberField;
