"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const classNames = require("classnames/bind");
const Attributes_1 = require("../../Attributes");
const css = classNames.bind(require('./Dropdown.scss'));
var DropdownPosition;
(function (DropdownPosition) {
    DropdownPosition[DropdownPosition["Top"] = 1] = "Top";
    DropdownPosition[DropdownPosition["Bottom"] = 2] = "Bottom";
    DropdownPosition[DropdownPosition["Left"] = 3] = "Left";
    DropdownPosition[DropdownPosition["Right"] = 4] = "Right";
})(DropdownPosition = exports.DropdownPosition || (exports.DropdownPosition = {}));
var DropdownAlignment;
(function (DropdownAlignment) {
    DropdownAlignment[DropdownAlignment["Start"] = 1] = "Start";
    DropdownAlignment[DropdownAlignment["Center"] = 2] = "Center";
    DropdownAlignment[DropdownAlignment["End"] = 3] = "End";
})(DropdownAlignment = exports.DropdownAlignment || (exports.DropdownAlignment = {}));
const compareClientRect = (first, second) => {
    return (first && second &&
        first.left === second.left &&
        first.right === second.right &&
        first.top === second.top &&
        first.bottom === second.bottom);
};
/**
 * SimpleDropdown shows tooltip (with HTML) on hover over child
 *
 * NOTE: If a parent element of this control is `overflow: hidden` then the
 * balloon may not show up.
 *
 * @param props Control properties (defined in `SimpleDropdownProps` interface)
 */
