import * as React from 'react';
import * as classNames from 'classnames/bind';
import {MethodNode} from '../../Common';
import {NumberInput} from '../Input/NumberInput';
import {TextInputAttributes} from '../Input/TextInput';
import {FormField, FormFieldAttributes} from './FormField';
const css = classNames.bind(require('./Field.scss'));

export interface NumberFieldType {}

export interface NumberFieldProps extends React.Props<NumberFieldType> {
    /** HTML form element name */
    name: string;
    /** Current value of HTML input element */
    initialValue?: string | number;
    /** HTML input element placeholder */
    placeholder?: string;
    /** Step to give the number input */
    step?: number | 'any';
    /** Minimum value of HTML Input element */
    min?: number;
    /** Maximum value of HTML Input element */
    max?: number;
    
    /** Label to display above input element */
    label: MethodNode;
    /** Error to display below input element */
    error?: MethodNode;
    /** Error HTML title in case of overflow */
    errorTitle?: string;

    /** Node to draw to the left of the input box */
    prefix?: MethodNode;
    /** Node to draw to the right of the input box */
    postfix?: MethodNode;
    
    /** Disable HTML input element */
    disabled?: boolean;
    /** Read only HTML input element */
    readOnly?: boolean;
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

    attr?: TextInputAttributes & FormFieldAttributes;
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
            errorTitle={props.errorTitle}
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
                readOnly={props.readOnly}
                onChange={props.onChange}
                className={props.inputClassName}
                autoFocus={props.autoFocus}
                step={props.step}
                min={props.min}
                max={props.max}
                required={props.required}
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
