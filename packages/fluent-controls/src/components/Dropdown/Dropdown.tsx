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
    /** Shows the dropdown */
    visible?: boolean;

    onMouseEnter?: (event) => void;
    onMouseLeave?: (event) => void;

    positionClassNames?: string[];

    /** Classname to append to top level element */
    className?: string;

    attr?: DropdownAttributes;
}

export interface DropdownState {
    positionIndex?: number;
}

export const interactsWithDropdown = (event, dropdown: HTMLElement, depth?: number): boolean => {
    let target = event.target;
    /**
     * Go back several levels to check whether the user is clicking in the
     * dropdown
    */
    depth = depth || 6;
    for (let i = 0; i < depth; i++) {
        if (target === dropdown) {
            break;
        }
        
        if (target.parentElement) {
            target = i < (depth - 1) ? target.parentElement : null;
        
            continue;
        } else {
            target = null;
            break;
        }
    }
    return !!target;
};

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

    private animationRequest: number;
    private eventsConnected: boolean;
    private positionFailed: boolean;
    private positionReset: boolean;

    private mouseX: number;
    private mouseY: number;

    constructor(props: DropdownProps) {
        super(props);

        this.animationRequest = null;
        this.eventsConnected = false;
        this.positionReset = false;

        this.state = {
            positionIndex: (
                this.props.positionClassNames
                && this.props.positionClassNames.length > 0
            ) ? 0 : null
        };
    }

    dropdownRef = (element) => this.dropdown = element ? element : this.dropdown;
    containerRef = (element) => this.container = element ? element : this.container;

    componentWillReceiveProps() {
        const autoPosition = this.props.positionClassNames
            && this.props.positionClassNames.length > 0;

        this.setState({
            positionIndex: autoPosition ? 0 : null
        });
        this.positionFailed = false;
    }

    componentWillUpdate() {
        if (this.dropdown.parentElement === this.fixedContainer) {
            this.container.appendChild(this.dropdown);
            this.dropdownOffset = this.getDropdownOffset();
        }
    }

    componentDidMount() {
        this.repositionDropdown();
    }

    componentDidUpdate(oldProps: DropdownProps, oldState: DropdownState) {
        this.repositionDropdown();
        if (!this.fixedContainer) {
            return;
        }
        if (this.props.visible) {
            if (this.props.onMouseEnter || this.props.onMouseLeave) {
                this.fixedContainer.className = css('md-dropdown-container', 'interactive');
            }
        } else {
            if (this.props.onMouseEnter || this.props.onMouseLeave) {
                this.fixedContainer.className = css('md-dropdown-container');
            }
        }
    }

    componentWillUnmount() {
        if (this.fixedContainer) {
            this.fixedContainer.parentElement.removeChild(this.fixedContainer);
        }
    }

    onChange = (event) => {
        if (!this.animationRequest) {
            this.animationRequest = requestAnimationFrame(() => {
               this.animationRequest = null;
               this.repositionDropdown();
            });
         }
    }

    onMouseMove = (event) => {
        this.mouseX = event.clientX;
        this.mouseY = event.clientY;
    }

    /**
     * Get the dimensions and position of the dropdown element while it is
     * still in the DOM rendered by this component. This information is used
     * to position the dropdown when it is moved to the `display: fixed` element.
     *
     * The position is relative to the top-left corner of the container element,
     * calculated based on both elements' position relative to the user's window.
     */
    getDropdownOffset(): {top: number, left: number, width: number, height: number} {
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
            window.addEventListener('resize', this.onChange);
            window.addEventListener('scroll', this.onChange);
            window.addEventListener('mousemove', this.onMouseMove);
            this.eventsConnected = true;
            this.animationRequest = null;
        } else if (!this.props.visible && this.eventsConnected) {
            window.removeEventListener('resize', this.onChange);
            window.removeEventListener('scroll', this.onChange);
            window.removeEventListener('mousemove', this.onMouseMove);
            this.animationRequest = 1;
            this.eventsConnected = false;
        }
    }

    repositionDropdown() {
        this.updateEventHandlers();
        if (!this.props.visible) {
            return;
        }
        if (!this.container || !this.dropdown) {
            return;
        }

        if (!this.fixedContainer) {
            this.fixedContainer = document.body.appendChild(document.createElement('div'));
            this.fixedContainer.className = css('md-dropdown-container');
        }

        if (!this.positionFailed && this.props.positionClassNames && this.props.positionClassNames.length > 0) {
            const dropdown = this.dropdown.getBoundingClientRect();
            if (
                dropdown.top < 0 ||
                dropdown.bottom > window.innerHeight ||
                dropdown.left < 0 ||
                dropdown.right > window.innerWidth
            ) {
                if (typeof(this.state.positionIndex) === 'number') {
                    if (this.positionReset) {
                        this.setState({positionIndex: 0});
                        this.positionReset = false;
                    } else if (this.state.positionIndex < this.props.positionClassNames.length) {
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

        this.fixedContainer.className = css('md-dropdown-container', {
            'interactive': this.props.onMouseEnter || this.props.onMouseLeave,
        }, (this.props.attr.dropdownContainer || {className: ''}).className);

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
            this.positionReset = true;
        }
    }

    render() {
        const positionClassName = this.props.positionClassNames.length > 0
            ? (this.props.positionClassNames[
                this.positionFailed ? 0 : this.state.positionIndex
            ]) : '';
        return (
            <Attr.span
                className={css('dropdown-container', this.props.className, {
                    'interactive': this.props.visible
                    && (this.props.onMouseEnter || this.props.onMouseLeave)
                })}
                methodRef={this.containerRef}
                onMouseEnter={this.props.onMouseEnter}
                onMouseLeave={this.props.onMouseLeave}
                attr={this.props.attr.container}
            >
                {this.props.children}
                <Attr.span
                    className={css('md-dropdown', positionClassName, {
                        'interactive': this.props.visible
                            && (this.props.onMouseEnter || this.props.onMouseLeave)
                    })}
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
