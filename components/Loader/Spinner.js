"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const classNames = require("classnames/bind");
const css = classNames.bind(require('./Spinner.scss'));
/**
 * Spinner showing Information, Warning, or Error with text, icon, and optional close button
 *
 * @param props Control properties (defined in `SpinnerProps` interface)
 */
exports.Spinner = (props) => {
    const className = css('cs-loader-inner');
    const containerClassName = css('cs-loader', props.className);
    return (React.createElement("div", { className: containerClassName },
        React.createElement("div", { className: className },
            React.createElement("div", null)),
        React.createElement("div", { className: className },
            React.createElement("div", null)),
        React.createElement("div", { className: className },
            React.createElement("div", null)),
        React.createElement("div", { className: className },
            React.createElement("div", null)),
        React.createElement("div", { className: className },
            React.createElement("div", null)),
        React.createElement("div", { className: className },
            React.createElement("div", null))));
};
exports.default = exports.Spinner;

//# sourceMappingURL=Spinner.js.map
