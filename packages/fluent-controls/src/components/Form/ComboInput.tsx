import * as React from 'react';
import * as classNames from 'classnames/bind';
import {Icon, IconSize} from '../Icon';
import {MethodNode, FormOption, keyCode, hasClassName} from '../../Common';
const css = classNames.bind(require('./ComboInput.scss'));

export interface ComboInputType {}

export interface ComboInputProps extends React.Props<ComboInputType> {
    /** HTML form element name */
    name: string;
    /** Current value of HTML input element */
    value: string | FormOption;
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
    optionMap?: (option: FormOption) => string;
    optionFilter?: (newValue: string, option: FormOption) => boolean;
    optionSelect?: (newValue: string, option: FormOption) => boolean;
    optionLabel?: (newValue: string, option: FormOption) => MethodNode;

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
    hovered: FormOption;
}

const defaultMap = (option: FormOption) => {
    if (typeof(option.value) === 'string') {
        return option.value;
    }
    console.error('METHOD ERROR: The default ComboInput map function expects FormOption.value to be a string');
    return '';
};

const defaultFilter = (newValue: string, option: FormOption) => !option.hidden;

const defaultSelect = (newValue: string, option: string) => {
    console.log(`defaultSelect: ${newValue} === ${option} is ${newValue === option}`);
    return option === newValue;
};

const defaultLabel = (newValue: string, option: FormOption) => option.label;

/**
 * Low level combo input control
 * 
 * (Use the `ComboField` control instead when making a form with standard styling)
 */
export class ComboInput extends React.Component<ComboInputProps, ComboInputState> {
    static defaultProps =  {
        optionMap: defaultMap,
        optionLabel: defaultLabel
    };

    inputElement: any;
    optionFilter: (newValue: string, option: FormOption) => boolean;
    optionSelect: (newValue: string, option: FormOption) => boolean;

    constructor(props: ComboInputProps) {
        super(props);
        
        this.state = {
            visible: false,
            hovered: null
        };
        
        const map = props.optionMap;
        this.inputElement = null;
        this.optionFilter = !!props.optionFilter ? props.optionFilter 
            : defaultFilter;
        this.optionSelect = !!props.optionSelect ? props.optionSelect
            : (newValue, option) => defaultSelect(newValue, map(option));
    }

    componentDidMount() {
        window.addEventListener('click', this.handleDropdown.bind(this));
        window.addEventListener('focusin', this.handleDropdown.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener('click', this.handleDropdown.bind(this));
        window.removeEventListener('focusin', this.handleDropdown.bind(this));
    }

    handleDropdown(event) {
        if (event.target === this.inputElement) {
            return;
        }
        if (!this.state.visible) {
            return;
        }

        let className = css('dropdown');
        let target = event.target;
        /**
         * Go back several levels to check whether the user is clicking in the
         * dropdown (which causes the text input to lose focus)
        */
        for (let i = 0; i < 6; i++) {
            if (hasClassName(target, className)) {
                break;
            }

            if (target.parentElement) {
                target = i < 5 ? target.parentElement : null;
                continue;
            } else {
                target = null;
                break;
            }
        }

        if (!target) {
            this.hideDropdown();
        } else {
            event.preventDefault();
        }
    }

    onFocus(event) {
        this.showDropdown();
    }

    getOptionIndex(options: FormOption[], value: FormOption): number {
        for (let index = 0; index < options.length; index++) {
            if (value === options[index]) {
                return index;
            }
        }
        return -1;
    }

    getDropdownIndex(options: FormOption[]) {
        return this.getOptionIndex(options, this.state.hovered);
    }

    onKeyDown(event) {
        let index, options;
        const setState = index => this.setState({
            visible: true,
            hovered: options[index]
        });

        switch (event.keyCode) {
            case keyCode.down:
               options = this.getVisibleOptions();
               index = this.getDropdownIndex(options);
               if (index < 0) {
                    setState(0);
                } else if (index === this.props.options.length - 1) {
                    setState(0);
                } else {
                    setState(index + 1);
                }
                break;
            case keyCode.up:
                options = this.getVisibleOptions();
                index = this.getDropdownIndex(options);
                if (index < 0) {
                    setState(options.length - 1);
                } else if (index === 0) {
                    setState(options.length - 1);
                } else {
                    setState(index - 1);
                }
                break;
            case keyCode.enter:
                if (this.state.visible) {
                    this.props.onChange(this.state.hovered.value);
                    this.hideDropdown();
                }
                break;
            default:
                this.setState({visible: true});
                return;
        }
        event.preventDefault();
    }

    getValue(): string {
        if (typeof(this.props.value) === 'string') {
            return this.props.value;
        } else {
            let result = null;
            this.props.options.forEach(option => {
                if (option.value === this.props.value) {
                    result = option;
                }
            });

            if (result) {
                return this.props.optionMap(result);
            }
        }
        return '';
    }

    getVisibleOptions(): FormOption[] {
        let filter = option => !option.hidden;
        if (typeof(this.props.value) === 'string') {
            filter = option => {
                return this.optionFilter(
                    this.getValue(),
                    option
                );
            };
        }
        return this.props.options.filter(filter);
    }

    onInputChange(event) {
        const newValue = event.target.value;
        const options = this.getVisibleOptions();
        const result = options.filter(option => this.optionSelect(newValue, option));
        if (result.length > 0) {
            this.props.onChange(result[0].value);
        } else {
            this.props.onChange(newValue);
        }
    }

    showDropdown() {
        this.setState({visible: true});
    }

    hideDropdown() {
        this.setState({visible: false, hovered: null});
    }

    render () {
        const value = this.getValue();
        console.log(`Get Value: ${value}`);
        const containerClassName = css('combo-input-container', this.props.className);
        const inputClassName = css({
            'input': true,
            'error': this.props.error
        });

        const options = this.getVisibleOptions().map((option, index) => {
            const strValue = this.props.optionMap(option);
            const onClick = (event) => {
                this.props.onChange(option.value);
                this.hideDropdown();
            };
            const onHover = (event) => {
                this.setState({hovered: option});
            };
            const optionClassName = css('option', {
                'selected': this.optionSelect(value, option),
                'hover': this.state.hovered === option
            });

            return (
                <div
                    className={optionClassName}
                    onClick={onClick}
                    onMouseOver={onHover}
                    key={index}
                >
                    {this.props.optionLabel(value, option)}
                </div>
            );
        });

        for (let index = 0; index < this.props.options.length; index++) {
            const option = this.props.options[index];
            
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
                        value={value}
                        className={inputClassName}
                        onChange={event => this.onInputChange(event)}
                        placeholder={this.props.placeholder}
                        onFocus={event => this.onFocus(event)}
                        onKeyDown={event => this.onKeyDown(event)}
                        // This is not the same as this.props.required
                        // (this gives us :valid css selector)
                        required
                        disabled={this.props.disabled}
                        ref={(element) => this.inputElement = element}
                    />
                    <span className={css('chevron', 'icon icon-chevronDown')} />
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
