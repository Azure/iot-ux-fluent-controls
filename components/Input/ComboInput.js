"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const classNames = require("classnames/bind");
const Attributes_1 = require("../../Attributes");
const Dropdown_1 = require("../Dropdown");
const Common_1 = require("../../Common");
const css = classNames.bind(require('./ComboInput.scss'));
const defaultMap = (option) => {
    if (typeof (option.value) === 'string') {
        return option.value;
    }
    if (DEBUG) {
        console.error('METHOD ERROR: The default ComboInput map function expects FormOption.value to be a string');
    }
    return '';
};
const defaultFilter = (newValue, option) => !option.hidden;
const defaultSelect = (newValue, option) => option === newValue;
const defaultLabel = (newValue, option) => option.label;
/**
 * Low level combo input control
 *
 * `ComboInput` is a hybrid of the SelectInput and TextInput controls. It
 * functions as a 'new or existing' text field where the user can type in a
 * custom value or pick from a list of values provided by the control.
 *
 * `ComboInput` consumes the property `options: FormOption[]` which specify
 * each option's `value` and `label`. The former can be any object while the
 * latter can be any React node (or a string). `ComboInput` also consumes a
 * `value: string | FormOption` property that sets the current value of the
 * `ComboInput` text field. If `value` is a `string`, the user is typing in a
 * custom value and if it is an object, the user has either typed in a value
 * equal to one of the options or has selected an option from the dropdown list.
 *
 * In this example of a default `ComboInput`, `FormOption.value` must be a
 * string, which allows you to use `ComboInput` with only the properties `name`,
 * `value`, `onChange`, and `options`. When the user types in 'Option 1', that
 * option will be considered selected instead of a custom object.
 *
 * *Reffer to the other examples on how to use `ComboInput`'s callbacks to
 * further modify what options display in the dropdown.*
 *
 * (Use the `ComboField` control for forms with standard styling)
 */