class Dropdown extends React.Component {
    constructor(props) {
        super(props);
        this.dropdownRef = (element) => this.dropdown = element ? element : this.dropdown;
        this.containerRef = (element) => this.container = element ? element : this.container;
        this.fixedRef = (element) => this.fixedContainer = element ? element : this.fixedContainer;
        this.onChange = (event) => {
            if (!this.animationRequest) {
                this.animationRequest = requestAnimationFrame(() => {
                    this.animationRequest = null;
                    this.positionReset = true;
                    this.positionFailed = false;
                    this.repositionDropdown();
                });
            }
        };
        this.handleOuterEvent = (event) => {
            if (event.target === this.fixedContainer || event.target === this.container) {
                return;
            }
            if (!this.props.visible) {
                return;
            }
            if (this.props.onOuterEvent && !this.interactsWithDropdown(event, 9)) {
                this.props.onOuterEvent(event);
            }
        };
        this.animationRequest = null;
        this.eventsConnected = false;
        this.positionReset = false;
        this.state = {
            positionIndex: this.getPositionIndex()
        };
    }
    getPositionIndex() {
        return (this.props.positionClassNames
            && this.props.positionClassNames.length > 0) ? 0 : null;
    }
    componentWillReceiveProps() {
        this.setState({
            positionIndex: this.getPositionIndex()
        });
        this.positionFailed = false;
    }
    componentWillUpdate() {
        this.saveScrollOffset();
        if (this.dropdown.parentElement === this.fixedContainer) {
            this.container.appendChild(this.dropdown);
            this.dropdownOffset = this.getDropdownOffset();
        }
        if (this.fixedContainer.parentElement === document.body) {
            this.container.appendChild(this.fixedContainer);
        }
    }
    componentDidMount() {
        this.unmounting = false;
        this.repositionDropdown();
    }
    componentDidUpdate(oldProps, oldState) {
        this.repositionDropdown();
        if (!this.fixedContainer) {
            return;
        }
        if (this.props.visible) {
            this.loadScrollOffset();
            if (this.props.onMouseEnter || this.props.onMouseLeave) {
                this.fixedContainer.className = css('md-dropdown-container', 'interactive');
            }
        }
        else {
            this.scrollOffset = null;
            if (this.props.onMouseEnter || this.props.onMouseLeave) {
                this.fixedContainer.className = css('md-dropdown-container');
            }
        }
    }
    componentWillUnmount() {
        this.unmounting = true;
        if (this.fixedContainer) {
            this.fixedContainer.parentElement.removeChild(this.fixedContainer);
        }
    }
    saveScrollOffset() {
        if (this.dropdown) {
            this.scrollOffset = {
                top: this.dropdown.scrollTop,
                left: this.dropdown.scrollLeft,
            };
        }
    }
    loadScrollOffset() {
        if (this.dropdown && this.scrollOffset) {
            this.dropdown.scrollTop = this.scrollOffset.top;
            this.dropdown.scrollLeft = this.scrollOffset.left;
        }
    }
    interactsWithDropdown(event, depth) {
        let target = event.target;
        /**
         * Go back several levels to check whether the user is clicking in the
         * dropdown
        */
        depth = depth || 6;
        for (let i = 0; i < depth; i++) {
            if (target === this.fixedContainer || target === this.container) {
                break;
            }
            if (target.parentElement) {
                target = i < (depth - 1) ? target.parentElement : null;
                continue;
            }
            else {
                target = null;
                break;
            }
        }
        return !!target;
    }
    /**
     * Get the dimensions and position of the dropdown element while it is
     * still in the DOM rendered by this component. This information is used
     * to position the dropdown when it is moved to the `display: fixed` element.
     *
     * The position is relative to the top-left corner of the container element,
     * calculated based on both elements' position relative to the user's window.
     */
    getDropdownOffset() {
        const container = this.container.getBoundingClientRect();
        const dropdown = this.dropdown.getBoundingClientRect();
        return {
            top: dropdown.top - container.top,
            left: dropdown.left - container.left,
            width: dropdown.width,
            height: dropdown.height
        };
    }
    updateEventHandlers() {
        if ((this.props.visible) && !this.eventsConnected) {
            document.addEventListener('resize', this.onChange, true);
            document.addEventListener('scroll', this.onChange, true);
            if (this.props.outerEvents) {
                this.props.outerEvents.forEach(event => window.addEventListener(event, this.handleOuterEvent));
            }
            this.eventsConnected = true;
            this.animationRequest = null;
        }
        else if (!this.props.visible && this.eventsConnected) {
            document.removeEventListener('resize', this.onChange, true);
            document.removeEventListener('scroll', this.onChange, true);
            if (this.props.outerEvents) {
                this.props.outerEvents.forEach(event => window.removeEventListener(event, this.handleOuterEvent));
            }
            this.animationRequest = 1;
            this.eventsConnected = false;
        }
    }
    repositionDropdown() {
        this.updateEventHandlers();
        if (!this.props.visible || this.unmounting) {
            return;
        }
        if (!this.container || !this.dropdown || !this.fixedContainer) {
            return;
        }
        if (this.fixedContainer && this.fixedContainer.parentElement !== document.body) {
            document.body.appendChild(this.fixedContainer);
        }
        if (!this.positionFailed && this.props.positionClassNames && this.props.positionClassNames.length > 0) {
            const dropdown = this.dropdown.getBoundingClientRect();
            if (dropdown.top < 0 ||
                dropdown.bottom > window.innerHeight ||
                dropdown.left < 0 ||
                dropdown.right > window.innerWidth) {
                if (typeof (this.state.positionIndex) === 'number') {
                    if (this.positionReset) {
                        this.setState({ positionIndex: 0 });
                        this.positionReset = false;
                    }
                    else if (this.state.positionIndex < this.props.positionClassNames.length) {
                        this.setState({ positionIndex: this.state.positionIndex + 1 });
                    }
                    else {
                        this.positionFailed = true;
                        this.setState({ positionIndex: 0 });
                    }
                }
                else {
                    this.setState({ positionIndex: 0 });
                }
                /** If all possible positions fail, show it anyway */
                if (!this.positionFailed) {
                    return;
                }
            }
        }
        this.fixedContainer.className = css('md-dropdown-container', {
            'interactive': this.props.onMouseEnter || this.props.onMouseLeave,
        }, (this.props.attr.dropdownContainer || { className: '' }).className);
        const container = this.container.getBoundingClientRect();
        const positioned = this.dropdown.parentElement === this.fixedContainer;
        if (!positioned) {
            this.dropdownOffset = this.getDropdownOffset();
            this.fixedContainer.appendChild(this.dropdown);
        }
        if (!compareClientRect(container, this.previousPosition)) {
            this.fixedContainer.style.left = `${container.left + this.dropdownOffset.left}px`;
            this.fixedContainer.style.top = `${container.top + this.dropdownOffset.top}px`;
            this.fixedContainer.style.width = `${this.dropdownOffset.width}px`;
            this.fixedContainer.style.height = `${this.dropdownOffset.height}px`;
            this.previousPosition = container;
        }
    }
    render() {
        const positionClassName = this.props.positionClassNames.length > 0
            ? (this.props.positionClassNames[this.positionFailed ? 0 : this.state.positionIndex]) : '';
        return (React.createElement(Attributes_1.Elements.span, { className: css('dropdown-container', this.props.className, {
                'interactive': this.props.visible
                    && (this.props.onMouseEnter || this.props.onMouseLeave)
            }), methodRef: this.containerRef, onMouseEnter: this.props.onMouseEnter, onMouseLeave: this.props.onMouseLeave, attr: this.props.attr.container },
            this.props.children,
            React.createElement(Attributes_1.Elements.span, { className: css('md-dropdown', positionClassName, {
                    'interactive': this.props.visible
                        && (this.props.onMouseEnter || this.props.onMouseLeave)
                }), attr: this.props.attr.dropdown, methodRef: this.dropdownRef }, this.props.dropdown),
            React.createElement(Attributes_1.Elements.div, { className: css('md-dropdown-container'), methodRef: this.fixedRef, attr: this.props.attr.dropdownContainer })));
    }
}
Dropdown.defaultProps = {
    tooltip: undefined,
    position: DropdownPosition.Top,
    align: DropdownAlignment.Center,
    visible: false,
    positionClassNames: [],
    attr: {
        container: {},
        dropdownContainer: {},
        dropdown: {},
    }
};
exports.Dropdown = Dropdown;
exports.default = Dropdown;

//# sourceMappingURL=Dropdown.js.map
