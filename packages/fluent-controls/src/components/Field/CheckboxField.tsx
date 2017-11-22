import * as React from 'react';
import * as classNames from 'classnames/bind';
import {MethodNode} from '../../Common';
import {CheckboxInput, CheckboxInputAttributes} from '../Input/CheckboxInput';
import {FormField, FormFieldAttributes} from './FormField';
const css = classNames.bind(require('./Field.scss'));

export interface CheckboxFieldType {}

export interface CheckboxFieldProps extends React.Props<CheckboxFieldType> {
    /** HTML form element name */
    name: string;
    /** 
     * Current value of HTML checkbox element
     * 
     * This must be an `Object` that is in `CheckboxFieldProps.options`
     */
    value: boolean;
    
    /** Label to display above input element */
    label: MethodNode;
    /** Error to display below input element */
    error?: MethodNode;
    /** Error HTML title in case of overflow */
    errorTitle?: string;
    
    /** Disable HTML input element */
    disabled?: boolean;
    /** Form field is required (appends a red asterisk to the label) */
    required?: boolean;
    /** Appends a red asterisk to the label */
    requiredLabel?: boolean;
    /** Display horizontal loading animation instead of error */
    loading?: boolean;
    /** Autofocus */
    autoFocus?: boolean;

    /** Callback for HTML checkbox element `onChange` events */
    onChange: (newValue: boolean) => void;

    /** Classname to append to top level element */
    className?: string;
    /** Classname to append to top level element of CheckboxInput */
    inputClassName?: string;

    attr?: FormFieldAttributes & CheckboxInputAttributes;
}

/**
 * High level form checkbox control
 * 
 * IMPORTANT: The options provided to this control must all be UNIQUE. The
 * `value` property of checkboxes is the numerical index of the option in
 * `CheckboxField.options` so `CheckboxField.value` is compared to each value in
 * `options` (===) to decide which option is the one currently selected.
 * 
 * @param props: Object fulfilling `CheckboxFieldProps` interface
 */
export const CheckboxField: React.StatelessComponent<CheckboxFieldProps> = (props: CheckboxFieldProps) => {
    return (
        <FormField
            name={props.name}
            label={props.label}
            error={props.error}
            errorTitle={props.errorTitle}
            loading={props.loading}
            requiredLabel={props.requiredLabel}
            className={props.className}
            attr={props.attr}
        >
            <div>
                <CheckboxInput
                    name={props.name}
                    checked={props.value}
                    label={props.label}
                    disabled={props.disabled}
                    onChange={props.onChange}
                    className={props.inputClassName}
                    autoFocus={props.autoFocus}
                    required={props.required}
                    attr={props.attr}
                />
            </div>
        </FormField>
    );
};

CheckboxField.defaultProps = {
    name: undefined,
    value: undefined,
    label: undefined,
    onChange: undefined,
    attr: {
        fieldContainer: {},
        fieldLabel: {},
        fieldContent: {},
        fieldError: {},
        container: {},
        label: {},
        input: {},
        text: {},
        checkbox: {},
        indeterminateFill: {},
        checkmarkIcon: {},
        border: {},
    }
};


export default CheckboxField;
