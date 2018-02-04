"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const classNames = require("classnames/bind");
const Attributes_1 = require("../../Attributes");
const Dropdown_1 = require("../Dropdown");
const css = classNames.bind(require('./Balloon.scss'));
var BalloonPosition;
(function (BalloonPosition) {
    BalloonPosition[BalloonPosition["Top"] = 1] = "Top";
    BalloonPosition[BalloonPosition["Bottom"] = 2] = "Bottom";
    BalloonPosition[BalloonPosition["Left"] = 3] = "Left";
    BalloonPosition[BalloonPosition["Right"] = 4] = "Right";
})(BalloonPosition = exports.BalloonPosition || (exports.BalloonPosition = {}));
var BalloonAlignment;
(function (BalloonAlignment) {
    BalloonAlignment[BalloonAlignment["Start"] = 1] = "Start";
    BalloonAlignment[BalloonAlignment["Center"] = 2] = "Center";
    BalloonAlignment[BalloonAlignment["End"] = 3] = "End";
})(BalloonAlignment = exports.BalloonAlignment || (exports.BalloonAlignment = {}));
const compareClientRect = (first, second) => {
    return (first.left === second.left &&
        first.right === second.right &&
        first.top === second.top &&
        first.bottom === second.bottom);
};
/**
 * SimpleBalloon shows tooltip (with HTML) on hover over child
 *
 * NOTE: If a parent element of this control is `overflow: hidden` then the
 * balloon may not show up.
 *
 * @param props Control properties (defined in `SimpleBalloonProps` interface)
 */
class Balloon extends React.Component {
    constructor(props) {
        super(props);
        this.onMouseEnter = (event) => {
            this.setState({
                hovered: true,
                visible: true
            });
        };
        this.onMouseLeave = (event) => {
            this.setState({
                hovered: false,
                visible: this.props.expanded
            });
        };
        this.state = {
            hovered: false,
            visible: this.props.expanded,
            position: this.props.position,
            align: this.props.align
        };
    }
    componentWillReceiveProps(newProps) {
        this.setState({
            visible: this.state.hovered || newProps.expanded,
            position: newProps.position,
            align: newProps.align
        });
    }
    shouldComponentUpdate(newProps, newState) {
        if (newProps !== this.props) {
            return true;
        }
        if (this.state.visible !== newState.visible) {
            return true;
        }
        if (this.state.position !== newState.position || this.state.align !== newState.align) {
            return true;
        }
        return false;
    }
    getClassName(reverse) {
        let position, reversePosition;
        switch (this.props.position) {
            case BalloonPosition.Bottom:
                position = 'bottom';
                reversePosition = 'top';
                break;
            case BalloonPosition.Left:
                position = 'left';
                reversePosition = 'right';
                break;
            case BalloonPosition.Right:
                position = 'right';
                reversePosition = 'left';
                break;
            default:
                position = 'top';
                reversePosition = 'bottom';
        }
        let align;
        switch (this.props.align) {
            case BalloonAlignment.Start:
                align = 'start';
                break;
            case BalloonAlignment.End:
                align = 'end';
                break;
            default:
                align = 'center';
        }
        return css(`${reverse ? reversePosition : position}-${align}`);
    }
    render() {
        let { balloonClassName, autoPosition, multiline, className } = this.props;
        balloonClassName = css('balloon-dropdown', this.getClassName(false), balloonClassName);
        className = css('balloon-container', className);
        const innerClassName = css('balloon-inner-container', { multiline });
        const positions = [this.getClassName(false), this.getClassName(true)];
        return (React.createElement(Dropdown_1.Dropdown, { dropdown: React.createElement("span", { className: innerClassName }, this.props.tooltip), visible: this.state.visible, className: className, positionClassNames: this.props.autoPosition ? positions : [], onMouseEnter: this.onMouseEnter, onMouseLeave: this.onMouseLeave, attr: {
                container: this.props.attr.container,
                dropdownContainer: this.props.attr.balloonContainer,
                dropdown: Attributes_1.mergeAttributes(this.props.attr.balloon, { className: balloonClassName })
            } }, this.props.children));
    }
}
Balloon.defaultProps = {
    tooltip: undefined,
    position: BalloonPosition.Top,
    align: BalloonAlignment.Center,
    expanded: false,
    multiline: true,
    autoPosition: true,
    attr: {
        container: {},
        balloonContainer: {},
        balloon: {},
    }
};
exports.Balloon = Balloon;
exports.default = Balloon;

//# sourceMappingURL=Balloon.js.map
