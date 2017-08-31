import * as React from 'react';
import * as classNames from 'classnames/bind';
import {Icon, IconSize, IconBackground} from '../Icon';
const cssName = classNames.bind(require('./TextField.scss'));

export interface TextInputType {}

export interface TextInputState {
    cancelFocused: boolean;
}

export interface TextInputProps extends React.Props<TextInputType> {
    value: string;
    placeholder?: string;

    error?: boolean;
    disabled?: boolean;

    onChange: (newValue: string) => void;
    onClear: () => void;
}

export class TextInput extends React.Component<TextInputProps, TextInputState> {
    constructor(props: TextInputProps) {
        super(props);
    }

    onChange(event) {

    }

    render() {
        const containerClass = cssName('input-container');
        const inputClass = cssName({
            'input': true, 'error': this.props.error
        });
        const cancelClass = cssName('cancel', 'icon icon-cancelLegacy');

        return (
            <div className={containerClass}>
                <input 
                    className={inputClass}
                    onChange={this.onChange}
                    type='text' required /> 
                <button className={cancelClass} />
            </div>
        );
    }
}

export interface TextFieldType {}

export interface TextFieldState {
    cancelFocused: false;
}

export interface TextFieldProps extends React.Props<TextFieldType> {
    label: React.ReactNode;
    error?: React.ReactNode;
    // value: string;
    placeholder?: string;

    disabled?: boolean;
    required?: boolean;

    // onChange: (newValue: string) => void;
    // onClear: () => void;
}

export class TextField extends React.Component<TextFieldProps, TextFieldState> {
    constructor(props: TextFieldProps) {
        super(props);
    }

    render() {
        let labelClass = cssName('label');
        let containerClass = cssName('input-container', 'input-error');
        let inputClass = cssName('input', 'input-error');
        let errorClass = cssName('field-error');
        let requiredClass = cssName('required');
        let cancelClass = cssName('cancel', 'icon icon-cancelLegacy');
        let iconClass = cssName('error-icon', 'icon icon-cancelLegacy');
        let errorTextClass = cssName('error-text', 'icon icon-cancelLegacy');

        let parentStyle = {
            'width': '500px',
            'marginLeft': '20px',
            'marginBottom': '10px'
        };

        return (
            <div style={parentStyle}>
                <div className={labelClass}>
                    Form Field <span className={requiredClass}>*</span>
                </div>
                <div className={containerClass}>
                    <input className={inputClass} type='text' placeholder='ComingSoon!' required /> 
                    <button className={cancelClass} onClick={() => alert('lol')} />
                </div>

                <div className={errorClass}>
                    <span className={iconClass}>This Field is Required</span>
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