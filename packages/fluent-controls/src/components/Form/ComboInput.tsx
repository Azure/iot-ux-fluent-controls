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
    value: string | any;
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

    /**
     * Callback used to map FormOption to strings to be used by default 
     * optionFilter and optionSelect callbacks
     * 
     * See examples for how to use these callbacks
     */
    optionMap?: (option: FormOption) => string;
    /**
     * Callback used to filter list of FormOptions for display in the dropdown
     * 
     * This function can, for example, implement autocomplete by hiding
     * any option that does not contain the value in the text input
     * 
     * See examples for how to use these callbacks
     */
    optionFilter?: (newValue: string, option: FormOption) => boolean;
    /**
     * Callback used to decide whether a FormOption is selected or not
     * 
     * See examples for how to use these callbacks
     */
    optionSelect?: (newValue: string, option: FormOption) => boolean;
    /**
     * Callback used to generate a React node to use as the label in dropdown
     * 
     * This function can, for example, bold any relevant fragments of text for
     * highlighting in autocomplete
     * 
     * See examples for how to use these callbacks
     */
    optionLabel?: (newValue: string, option: FormOption) => MethodNode;

    /** Apply error styling to input element */
    error?: boolean;
    /** Disable HTML input element and apply disabled styling */
    disabled?: boolean;

    /** Callback for HTML input element `onChange` events */
    onChange: (newValue: string | FormOption) => void;

    /** Class to append to top level element */
    className?: string;
    /** Class to append to HTML Input element */
    inputClassName?: string;
    /** Class to append to top level dropdown element */
    dropdownClassName?: string;
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

const defaultSelect = (newValue: string, option: string) => option === newValue;

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
    }

    componentWillUnmount() {
        window.removeEventListener('click', this.handleDropdown);
    }

    handleDropdown(event) {
        if (event.target === this.inputElement) {
            return;
        }
        if (!this.state.visible && !hasClassName(event.target, css('cancel'))) {
            return;
        }

        const className = css('combo-input-container');
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
            event.stopPropagation();
            event.preventDefault();
        }
    }

    onFocus(event) {
        this.showDropdown();
    }

    getDropdownIndex(options: FormOption[]): number {
        if (this.state.hovered) {
            return options.indexOf(this.state.hovered);
        }
        if (!this.props.value) {
            return -1;
        }
        return options.map(option => option.value).indexOf(this.props.value);
    }

    getNextIndex(options: FormOption[], index, increment: number = 1): number {
        let option;
        let curIndex = index;

        if (!(increment > 0 || increment < 0)) {
            return index;
        }

        if (index < 0) {
            curIndex = increment < 0 ? options.length : -1;
        }

        do {
            curIndex += increment;
            if (index === curIndex) {
                return index;
            } else if (curIndex >= options.length && increment > 0) {
                curIndex = 0;
            } else if (curIndex <= -1 && increment < 0) {
                curIndex = options.length - 1;
            }
            option = options[curIndex];
        } while (option.disabled || option.hidden);

        return curIndex;
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
                index = this.getNextIndex(options, this.getDropdownIndex(options), 1);
                this.setState({hovered: options[index], visible: true});
                break;
            case keyCode.up:
                options = this.getVisibleOptions();
                index = this.getNextIndex(options, this.getDropdownIndex(options), -1);                
                this.setState({hovered: options[index], visible: true});
                break;
            case keyCode.enter:
                if (this.state.visible) {
                    this.props.onChange(this.state.hovered.value);
                    this.hideDropdown();
                } else {
                    this.showDropdown();
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

    getVisibleOptions(getDisabled: boolean = true): FormOption[] {
        let filter = option => !option.hidden;
        if (typeof(this.props.value) === 'string') {
            filter = option => {
                return this.optionFilter(
                    this.getValue(),
                    option
                );
            };
        }
        const results = this.props.options.filter(filter);
        return getDisabled ? results : results.filter(option => !option.disabled);
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
        const containerClassName = css('combo-input-container', this.props.className);
        const inputClassName = css({
            'input': true,
            'error': this.props.error,
            'visible': this.state.visible
        }, this.props.inputClassName);
        const dropdownClassName = css(
            'dropdown', {
                'visible': this.state.visible
            }, this.props.dropdownClassName
        );

        const value = this.getValue();
        const options = this.getVisibleOptions().map((option, index) => {
            const optionClassName = css('option', {
                'selected': this.optionSelect(value, option),
                'hover': this.state.hovered === option,
                'disabled': option.disabled
            });
            const onClick = option.disabled ? () => {} : (event) => {
                this.props.onChange(option.value);
                this.hideDropdown();
                this.inputElement.blur();
            };
            const onHover = (event) => {
                this.setState({hovered: option});
            };

            return (
                <button
                    className={optionClassName}
                    onClick={onClick}
                    onMouseOver={onHover}
                    tabIndex={-1}
                    key={index}
                >
                    {this.props.optionLabel(value, option)}
                </button>
            );
        });

        const clearButton = this.props.disabled ? '' :
            <button
                className={css('cancel', 'icon icon-cancelLegacy')}
                onClick={() => {
                    this.inputElement.focus();
                    this.props.onChange('');
                }}
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
                    {clearButton}
                    <span className={css('chevron', 'icon icon-chevronDown')} />
                    <div className={dropdownClassName}>
                        {options}
                    </div>
                </div>
            </div>
        );
    }
}

export default ComboInput;
