import * as React from 'react';
import * as classNames from 'classnames/bind';
import {SelectInput, SelectOption} from './SelectInput';
const cssName = classNames.bind(require('./SelectField.scss'));

export interface SelectFieldType {}

export interface SelectFieldProps extends React.Props<SelectFieldType> {
    name: string;
    value: string;
    options: SelectOption[];
    
    label: React.ReactNode;
    error?: React.ReactNode;
    
    disabled?: boolean;
    required?: boolean;

    onChange: (newValue: any) => void;

    className?: string;
}

export const SelectField = (props: SelectFieldProps) => {
    const labelClass = cssName('label');
    const containerClass = cssName('input-container', {
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
            <SelectInput
                name={props.name}
                value={props.value}
                onChange={props.onChange}
                disabled={props.disabled}
                error={!!props.error}
                options={props.options}
            />

            <div className={errorClass}>
                {props.error}
            </div>
        </div>
    );
};
