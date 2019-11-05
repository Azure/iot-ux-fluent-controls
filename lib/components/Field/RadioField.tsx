import * as React from 'react';
import {OptionAttr, mergeAttributeObjects} from '../../Attributes';
import {MethodNode, FormOption} from '../../Common';
import {RadioInput, RadioInputAttributes} from '../Input/RadioInput';
import {FormField, FormFieldAttributes} from './FormField';

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
    options: (FormOption & OptionAttr<RadioInputAttributes>)[];

    /** Label to display above input element */
    label: MethodNode;
    /** Error to display below input element */
    error?: MethodNode;
    /** Set error field to display: none */
    hideError?: boolean;

    /** Allow radio buttons to show up in columns */
    columns?: boolean;
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
    /** Callback for HTML radio button element `onChange` events */
    onChange: (newValue: any) => void;
    /** Classname to append to top level element */
    className?: string;
    /** Classname to append to top level element of RadioInput */
    inputClassName?: string;
    /** React node to render at the far side of the label. */
    labelFarSide?: React.ReactNode;

    attr?: RadioInputAttributes & FormFieldAttributes;
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
export const RadioField: React.StatelessComponent<RadioFieldProps> = (props: RadioFieldProps) => {
    const onChange = (newValue) => {
        const index = parseInt(newValue);
        props.onChange(props.options[index].value);
    };

    const tooltipId = (!!props.tooltip) ? `${props.name}-tt` : undefined;

    const fieldAttr: FormFieldAttributes = {
        fieldLabel: Object.assign({
            balloon: {
                balloonContent: {
                    id: tooltipId
                }
            }
        }, props.attr.fieldLabel),
        fieldError: props.attr.fieldError,
        fieldContent: props.attr.fieldContent,
        fieldContainer: props.attr.fieldContainer
    };

    const options = props.options.map((option, index) => {
        const radioAttr: RadioInputAttributes = {
            container: props.attr.container,
            label: props.attr.label,
            input: Object.assign({
                'aria-label': option.label,
                'aria-describedby': tooltipId
            }, props.attr.input),
            radio: props.attr.radio,
            text: props.attr.text,
            fill: props.attr.fill,
            border: props.attr.border
        };

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
                autoFocus={props.autoFocus}
                required={props.required}
                attr={mergeAttributeObjects(radioAttr, option.attr, [
                    'container',
                    'label',
                    'input',
                    'radio',
                    'text',
                    'fill',
                    'border',
                ])}
            />
        );
    });

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
            <div>
                {options}
            </div>
        </FormField>
    );
};

RadioField.defaultProps = {
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
        label: {},
        input: {},
        radio: {},
        text: {},
        fill: {},
        border: {},
    }
};

export default RadioField;
