import * as React from 'react';
import * as classNames from 'classnames/bind';
import {MethodNode} from '../../Common';
import {HorizontalLoader} from '../Loader';
const css = classNames.bind(require('./Field.scss'));

export interface FormFieldType {}

export interface FormFieldProps extends React.Props<FormFieldType> {
    /** HTML element name for label accessibility */
    name: string;
    /** Label to display above input element */
    label: MethodNode;
    /** Error to display below input element */
    error?: MethodNode;
    /** Display horizontal loading animation instead of error */
    loading?: boolean;
    /** Form field is required (appends a red asterisk to the label) */
    required?: boolean;
    /** Set error field to display: none */
    hideError?: boolean;

    /** Classname to append to top level element */
    className?: string;
}

/**
 * High level generic form field
 * 
 * @param props Control properties (defined in `FormFieldProps` interface)
 */
export const FormField: React.StatelessComponent<FormFieldProps> = (props: FormFieldProps) => {
    const containerClass = css('input-container', {
        'input-error': props.error,
        'required': props.required,        
    }, props.className);

    let error = props.error;
    if (props.loading) {
        error = <HorizontalLoader dots={6} />;
    }

    return (
        <div className={containerClass} >
            <label className={css('label')} htmlFor={props.name} >
                {props.label}
            </label>
            {props.children}
            <div className={css('field-error', {'hidden': props.hideError})}>
                {error}
            </div>
        </div>
    );
};

FormField.defaultProps = {
    loading: false,
    required: false,
    hideError: false
};

export default FormField;
