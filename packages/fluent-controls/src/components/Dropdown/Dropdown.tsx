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
     * Fit dropdown to the width of props.children
     */
    containerWidth?: boolean;

    /** Classname to append to top level element */
    className?: string;
    /** Shows the dropdown */
    visible?: boolean;

    attr?: DropdownAttributes;
}

export interface DropdownState {
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
        attr: {
            container: {},
            balloonContainer: {},
            balloon: {},
        }
    };

    private dropdown: HTMLSpanElement;
    private container: HTMLSpanElement;
    private inner: HTMLSpanElement;
    private fixedContainer: HTMLDivElement;

    private dropdownRect: {top: number, left: number, width: number, height: number};
    private previousPosition: ClientRect;

    private needsUpdate: boolean;
    private eventsConnected: boolean;

    constructor(props: DropdownProps) {
        super(props);

        this.needsUpdate = true;
        this.eventsConnected = false;
    }

    dropdownRef = (element) => this.dropdown = element ? element : this.dropdown;
    containerRef = (element) => this.container = element ? element : this.container;
    innerRef = (element) => this.inner = element ? element : this.inner;

    componentWillUpdate() {
        if (this.dropdown.parentElement === this.fixedContainer) {
            this.inner.appendChild(this.dropdown);
            const container = this.container.getBoundingClientRect();
            const dropdown = this.dropdown.getBoundingClientRect();
            this.dropdownRect = {
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
                if (this.props.visible) {
                    this.repositionDropdown();
                }
            });
        }
    }

    updateEventHandlers() {
        if (this.props.visible && !this.eventsConnected) {
            window.addEventListener('resize', this.onChange);
            window.addEventListener('scroll', this.onChange);
            this.eventsConnected = true;
            this.needsUpdate = false;
        } else if (!this.props.visible && this.eventsConnected) {
            window.removeEventListener('resize', this.onChange);
            window.removeEventListener('scroll', this.onChange);
            this.needsUpdate = true;
            this.eventsConnected = false;
        }
    }

    repositionDropdown() {
        this.updateEventHandlers();
        if (!this.props.visible) {
            return;
        }
        if (!this.container || !this.inner || !this.dropdown) {
            return;
        }

        if (!this.fixedContainer) {
            this.fixedContainer = document.body.appendChild(document.createElement('div'));
            this.fixedContainer.className = css('fixed-dropdown');
        }

        const container = this.container.getBoundingClientRect();
        const positioned = this.dropdown.parentElement === this.fixedContainer;
        if (!positioned) {
            const container = this.container.getBoundingClientRect();
            const dropdown = this.dropdown.getBoundingClientRect();
            this.dropdownRect = {
                left: dropdown.left - container.left,
                top: dropdown.top - container.top,
                width: dropdown.width,
                height: dropdown.height
            };
            
            this.fixedContainer.appendChild(this.dropdown);
        }
        if (!compareClientRect(container, this.previousPosition)) {
            this.fixedContainer.style.left = `${container.left + this.dropdownRect.left}px`;
            this.fixedContainer.style.top = `${container.top + this.dropdownRect.top}px`;
            this.fixedContainer.style.width = `${this.props.containerWidth
                ? container.width
                : this.dropdownRect.width}px`;
            this.fixedContainer.style.height = `${this.dropdownRect.height}px`;
            this.previousPosition = container;
        }
    }

    render() {
        const dropdownClassName = css('dropdown');
        const innerClassName = css('inner-container');
        const containerClassName = css('dropdown-container', this.props.className);
    
        return (
            <Attr.span
                className={containerClassName}
                attr={this.props.attr.container}
                methodRef={this.containerRef}
            >
                <Attr.span
                    methodRef={this.innerRef}
                >
                    {this.props.children}
                </Attr.span>
                <Attr.span
                    className={dropdownClassName}
                    attr={this.props.attr.dropdownContainer}
                    methodRef={this.dropdownRef}
                >
                    <Attr.div
                        className={innerClassName}
                        attr={this.props.attr.dropdown}
                    >
                        {this.props.dropdown}
                    </Attr.div>
                </Attr.span>
            </Attr.span>
        );
    }
}

export default Dropdown;
