import * as React from 'react';
import * as classNames from 'classnames/bind';
import {Icon, IconSize} from '../Icon';
import {MethodNode, FormOption} from '../../Common';
const css = classNames.bind(require('./ComboInput.scss'));


export interface ComboResolver {
    onChange: (newValue: string, options: FormOption[]) => FormOption[] | Promise<FormOption[]>;
    getList: () => FormOption[];
}

export interface ComboInputType {}

export interface ComboInputProps extends React.Props<ComboInputType> {
    /** HTML form element name */
    name: string;
    /** Current value of HTML input element */
    value: string;
    /** HTML input element placeholder */
    placeholder?: string;

    /** 
     * List of HTML radio button element options in the format:
     * 
     * `{
     *     label: string,
     *     value: any,
     *     disabled: boolean,
     *     hidden: boolean
     * }`
     */
    options: FormOption[];

    /** Apply error styling to input element */
    error?: boolean;
    /** Disable HTML input element and apply disabled styling */
    disabled?: boolean;

    /** Callback for HTML input element `onChange` events */
    onChange: (newValue: string) => void;
    /** Interface for autocomplete functions */
    resolver: ComboResolver;

    /** Class to append to top level element */
    className?: string;
}

export interface ComboInputState {

}

/**
 * Low level combo input control
 * 
 * (Use the `ComboField` control instead when making a form with standard styling)
 */
export class ComboInput extends React.Component<ComboInputProps, ComboInputState> {
    constructor(props: ComboInputProps) {
        super(props);

        this.state = {};
    }

    render () {
        const containerClassName = css('combo-input-container', this.props.className);
        const inputClassName = css({
            'input': true,
            'error': this.props.error
        });
        
        const onChange = (event) => {
            if (this.props.value !== event.target.value) {
                this.props.onChange(event.target.value);
            }
            event.stopPropagation();
        };

        const clearButton = this.props.disabled ? '' :
            <button
                className={css('cancel', 'icon icon-cancelLegacy')}
                onClick={() => this.props.onChange('')}
                tabIndex={-1}
            />;

        return (
            <div className={containerClassName}>
                <div className={css('input-container')}>
                    <input 
                        type='text'
                        name={this.props.name}
                        value={this.props.value}
                        className={inputClassName}
                        onInput={onChange}
                        placeholder={this.props.placeholder}
                        // This is not the same as props.required
                        // (this gives us :valid css selector)
                        required
                        disabled={this.props.disabled}
                    />
                    <Icon
                        icon='chevronDown'
                        size={IconSize.xsmall}
                        className={css('chevron')}
                    />
                    {clearButton}
                </div>
            </div>
        );
    }
}

export default ComboInput;
