import * as React from 'react';
import * as classNames from 'classnames/bind';
import {DivProps, SpanProps, Elements as Attr} from '../../Attributes';
import {MethodNode, hasClassName} from '../../Common';
const css = classNames.bind(require('./Dropdown.scss'));

export interface DropdownType {}

export enum DropdownPosition {
    Top = 1,
    Bottom,
    Left,
    Right
}

export enum DropdownAlignment {
    Start = 1,
    Center,
    End
}

export interface DropdownAttributes {
    container?: SpanProps;
    dropdownContainer?: DivProps;
    dropdown?: SpanProps;
}

export interface DropdownProps extends React.Props<DropdownType> {
    /** Contents of dropdown */
    dropdown: MethodNode;

    /**
     * Keeps dropdown open if the user hovers over it
     */
    interactive?: boolean;

    positionClassNames?: string[];

    /** Classname to append to top level element */
    className?: string;
    /** Shows the dropdown */
    visible?: boolean;

    attr?: DropdownAttributes;
}

export interface DropdownState {
    hovered?: boolean;
    positionIndex?: number;
}

const compareClientRect = (first: ClientRect, second: ClientRect): boolean => {
    return (
        first && second &&
        first.left === second.left &&
        first.right === second.right &&
        first.top === second.top &&
        first.bottom === second.bottom
    );
};

/**
 * SimpleDropdown shows tooltip (with HTML) on hover over child
 * 
 * NOTE: If a parent element of this control is `overflow: hidden` then the
 * balloon may not show up.
 * 
 * @param props Control properties (defined in `SimpleDropdownProps` interface)
 */
