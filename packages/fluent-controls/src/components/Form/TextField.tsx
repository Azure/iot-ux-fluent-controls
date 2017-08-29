/* tslint:disable:interface-name */
import * as React from 'react';
import * as classNames from 'classnames/bind';
import {Icon, IconSize, IconBackground} from '../Icon';
const cssName = classNames.bind(require('./TextField.scss'));

export interface TextFieldType {}

export interface TextFieldState {
    value: string;
}

export interface TextFieldProps extends React.Props<TextFieldType> {
    disabled?: boolean;
    required?: boolean;
    placeholder?: string;
    initialValue?: string;
    label: string;
    
    className?: string;
}

export class TextField extends React.Component<TextFieldProps, TextFieldState> {
    constructor(props: TextFieldProps) {
        super(props);
    }

    public render() {
        let labelClass = cssName('label');
        let inputClass = cssName('input', 'input-error');
        let errorClass = cssName('field-error');
        let requiredClass = cssName('required');
        let cancelClass = cssName('cancel', 'icon icon-cancelLegacy');
        let iconClass = cssName('error-icon', 'icon icon-cancelLegacy');

        let parentStyle = {
            'width': '500px'
        };

        return (
            <div style={parentStyle}>
                <div className={labelClass}>
                    Form Field <span className={requiredClass}>*</span>
                </div>
                <div className={inputClass}>
                    <input type='text' placeholder='ComingSoon!' required /> 
                    <span className={cancelClass} />
                </div>

                <div className={errorClass}>
                    <span className={iconClass}/>
                    This field is required
                </div>
            </div>
        );
    }
}

export interface FormFieldType {}

export interface FormFieldProps extends React.Props<FormFieldType> {
    label: string;
    error?: string;

    disabled?: boolean;
    required?: boolean;

    children: JSX.Element;
    
    className?: string;
}

export const FormField = (props: FormFieldProps) => {
    let { required, disabled, error } = this.props;

    let className = cssName({
        'form-field': true,
        'field-required': required,
        'field-disabled': disabled
    }, this.props.className);

    let footer;
    if (error) {
        footer = (
            <footer>
                <Icon icon='error' size={IconSize.xsmall} />
                <span className={''}>{error}</span>
            </footer>
        );
    }

    return (
        <div className={className}>
            <header>
                {this.props.label}
            </header>
            {this.props.children}
            {footer}
        </div>
    );
};