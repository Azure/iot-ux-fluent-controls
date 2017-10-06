import * as React from 'react';
import * as classNames from 'classnames/bind';
import {MethodNode, FormOption} from '../../Common';
import {ComboInput} from '../Input/ComboInput';
import {FormField} from './FormField';
const css = classNames.bind(require('./Field.scss'));

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
    options: FormOption[];

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

    /** Disable HTML input element */
    disabled?: boolean;
    /** Form field is required (appends a red asterisk to the label) */
    required?: boolean;
    /** Display horizontal loading animation instead of error */
    loading?: boolean;
    /** Autofocus */
    autoFocus?: boolean;


    /** Callback for HTML input element `onChange` events */
    onChange: (newValue: string | FormOption) => void;

    /** Classname to append to top level element */
    className?: string;
    /** Classname to append to top level element of ComboInput */
    inputClassName?: string;
}

/**
 * High level form select box control
 * 
 * IMPORTANT: The options provided to this control must all be UNIQUE. The
 * `value` property of radio buttons is the numerical index of the option in
 * `ComboField.options` so `ComboField.value` is compared to each value in
 * `options` (===) to decide which option is the one currently selected.
 * 
 * @param props: Object fulfilling `ComboFieldProps` interface
 */
export const ComboField = (props: ComboFieldProps) => {
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
                    onChange={props.onChange}
                    className={props.inputClassName}
                    autoFocus={props.autoFocus}
                />
            </div>
        </FormField>
    );
};

export default ComboField;
