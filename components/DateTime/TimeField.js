"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const TimeInput_1 = require("./TimeInput");
const FormField_1 = require("../Field/FormField");
/**
 * High level form text field
 *
 * @param props Control properties (defined in `TimeFieldProps` interface)
 */
exports.TimeField = (props) => {
    return (React.createElement(FormField_1.FormField, { name: props.name, label: props.label, error: props.error, errorTitle: props.errorTitle, loading: props.loading, required: props.required, className: props.className, attr: props.attr },
        React.createElement(TimeInput_1.TimeInput, { name: props.name, value: props.value, amLabel: props.amLabel, pmLabel: props.pmLabel, localTimezone: props.localTimezone, showSeconds: props.showSeconds, militaryTime: props.militaryTime, error: !!props.error, disabled: props.disabled, onChange: props.onChange, className: props.inputClassName, attr: props.attr })));
};
exports.TimeField.defaultProps = {
    name: undefined,
    label: undefined,
    onChange: undefined,
    showSeconds: false,
    militaryTime: false,
    disabled: false,
    localTimezone: true,
    amLabel: 'AM',
    pmLabel: 'PM',
    attr: {
        fieldContainer: {},
        fieldLabel: {},
        fieldContent: {},
        fieldError: {},
        container: {},
        hourSelect: {},
        hourOption: {},
        minuteSelect: {},
        minuteOption: {},
        secondSelect: {},
        secondOption: {},
        periodSelect: {},
        periodOption: {},
    }
};
exports.default = exports.TimeField;

//# sourceMappingURL=TimeField.js.map
