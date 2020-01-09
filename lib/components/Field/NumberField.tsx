import * as React from 'react';
import {MethodNode} from '../../Common';
import {NumberInput} from '../Input/NumberInput';
import {TextInputAttributes} from '../Input/TextInput';
import {FormField, FormFieldAttributes} from './FormField';

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
    /** Set error field to display: none */
    hideError?: boolean;

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
    /** Tooltip text to display in info icon bubble */
    tooltip?: MethodNode;
    /** Callback for HTML input element `onChange` events */
    onChange: (newValue: number | 'invalid') => void;
    /** Classname to append to top level element */
    className?: string;
    /** Classname to append to top level element of TextInput */
    inputClassName?: string;
    /** React node to render at the far side of the label. */
    labelFarSide?: React.ReactNode;

    attr?: TextInputAttributes & FormFieldAttributes;
}

/**
 * High level form text field
 *
 * @param props Control properties (defined in `NumberFieldProps` interface)
 */
export const NumberField: React.StatelessComponent<NumberFieldProps> = (props: NumberFieldProps) => {
    const numberAttr: TextInputAttributes = {
        container: props.attr?.container,
        input: Object.assign({
            'aria-label': props.label,
        }, props.attr?.input),
        inputContainer: props.attr?.inputContainer,
        prefix: props.attr?.prefix,
        postfix: props.attr?.postfix,
        clearButton: props.attr?.clearButton
    };
    const fieldAttr: FormFieldAttributes = {
        fieldLabel: props.attr?.fieldLabel,
        fieldError: props.attr?.fieldError,
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
            tooltip={props.tooltip}
            className={props.className}
            attr={fieldAttr}
            labelFarSide={props.labelFarSide}
            disabled={props.disabled}
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
                attr={numberAttr}
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
