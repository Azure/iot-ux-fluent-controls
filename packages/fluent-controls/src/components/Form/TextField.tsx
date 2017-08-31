import * as React from 'react';
import * as classNames from 'classnames/bind';
import {Icon, IconSize, IconBackground} from '../Icon';
import {TextInput} from './TextInput';
const cssName = classNames.bind(require('./TextField.scss'));

export interface TextFieldType {}

export interface TextFieldProps extends React.Props<TextFieldType> {
    name: string;
    value: string;
    placeholder?: string;
    
    label: React.ReactNode;
    error?: React.ReactNode;
    
    disabled?: boolean;
    required?: boolean;

    onChange?: (newValue: string) => void;
    onClear?: () => void;

    className?: string;
}

export const TextField = (props: TextFieldProps) => {
    const labelClass = cssName('label');
    const containerClass = cssName({
        'input-container': true,
        'input-error': props.error,
        'required': props.required,
    }, props.className);
    const inputClass = cssName({
        'input': true,
        'input-error': props.error
    });
    const errorClass = cssName('field-error');    

    return (
        <div className={containerClass} >
            <label className={labelClass} htmlFor={props.name} >
                {props.label}
            </label>
            <TextInput
                name={props.name}
                value={props.value}
                placeholder={props.placeholder}
                onChange={props.onChange}
                onClear={props.onClear}
                disabled={props.disabled}
                error={!!props.error}
            />

            <div className={errorClass}>
                {props.error}
            </div>
        </div>
    );
};

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