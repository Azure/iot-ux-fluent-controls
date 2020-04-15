import * as React from 'react';
import {MethodNode} from '../../Common';
import {TextArea, TextAreaAttributes} from '../Input/TextArea';
import {FormField, FormFieldAttributes} from './FormField';

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
    /** Set error field to display: none */
    hideError?: boolean;

    /** Grow text area to fit user text */
    autogrow?: boolean;
    /** Disable HTML textarea element */
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
    onChange: (newValue: string) => void;
    
    /** Callback for the blur event */
    onBlur?: React.FocusEventHandler<HTMLTextAreaElement>;

    /** Classname to append to top level element */
    className?: string;
    /** Classname to append to top level element of TextArea */
    inputClassName?: string;
    /** React node to render at the far side of the label. */
    labelFarSide?: React.ReactNode;
    /** Label to be announced before the error message to announce to the user that there's an error */
    errorAriaLabel?: string;

    attr?: TextAreaAttributes & FormFieldAttributes;
}

/**
 * High level form text field
 *
 * @param props Control properties (defined in `TextAreaFieldProps` interface)
 */
export const TextAreaField: React.StatelessComponent<TextAreaFieldProps> = (props: TextAreaFieldProps) => {
    const textAreaAttr: TextAreaAttributes = {
        container: props.attr?.container,
        textarea: Object.assign({
            'aria-label': props.label,
            'aria-required': props.required
        }, props.attr?.textarea),
        pre: props.attr?.pre
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
            errorAriaLabel={props.errorAriaLabel}
            disabled={props.disabled}
        >
            <TextArea
                name={props.name}
                value={props.value}
                placeholder={props.placeholder}
                error={!!props.error}
                disabled={props.disabled}
                readOnly={props.readOnly}
                onChange={props.onChange}
                onBlur={props.onBlur}
                className={props.inputClassName}
                autogrow={props.autogrow}
                autoFocus={props.autoFocus}
                required={props.required}
                attr={textAreaAttr}
            />
        </FormField>
    );
};

TextAreaField.defaultProps = {
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
        textarea: {},
        pre: {}
    }
};

export default TextAreaField;
