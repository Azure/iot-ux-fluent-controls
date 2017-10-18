import * as React from 'react';
import * as classNames from 'classnames/bind';
import {MethodNode} from '../../Common';
import {NumberInput, NumberInputAttributes} from '../Input/NumberInput';
import {FormField, FormFieldAttributes} from './FormField';
const css = classNames.bind(require('./Field.scss'));

export interface NumberFieldType {}

export interface NumberFieldProps extends React.Props<NumberFieldType> {
    /** HTML form element name */
    name: string;
    /** Current value of HTML input element */
    initialValue?: string;
    /** HTML input element placeholder */
    placeholder?: string;
    /** Only positive inputs allows */
    positive?: boolean;
    /** Input is integer only */
    integer?: boolean;
    
    /** Label to display above input element */
    label: MethodNode;
    /** Error to display below input element */
    error?: MethodNode;

    /** Node to draw to the left of the input box */
    prefix?: MethodNode;
    /** Node to draw to the right of the input box */
    postfix?: MethodNode;
    
    /** Disable HTML input element */
    disabled?: boolean;
    /** Form field is required (appends a red asterisk to the label) */
    required?: boolean;
    /** Display horizontal loading animation instead of error */
    loading?: boolean;
    /** Autofocus */
    autoFocus?: boolean;

    /** Callback for HTML input element `onChange` events */
    onChange: (newValue: number | 'invalid') => void;

    /** Classname to append to top level element */
    className?: string;
    /** Classname to append to top level element of TextInput */
    inputClassName?: string;

    attr?: NumberInputAttributes & FormFieldAttributes;
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
            attr={props.attr}
        >
            <NumberInput
                name={props.name}
                initialValue={props.initialValue}
                placeholder={props.placeholder}
                prefix={props.prefix}
                postfix={props.postfix}
                error={!!props.error}
                disabled={props.disabled}
                onChange={props.onChange}
                className={props.inputClassName}
                autoFocus={props.autoFocus}
                positive={props.positive}
                integer={props.integer}
                attr={props.attr}
            />
        </FormField>
    );
};

NumberField.defaultProps = {
    name: undefined,
    label: undefined,
    onChange: undefined,
    attr: {
        fieldContainer: {},
        fieldLabel: {},
        fieldContent: {},
        fieldError: {},
        container: {},
        input: {},
        inputContainer: {},
        prefix: {},
        postfix: {},
    }
};

export default NumberField;
