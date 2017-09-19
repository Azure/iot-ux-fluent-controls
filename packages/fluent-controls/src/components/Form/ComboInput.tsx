import * as React from 'react';
import * as classNames from 'classnames/bind';
import {Icon, IconSize} from '../Icon';
import {MethodNode, FormOption} from '../../Common';
const css = classNames.bind(require('./ComboInput.scss'));

export interface ComboInputType {}

export interface ComboInputProps extends React.Props<ComboInputType> {
    /** HTML form element name */
    name: string;
    /** Current value of HTML input element */
    value: string;
    /** HTML input element placeholder */
    placeholder?: string;

    /** 
     * List of HTML select element options in the format:
     * 
     * `{
     *     label: string,
     *     value: any,
     *     disabled: boolean,
     *     hidden: boolean
     * }`
     */
    options: FormOption[];
    optionsMap?: (option: FormOption) => string;
    optionsFilter?: (newValue: string, option: string) => boolean;
    optionsSelect?: (newValue: string, option: string) => boolean;

    /** Apply error styling to input element */
    error?: boolean;
    /** Disable HTML input element and apply disabled styling */
    disabled?: boolean;

    /** Callback for HTML input element `onChange` events */
    onChange: (newValue: string | FormOption) => void;

    /** Class to append to top level element */
    className?: string;
}

export interface ComboInputState {
    visible: boolean;
}

const defaultMap = (option: FormOption) => {
    if (typeof(option.value) === 'string') {
        return option.value;
    }
    console.error('The default ComboInput map function expects FormOption.value to be a string');
    return null;
};

const defaultFilter = (option: string, newValue: string) => true;

const defaultSelect = (option: string, newValue: string) => option === newValue;

/**
 * Low level combo input control
 * 
 * (Use the `ComboField` control instead when making a form with standard styling)
 */
export class ComboInput extends React.Component<ComboInputProps, ComboInputState> {
    static defaultProps =  {
        optionsFilter: defaultFilter,
        optionsMap: defaultMap,
        optionsSelect: defaultSelect
    };

    constructor(props: ComboInputProps) {
        super(props);

        this.state = {
            visible: false
        };
    }

    onFocus() {
        this.setState({visible: true});
    }

    onBlur() {
        this.setState({visible: false});
    }

    onSelect(value: string | FormOption) {

    }

    render () {
        const containerClassName = css('combo-input-container', this.props.className);
        const inputClassName = css({
            'input': true,
            'error': this.props.error
        });
        
        const onChange = (event) => {
            const newValue = event.target.value;
            const options = this.props.options.map(this.props.optionsMap);
            const result = options.filter(option => this.props.optionsSelect(option, newValue));
            if (result.length === 0) {
                this.props.onChange(result[0]);
            } else {
                this.props.onChange(newValue);
            }
        };

        const options = [];
        for (let index = 0; index < this.props.options.length; index++) {
            const option = this.props.options[index];
            const strValue = this.props.optionsMap(option);
            const visible = this.props.optionsFilter(strValue, this.props.value);
            const onClick = (event) => {
                this.onSelect(option);
            };
            const optionClassName = css('combo-option', {
                'selected': this.props.optionsSelect(this.props.value, strValue)
            });
        

            if (visible) {
                options.push(
                    <div className={optionClassName} onClick={onClick} key={index}>
                        {option.label}
                    </div>
                );
            }
        }

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
                        onChange={onChange}
                        placeholder={this.props.placeholder}
                        onFocus={event => this.onFocus()}
                        onBlur={event => this.onBlur()}
                        // This is not the same as this.props.required
                        // (this gives us :valid css selector)
                        required
                        disabled={this.props.disabled}
                    />
                    <Icon
                        icon='chevronDown4'
                        size={IconSize.xsmall}
                        className={css('chevron')}
                    />
                    {clearButton}
                    <div className={css('dropdown', {'visible': this.state.visible})}>
                        {options}
                    </div>
                </div>
            </div>
        );
    }
}

export default ComboInput;