class ComboInput extends React.Component {
    constructor(props) {
        super(props);
        this.inputRef = (input) => {
            this.inputElement = input;
            if (this.props.autoFocus) {
                Common_1.autoFocusRef(this.inputElement);
            }
        };
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
        this.optionElements = {};
        this.currentOption = null;
    }
    onFocus(event) {
        this.showDropdown();
    }
    onKeyDown(event) {
        /** So that we don't block any browser shortcuts */
        if (event.ctrlKey || event.altKey) {
            return;
        }
        const options = this.getVisibleOptions().filter(option => !option.hidden && !option.disabled).map(option => option.value);
        if (options.length > 0) {
            switch (event.keyCode) {
                case Common_1.keyCode.down:
                    if (this.currentOption) {
                        const currentOption = options.indexOf(this.currentOption);
                        const index = currentOption > -1 ? currentOption : options.length - 1;
                        const newValue = index === options.length - 1
                            ? options[0]
                            : options[index + 1];
                        this.setSelection(newValue);
                    }
                    else {
                        this.setSelection(options[0]);
                    }
                    break;
                case Common_1.keyCode.up:
                    if (this.currentOption) {
                        const currentOption = options.indexOf(this.currentOption);
                        const index = currentOption > -1 ? currentOption : 0;
                        const newValue = index === 0
                            ? options[options.length - 1]
                            : options[index - 1];
                        this.setSelection(newValue);
                    }
                    else {
                        this.setSelection(options[0]);
                    }
                    break;
                case Common_1.keyCode.enter:
                    if (this.state.visible && this.currentOption) {
                        this.props.onChange(this.currentOption);
                        this.hideDropdown();
                    }
                    else {
                        this.showDropdown();
                    }
                    break;
                default:
                    return;
            }
        }
        else {
            return;
        }
        event.preventDefault();
    }
    getValue() {
        if (typeof (this.props.value) === 'string') {
            return this.props.value;
        }
        else {
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
    getVisibleOptions(getDisabled = true) {
        let filter = option => !option.hidden;
        if (typeof (this.props.value) === 'string') {
            filter = option => {
                return this.optionFilter(this.getValue(), option);
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
        }
        else {
            this.props.onChange(newValue);
        }
    }
    showDropdown() {
        this.setState({ visible: true });
    }
    hideDropdown() {
        this.setState({ visible: false, hovered: null });
    }
    clearSelection(option) {
        /**
         * See setSelection(option) below for an explanation of why this is done
         * instead of using render() and state
         */
        if (option && this.optionElements[option]) {
            const element = this.optionElements[option];
            const options = this.getVisibleOptions();
            const index = options.map(option => option.value).indexOf(option);
            const className = this.props.attr.option && this.props.attr.option.className
                ? this.props.attr.option.className : '';
            if (index > -1) {
                element.className = css('option', className, options[index].attr && options[index].attr.className
                    ? options[index].attr.className : '');
            }
            else {
                element.className = css('option', className);
            }
        }
    }
    setSelection(option) {
        /**
         * This sets the background and text color for options in the dropdown
         * when the user hovers over the option or presses up/down in the input
         *
         * Since the ComboInput dropdown DOM is moved around to draw on top of
         * all other elements, rerendering each time the user hovers over an option
         * or changes which option is selected with the arrow keys causes the dropdown
         * to be moved back into its regular DOM position, rerendered, and moved back
         * on top of all other elements. This creates a huge performance problem in
         * Edge that prevents the ComboInput from registering clicks and resets scroll
         * position in every other browser. Setting the hover class directly on the DOM
         * as we do here allows us to render only when the value changes or the dropdown
         * is opened/closed.
         */
        this.clearSelection(this.currentOption);
        if (option && this.optionElements[option]) {
            const element = this.optionElements[option];
            const options = this.getVisibleOptions();
            const index = options.map(option => option.value).indexOf(option);
            const className = this.props.attr.option && this.props.attr.option.className
                ? this.props.attr.option.className : '';
            if (index > -1) {
                element.className = css('option', 'hover', className, options[index].attr && options[index].attr.className
                    ? options[index].attr.className : '');
            }
            else {
                element.className = css('option', 'hover', className);
            }
        }
        this.currentOption = option;
    }
    render() {
        const containerClassName = css('combo-input-container', this.props.className);
        const inputClassName = css({
            'input': true,
            'error': this.props.error,
            'visible': this.state.visible,
            'show-cancel': this.state.visible && this.props.value
        }, this.props.inputClassName);
        let inputValue = '';
        const value = this.getValue();
        let result = null;
        const visibleOptions = this.getVisibleOptions();
        const options = visibleOptions.map((option, index) => {
            const checkLabel = this.props.showLabel
                ? this.props.optionLabel(value, option).toString === this.props.value
                : false;
            if (option.value === this.props.value || checkLabel) {
                result = option;
            }
            const optionClassName = css('option', {
                'selected': this.optionSelect(value, option),
                'disabled': option.disabled
            });
            return (React.createElement(Attributes_1.Elements.button, { type: 'button', className: optionClassName, onClick: option.disabled ? undefined : (event) => {
                    this.props.onChange(option.value);
                    this.hideDropdown();
                    this.inputElement.blur();
                }, onMouseEnter: (event) => {
                    this.setSelection(option.value);
                }, onMouseLeave: (event) => {
                    this.setSelection(null);
                }, tabIndex: -1, key: index, methodRef: (element) => {
                    if (element) {
                        this.optionElements[option.value] = element;
                    }
                }, attr: Attributes_1.mergeAttributes(this.props.attr.option, option.attr) }, this.props.optionLabel(value, option)));
        });
        if (result) {
            inputValue = this.props.showLabel
                ? this.props.optionLabel(value, result).toString()
                : value;
        }
        else {
            if (typeof (this.props.value) === 'string') {
                inputValue = this.props.value;
            }
        }
        const clearButton = this.props.disabled ? '' :
            React.createElement(Attributes_1.Elements.button, { type: 'button', className: css('cancel', 'icon icon-cancel'), onClick: () => {
                    this.inputElement.focus();
                    this.props.onChange('');
                }, tabIndex: -1, attr: this.props.attr.clearButton });
        const dropdown = this.props.options && this.props.options.length > 0
            && React.createElement(Attributes_1.Elements.div, { className: this.props.dropdownClassName, attr: this.props.attr.dropdown }, options);
        const validOptions = visibleOptions.filter(option => !option.disabled);
        return (React.createElement(Dropdown_1.Dropdown, { dropdown: dropdown, visible: validOptions.length > 0 && this.state.visible, className: containerClassName, 
            /**
            * This is empty on purpose. When onMouseEnter/Leave is set,
            * the dropdown starts to accept pointer events needed for
            * interactive dropdowns
            */
            onMouseEnter: () => { }, outerEvents: ['click', 'focusin'], onOuterEvent: (event) => this.setState({ visible: false }), attr: Attributes_1.mergeAttributeObjects(this.props.attr, {
                dropdown: {
                    className: css('dropdown')
                },
            }, ['container', 'dropdownContainer', 'dropdown']) },
            React.createElement(Attributes_1.Elements.div, { className: css('input-container'), attr: this.props.attr.textbox },
                React.createElement(Attributes_1.Elements.input, { type: 'text', autoComplete: 'off', name: this.props.name, value: inputValue, className: inputClassName, onChange: event => this.onInputChange(event), placeholder: this.props.placeholder, onFocus: event => this.onFocus(event), onKeyDown: event => this.onKeyDown(event), required: this.props.required, disabled: this.props.disabled, readOnly: this.props.readOnly, methodRef: this.inputRef, autoFocus: this.props.autoFocus, attr: this.props.attr.input }),
                clearButton,
                React.createElement(Attributes_1.Elements.span, { className: css('chevron', 'icon icon-chevronDown'), attr: this.props.attr.chevron }))));
    }
}
ComboInput.defaultProps = {
    optionMap: defaultMap,
    optionLabel: defaultLabel,
    showLabel: true,
    attr: {
        container: {},
        textbox: {},
        input: {},
        clearButton: {},
        chevron: {},
        dropdown: {},
        option: {},
    }
};
exports.ComboInput = ComboInput;
exports.default = ComboInput;

//# sourceMappingURL=ComboInput.js.map
