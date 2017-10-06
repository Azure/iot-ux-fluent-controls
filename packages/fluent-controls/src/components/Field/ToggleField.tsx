import * as React from 'react';
import * as classNames from 'classnames/bind';
import {MethodNode} from '../../Common';
import {FormField} from './FormField';
import {Toggle} from '../Toggle';

export interface ToggleFieldType {}

export interface ToggleFieldProps extends React.Props<ToggleFieldType> {
    /** HTML form element name */
    name: string;
    /** 
     * Current value of HTML select element
     * 
     * This must be an `Object` that is in `SelectInputProps.options`
     */
    value: boolean;
    
    /** Label to display above input element */
    label: MethodNode;
    /** Error to display below input element */
    error?: MethodNode;

    onLabel?: MethodNode;
    offLabel?: MethodNode;
    
    /** Disable HTML input element */
    disabled?: boolean;
    /** Form field is required (appends a red asterisk to the label) */
    required?: boolean;
    /** Display horizontal loading animation instead of error */
    loading?: boolean;
    /** Auto Focus */
    autoFocus?: boolean;

    /** Callback for `onChange` events */
    onChange: (newValue: any) => void;

    /** Classname to append to top level element */
    className?: string;
    /** Classname to append to top level element of SelectInput */
    inputClassName?: string;
}

/**
 * High level form toggle switch control
 * 
 * @param props: Object fulfilling `ToggleFieldProps` interface
 */
export const ToggleField = (props: ToggleFieldProps) => {
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
                <Toggle
                    on={props.value}
                    name={props.name}
                    disabled={props.disabled}
                    onChange={props.onChange}
                    onLabel={props.onLabel}
                    offLabel={props.offLabel}
                    className={props.inputClassName}
                    autoFocus={props.autoFocus}
                />
            </div>
        </FormField>
    );
};

export default ToggleField;
