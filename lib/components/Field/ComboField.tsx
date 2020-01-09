import * as React from 'react';
import {OptionAttr, ButtonProps} from '../../Attributes';
import {MethodNode, FormOption} from '../../Common';
import {ComboInput, ComboInputAttributes} from '../Input/ComboInput';
import {FormField, FormFieldAttributes} from './FormField';

export interface ComboFieldType {}

export interface ComboFieldProps extends React.Props<ComboFieldType> {
    /** HTML form element name */
    name: string;
    /** Current value of HTML input element */
    value: string | any;
    /** HTML input element placeholder */
    placeholder?: string;

    /**
     * List of HTML select element options in the format:
     *
     * `{
     *     label: string,
     *     value: any,
     *     disabled: boolean,
     *     hidden: boolean
     * }`
     */
    options: (FormOption & OptionAttr<ButtonProps>)[];

    /**
     * Callback used to map FormOption to strings to be used by default
     * optionFilter and optionSelect callbacks
     *
     * See examples for how to use these callbacks
     */
    optionMap?: (option: FormOption) => string;
    /**
     * Callback used to filter list of FormOptions for display in the dropdown
     *
     * This function can, for example, implement autocomplete by hiding
     * any option that does not contain the value in the text input
     *
     * See examples for how to use these callbacks
     */
    optionFilter?: (newValue: string, option: FormOption) => boolean;
    /**
     * Callback used to decide whether a FormOption is selected or not
     *
     * See examples for how to use these callbacks
     */
    optionSelect?: (newValue: string, option: FormOption) => boolean;
    /**
     * Callback used to generate a React node to use as the label in dropdown
     *
     * This function can, for example, bold any relevant fragments of text for
     * highlighting in autocomplete
     *
     * See examples for how to use these callbacks
     */
    optionLabel?: (newValue: string, option: FormOption) => MethodNode;

    /** Label to display above input element */
    label: MethodNode;
    /** Error to display below input element */
    error?: MethodNode;
    /** Set error field to display: none */
    hideError?: boolean;

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
    /**
     * Show label instead of FormOption value in ComboInput text box when a
     * value from the FormOptions is selected
     *
     * Since the ComboInput has a text input, it cannot draw an arbitrary
     * MethodNode as the textbox value. If props.optionLabel returns a string,
     * then you can show the label text in the textbox instead of the option
     * value itself.
     *
     * Note: If the label and value are different and showLabel is true,
     * when the user starts typing after making a selection in the dropdown,
     * it will not reselect the option unless optionSelect checks the label
     * string as well as the value.
     *
     * For example:
     * ```js
     * optionSelect = (newValue, option) => {
     *     return newValue === option.value || newValue === option.label.toString();
     * }
     * ```
     *
     * Default: true
     */
    showLabel?: boolean;
    /** Tooltip text to display in info icon bubble */
    tooltip?: MethodNode;
    /** Callback for HTML input element `onChange` events */
    onChange: (newValue: string | FormOption) => void;

    /** Classname to append to top level element */
    className?: string;
    /** Classname to append to top level element of ComboInput */
    inputClassName?: string;
    /** React node to render at the far side of the label. */
    labelFarSide?: React.ReactNode;
    /** Label to be announced before the error message to announce to the user that there's an error */
    errorAriaLabel?: string;

    attr?: ComboInputAttributes & FormFieldAttributes;
}

/**
 * High level form select box control
 *
 * `ComboField` is a hybrid of the SelectField and TextField controls. It
 * functions as a 'new or existing' text field where the user can type in a
 * custom value or pick from a list of values provided by the control.
 *
 * `ComboField` consumes the property `options: FormOption[]` which specify each
 * option's `value` and `label`. The former can be any object while the latter
 * can be any React node (or a string). `ComboField` also consumes a
 * `value: string | FormOption` property that sets the current value of the
 * `ComboField` text field. If `value` is a `string`, the user is typing in a
 * custom value and if it is an object, the user has either typed in a value
 * equal to one of the options or has selected an option from the dropdown list.
 *
 * In this example of a default `ComboField`, `FormOption.value` must be a string,
 *  which allows you to use `ComboField` with only the properties `name`, `value`,
 * `onChange`, and `options`. When the user types in 'Option 1', that option will
 * be considered selected instead of a custom object.
 *
 * *Reffer to the other examples on how to use `ComboField`'s callbacks to further
 * modify what options display in the dropdown.*
 *
 * IMPORTANT: The options provided to this control must all be UNIQUE. The
 * `value` property of radio buttons is the numerical index of the option in
 * `ComboField.options` so `ComboField.value` is compared to each value in
 * `options` (===) to decide which option is the one currently selected.
 *
 * @param props: Object fulfilling `ComboFieldProps` interface
 */
export const ComboField: React.StatelessComponent<ComboFieldProps> = (props: ComboFieldProps) => {
    const comboAttr: ComboInputAttributes = {
        host: props.attr.host,
        input: Object.assign({
            'aria-label': props.label,
        }, props.attr.input),
        clearButton: props.attr.clearButton,
        textbox: props.attr.textbox,
        chevron: props.attr.chevron,
        dropdown: props.attr.dropdown,
        option: props.attr.option,
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
            errorAriaLabel={props.errorAriaLabel}
            disabled={props.disabled}
        >
            <div>
                <ComboInput
                    name={props.name}
                    value={props.value}
                    placeholder={props.placeholder}
                    options={props.options}
                    optionMap={props.optionMap}
                    optionFilter={props.optionFilter}
                    optionSelect={props.optionSelect}
                    optionLabel={props.optionLabel}
                    error={!!props.error}
                    disabled={props.disabled}
                    readOnly={props.readOnly}
                    onChange={props.onChange}
                    className={props.inputClassName}
                    autoFocus={props.autoFocus}
                    showLabel={props.showLabel}
                    required={props.required}
                    attr={comboAttr}
                />
            </div>
        </FormField>
    );
};

ComboField.defaultProps = {
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
        host: {},
        textbox: {},
        input: {},
        clearButton: {},
        chevron: {},
        dropdown: {},
        option: {},
    }
};

export default ComboField;
