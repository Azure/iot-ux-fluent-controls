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
    optionFilter?: (newValue: string, option: string) => boolean;
    optionSelect?: (newValue: string, option: string) => boolean;
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

const defaultFilter = (newValue: string, option: string) => true;

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
        optionFilter: defaultFilter,
        optionMap: defaultMap,
        optionSelect: defaultSelect,
        optionLabel: defaultLabel
    };

    inputElement?: any;

    constructor(props: ComboInputProps) {
        super(props);

        this.state = {
            visible: false,
            hovered: null
        };
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
            this.setState({ visible: false });
        } else {
            event.preventDefault();
        }
    }

    onFocus(event) {
        this.setState({visible: true});
    }

    getHoveredIndex(options: FormOption[]) {
        
    }

    onKeyPress(event) {
        switch (event.charCode) {
            case keyCode.down:
                
                if (index < 0) {
                    index = 0;
                } else if (index === this.props.options.length - 1) {
                    index = 0;
                } else {
                    index++;
                }
                break;
            default:
                return;
        }
        event.preventDefault();
    }

    getValue(): string {
        if (typeof(this.props.value) === 'string') {
            return this.props.value;
        } else {
            return this.props.optionMap(this.props.value);
        }
    }

    getVisibleOptions(): FormOption[] {
        return this.props.options.filter(option => {
            return this.props.optionFilter(
                this.getValue(),
                this.props.optionMap(option)
            );
        });
    }

    onChange(event) {
        const newValue = event.target.value;
        const options = this.props.options.map(this.props.optionMap);
        const result = options.filter(option => this.props.optionSelect(option, newValue));
        if (result.length > 0) {
            this.props.onChange(result[0]);
        } else {
            this.props.onChange(newValue);
        }
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
                this.props.onChange(option);
                this.setState({visible: false});
            };
            const onHover = (event) => {
                this.setState({hovered: option});
            };
            const optionClassName = css('option', {
                'selected': this.props.optionSelect(strValue, value),
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
                        onChange={event => this.onChange(event)}
                        placeholder={this.props.placeholder}
                        onFocus={event => this.onFocus(event)}
                        onKeyPress={event => this.onKeyPress(event)}
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