export class Dropdown extends React.Component<DropdownProps, DropdownState> {
    static defaultProps = {
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

    private dropdown: HTMLSpanElement;
    private container: HTMLSpanElement;
    private fixedContainer: HTMLDivElement;

    private dropdownOffset: {top: number, left: number, width: number, height: number};
    private previousPosition: ClientRect;

    private needsUpdate: boolean;
    private eventsConnected: boolean;
    private hoverClose: boolean;
    private positionFailed: boolean;

    private mouseX: number;
    private mouseY: number;

    constructor(props: DropdownProps) {
        super(props);

        this.needsUpdate = true;
        this.eventsConnected = false;
        this.hoverClose = false;

        this.state = {
            hovered: false,
            positionIndex: (
                this.props.positionClassNames
                && this.props.positionClassNames.length > 0
            ) ? 0 : null
        };
    }

    dropdownRef = (element) => this.dropdown = element ? element : this.dropdown;
    containerRef = (element) => this.container = element ? element : this.container;

    componentWillReceiveProps() {
        this.setState({positionIndex: (
            this.props.positionClassNames
            && this.props.positionClassNames.length > 0
        ) ? 0 : null});
        this.positionFailed = false;
    }

    componentWillUpdate() {
        if (this.dropdown.parentElement === this.fixedContainer) {
            this.container.appendChild(this.dropdown);
            const container = this.container.getBoundingClientRect();
            const dropdown = this.dropdown.getBoundingClientRect();
            this.dropdownOffset = {
                left: dropdown.left - container.left,
                top: dropdown.top - container.top,
                width: dropdown.width,
                height: dropdown.height
            };
        }
    }

    componentDidMount() {
        this.repositionDropdown();
    }

    componentDidUpdate(oldProps: DropdownProps, oldState: DropdownState) {
        this.hoverClose = false;
        this.repositionDropdown();
    }

    componentWillUnmount() {
        this.fixedContainer.parentElement.removeChild(this.fixedContainer);
    }

    onChange = (event) => {
        if (!this.needsUpdate) {
            this.needsUpdate = true;
            window.requestAnimationFrame(() => {
                this.needsUpdate = false;
                if (this.state.hovered || this.props.visible) {
                    this.repositionDropdown();
                }
            });
        }
    }

    onMouseEnter = () => {
        this.setState({hovered: true});
    }
    
    onMouseLeave = () => {
        this.setState({hovered: false});
    }

    onMouseMove = (event) => {
        this.mouseX = event.clientX;
        this.mouseY = event.clientY;
    }

    updateEventHandlers() {
        if ((this.state.hovered || this.props.visible) && !this.eventsConnected) {
            window.addEventListener('resize', this.onChange);
            window.addEventListener('scroll', this.onChange);
            window.addEventListener('mousemove', this.onMouseMove);
            this.eventsConnected = true;
            this.needsUpdate = false;
        } else if (!this.state.hovered && !this.props.visible && this.eventsConnected) {
            window.removeEventListener('resize', this.onChange);
            window.removeEventListener('scroll', this.onChange);
            window.removeEventListener('mousemove', this.onMouseMove);
            this.needsUpdate = true;
            this.eventsConnected = false;
        }
    }

    repositionDropdown() {
        this.updateEventHandlers();
        if (!this.state.hovered && !this.props.visible) {
            return;
        }
        if (!this.container || !this.dropdown) {
            return;
        }

        if (!this.positionFailed && this.props.positionClassNames && this.props.positionClassNames.length > 0) {
            const dropdown = this.dropdown.getBoundingClientRect();
            const body = document.body.getBoundingClientRect();
            if (
                dropdown.top < 0 ||
                dropdown.bottom > body.bottom ||
                dropdown.left < 0 ||
                dropdown.right > body.right
            ) {
                if (typeof(this.state.positionIndex) === 'number') {
                    if (this.state.positionIndex < this.props.positionClassNames.length) {
                        this.setState({positionIndex: this.state.positionIndex + 1});
                    } else {
                        this.positionFailed = true;
                    }
                } else {
                    this.setState({positionIndex: 0});
                }
                return;
            }
        }

        if (!this.fixedContainer) {
            this.fixedContainer = document.body.appendChild(document.createElement('div'));
            this.fixedContainer.className = css('md-dropdown-container');
        }

        const container = this.container.getBoundingClientRect();
        const positioned = this.dropdown.parentElement === this.fixedContainer;
        if (!positioned && !this.hoverClose) {
            const container = this.container.getBoundingClientRect();
            const dropdown = this.dropdown.getBoundingClientRect();
            this.dropdownOffset = {
                left: dropdown.left - container.left,
                top: dropdown.top - container.top,
                width: dropdown.width,
                height: dropdown.height
            };
            
            this.fixedContainer.appendChild(this.dropdown);
        }
        if (!compareClientRect(container, this.previousPosition)) {
            this.fixedContainer.style.left = `${container.left + this.dropdownOffset.left}px`;
            this.fixedContainer.style.top = `${container.top + this.dropdownOffset.top}px`;
            this.fixedContainer.style.width = `${this.dropdownOffset.width}px`;
            this.fixedContainer.style.height = `${this.dropdownOffset.height}px`;
            this.previousPosition = container;
        }
        if (this.state.hovered) {
            const dropdown = this.fixedContainer.getBoundingClientRect();
            if (!(
                this.mouseX >= dropdown.left &&
                this.mouseX <= dropdown.right &&
                this.mouseY >= dropdown.top &&
                this.mouseY <= dropdown.bottom
            )) {
                this.container.appendChild(this.dropdown);
                this.hoverClose = true;
                this.setState({hovered: false});
            }
        }
    }

    render() {
        const isInteractive = this.props.interactive && this.props.visible;
        const positionClassName = typeof(this.state.positionIndex) === 'number'
            ? (this.props.positionClassNames[
                this.positionFailed
                    ? 0
                    : this.state.positionIndex
            ]) : '';
        return (
            <Attr.span
                className={css('dropdown-container', this.props.className)}
                attr={this.props.attr.container}
                methodRef={this.containerRef}
            >
                {this.props.children}
                <Attr.span
                    className={css('md-dropdown', positionClassName, {'interactive': isInteractive})}
                    onMouseEnter={isInteractive ? this.onMouseEnter : null}
                    onMouseLeave={isInteractive ? this.onMouseLeave : null}
                    attr={this.props.attr.dropdown}
                    methodRef={this.dropdownRef}
                >
                    {this.props.dropdown}
                </Attr.span>
            </Attr.span>
        );
    }
}

export default Dropdown;
