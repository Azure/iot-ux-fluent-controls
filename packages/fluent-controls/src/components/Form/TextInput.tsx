import * as React from 'react';
import * as classNames from 'classnames/bind';
import {Icon, IconSize, IconBackground} from '../Icon';
const css = classNames.bind(require('./TextInput.scss'));

export interface TextInputType {}

export interface TextInputState {
    cancelFocused: boolean;
}

export interface TextInputProps extends React.Props<TextInputType> {
    name: string;
    value: string;
    placeholder?: string;

    error?: boolean;
    disabled?: boolean;

    onChange: (newValue: string) => void;
}

export class TextInput extends React.Component<TextInputProps, TextInputState> {
    inputElement: HTMLInputElement;

    constructor(props: TextInputProps) {
        super(props);

        this.state = { cancelFocused: false };

        this.onChange = this.onChange.bind(this);
        this.onClear = this.onClear.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
    }

    onChange(event) {
        const newValue = '';
        console.log(event);

        this.props.onChange(this.inputElement.value);
    }

    onClear(event) {
        this.inputElement.focus();
        this.props.onChange('');
        event.stopPropagation();
    }

    onFocus(event) {
        this.setState({ cancelFocused: true });
        event.stopPropagation();
    }

    onBlur(event) {
        this.setState({ cancelFocused: false });        
        event.stopPropagation();
    }

    render() {
        const containerClass = css('input-container');
        const inputClass = css({
            'input': true,
            'error': this.props.error,
            'cancel-focused': this.state.cancelFocused
        });
        const cancelClass = css(
            'cancel', 'icon icon-cancelLegacy'
        );

        const clearButton = this.props.disabled ? '' :
            <button
                className={cancelClass}
                onClick={this.onClear}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
            />;

        return (
            <div className={containerClass}>
                <input 
                    type='text'
                    name={this.props.name}
                    value={this.props.value}
                    className={inputClass}
                    onChange={this.onChange}
                    ref={(input) => this.inputElement = input }
                    // This is not the same as props.required
                    // (this gives us :valid css selector)
                    required
                    disabled={this.props.disabled}
                /> 
                {clearButton}
            </div>
        );
    }
}
