import * as React from 'react';
import {OptionAttr, OptionProps} from '../../Attributes';
import {MethodNode, FormOption} from '../../Common';
import {SelectInput, SelectInputAttributes} from '../Input/SelectInput';
import {FormField, FormFieldAttributes} from './FormField';

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
    options: (FormOption & OptionAttr<OptionProps>)[];

    /** Label to display above input element */
    label: MethodNode;
    /** Error to display below input element */
    error?: MethodNode;
    /** Set error field to display: none */
    hideError?: boolean;

    /** Disable HTML input element */
    disabled?: boolean;
    /** Form field is required (appends a red asterisk to the label) */
    required?: boolean;
    /** Display horizontal loading animation instead of error */
    loading?: boolean;
    /** Autofocus */
    autoFocus?: boolean;
    /** Tooltip text to display in info icon bubble */
    tooltip?: MethodNode;
    /** Callback for HTML select element `onChange` events */
    onChange: (newValue: any) => void;

    /** Classname to append to top level element */
    className?: string;
    /** Classname to append to top level element of SelectInput */
    inputClassName?: string;
    /** React node to render at the far side of the label. */
    labelFarSide?: React.ReactNode;

    attr?: SelectInputAttributes & FormFieldAttributes;
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
export const SelectField: React.StatelessComponent<SelectFieldProps> = (props: SelectFieldProps) => {
    const selectAttr: SelectInputAttributes = {
        container: props.attr.container,
        select: Object.assign({
            'aria-label': props.label,
        }, props.attr.select),
        option: props.attr.option,
        chevron: props.attr.chevron,
    };

    const fieldAttr: FormFieldAttributes = {
        fieldLabel: props.attr.fieldLabel,
        fieldError: props.attr.fieldError,
        fieldContent: props.attr.fieldContent,
        fieldContainer: props.attr.fieldContainer
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
            <SelectInput
                name={props.name}
                value={props.value}
                options={props.options}
                error={!!props.error}
                disabled={props.disabled}
                onChange={props.onChange}
                className={props.inputClassName}
                autoFocus={props.autoFocus}
                required={props.required}
                attr={selectAttr}
            />
        </FormField>
    );
};

SelectField.defaultProps = {
    name: undefined,
    value: undefined,
    label: undefined,
    onChange: undefined,
    options: undefined,
    attr: {
        fieldContainer: {},
        fieldLabel: {},
        fieldContent: {},
        fieldError: {},
        container: {},
        select: {},
        option: {},
        chevron: {},
    }
};

export default SelectField;
