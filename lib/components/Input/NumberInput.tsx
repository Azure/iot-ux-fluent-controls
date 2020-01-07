import * as React from 'react';
import * as classNames from 'classnames/bind';
import { TextInput, TextInputAttributes } from './TextInput';
import { MethodNode, keyCode } from '../../Common';

const css = classNames.bind(require('./TextInput.module.scss'));

export interface NumberInputType { }

const invalidNumber = 'invalid';

export interface NumberInputProps extends React.Props<NumberInputType> {
    /** HTML form element name */
    name: string;
    /** Current value of HTML input element */
    initialValue?: string | number;
    /** HTML input element placeholder */
    placeholder?: string;
    /** Step to give the number input */
    step?: number | 'any';
    /** Minimum value of HTML Input element */
    min?: number;
    /** Maximum value of HTML Input element */
    max?: number;

    /** Node to draw to the left of the input box */
    prefix?: MethodNode;
    /** Node to draw to the right of the input box */
    postfix?: MethodNode;

    /** Apply error styling to input element */
    error?: boolean;
    /** Add required attribute to HTML input element */
    required?: boolean;
    /** Disable HTML input element and apply disabled styling */
    disabled?: boolean;
    /** Read only HTML input element */
    readOnly?: boolean;
    /** Autofocus */
    autoFocus?: boolean;

    /** Callback for HTML input element `onChange` events */
    onChange: (newValue: number | 'invalid') => void;

    /** Class to append to top level element */
    className?: string;

    attr?: TextInputAttributes;
}

export interface NumberInputState {
    value: string;
    paste?: boolean;
}

/**
 * Low level text input control
 *
 * (Use the `TextField` control instead when making a form with standard styling)
 */
export const NumberInput = React.memo((props: NumberInputProps) => {
    const value = React.useMemo(() => {
        if (typeof (props.initialValue) === 'number') {
            return props.initialValue.toString();
        }
        return props.initialValue ?? '';
    }, [props.initialValue]);

    const isPositive = React.useCallback((): boolean => {
        return typeof (props.min) === 'number' && props.min >= 0;
    }, [props.min]);

    const isInteger = React.useCallback((): boolean => {
        return typeof (props.step) === 'number' && props.step % 1 === 0;
    }, [props.step]);

    const getValue = React.useCallback((value: string): number | 'invalid' => {
        if (value === '') {
            return invalidNumber;
        }
        const decimalSeparator = '.';
        const decimalSplit = value.split(decimalSeparator);
        if (isInteger() && decimalSplit.length > 1) {
            return invalidNumber;
        }

        value = value.replace(',', '');

        let outValue = isInteger() ? parseInt(value) : parseFloat(value);
        if (isPositive() && outValue < 0) {
            return invalidNumber;
        }

        if (isNaN(outValue)) {
            return invalidNumber;
        }

        return outValue;
    }, [isInteger, isPositive]);

    const onChange = React.useCallback((newValue: string) => {
        if (newValue === '' && value !== '') {
            props.onChange(null);
            return;
        }

        /** Reset our state machine */
        const parsedValue = getValue(newValue);
        
        if (parsedValue === invalidNumber) {
            props.onChange(parsedValue);
            return;
        }

        if (isPositive() && parsedValue < 0) {
            return;
        }

        props.onChange(parsedValue);
    }, [isPositive, getValue, props.onChange, value]);

    const onKeyDown = React.useCallback((event: React.KeyboardEvent) => {
        /** So that we don't block any browser shortcuts */
        if (event.ctrlKey || event.altKey) {
            return;
        }
        /** These are all keys that don't have characters */
        if (event.keyCode <= keyCode.slash) {
            return;
        }

        // Allow numbers
        if (event.keyCode >= keyCode.num0 && event.keyCode <= keyCode.num9) {
            return;
        }

        // Allow numpad numbers
        if (event.keyCode >= keyCode.numpad0 && event.keyCode <= keyCode.numpad9) {
            return;
        }

        if (
            !isPositive()
            /** Firefox uses a different keycode for dashes (-) than other browsers... */
            && (event.keyCode === keyCode.dash || event.keyCode === keyCode.firefoxDash)
            && value?.indexOf('-') === -1
        ) {
            return;
        }

        if (
            !isInteger()
            && event.keyCode === keyCode.period
            && value.indexOf('.') === -1
        ) {
            return;
        }

        event.preventDefault();
    }, [isPositive, isInteger, value]);

    const attr = {
        ...(props.attr || {}),
        input: {
            ...(props.attr?.input || {}),
            className: css('no-cancel'),
            step: props.step ?? 'any',
            min: props.min,
            max: props.max,
            onKeyDown,
        }
    };

    return (
        <TextInput
            name={props.name}
            value={value}
            placeholder={props.placeholder}
            type='number'
            className={props.className}
            prefix={props.prefix}
            postfix={props.postfix}
            error={props.error}
            disabled={props.disabled}
            readOnly={props.readOnly}
            autoFocus={props.autoFocus}
            onChange={onChange}
            required={props.required}
            attr={attr}
        />
    );
});

export default NumberInput;
