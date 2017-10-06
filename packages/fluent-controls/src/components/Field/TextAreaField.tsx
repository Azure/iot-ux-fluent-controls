import * as React from 'react';
import * as classNames from 'classnames/bind';
import {MethodNode} from '../../Common';
import {TextArea} from '../Input/TextArea';
import {FormField} from './FormField';
const css = classNames.bind(require('./Field.scss'));

export interface TextAreaFieldType {}

export interface TextAreaFieldProps extends React.Props<TextAreaFieldType> {
    /** HTML form element name */
    name: string;
    /** Current value of HTML textarea element */
    value: string;
    /** HTML textarea element placeholder */
    placeholder?: string;

    /** Label to display above textarea element */
    label: MethodNode;
    /** Error to display below textarea element */
    error?: MethodNode;

    /** Grow text area to fit user text */
    autogrow?: boolean;
    /** Disable HTML textarea element */
    disabled?: boolean;
    /** Form field is required (appends a red asterisk to the label) */
    required?: boolean;
    /** Display horizontal loading animation instead of error */
    loading?: boolean;
    /** Autofocus */
    autoFocus?: boolean;

    /** Callback for HTML input element `onChange` events */
    onChange: (newValue: string) => void;

    /** Classname to append to top level element */
    className?: string;
    /** Classname to append to top level element of TextArea */
    inputClassName?: string;
}

/**
 * High level form text field
 * 
 * @param props Control properties (defined in `TextAreaFieldProps` interface)
 */
export const TextAreaField: React.StatelessComponent<TextAreaFieldProps> = (props: TextAreaFieldProps) => {
    return (
        <FormField
            name={props.name}
            label={props.label}
            error={props.error}
            loading={props.loading}
            required={props.required}
            className={props.className}
        >
            <TextArea
                name={props.name}
                value={props.value}
                placeholder={props.placeholder}
                error={!!props.error}
                disabled={props.disabled}
                onChange={props.onChange}
                className={props.inputClassName}
                autogrow={props.autogrow}
                autoFocus={props.autoFocus}
            />
        </FormField>
    );
};

TextAreaField.defaultProps = {
};

export default TextAreaField;
