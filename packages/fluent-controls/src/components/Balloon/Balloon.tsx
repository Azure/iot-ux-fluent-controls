import * as React from 'react';
import * as classNames from 'classnames/bind';
import {DivProps, SpanProps, Elements as Attr} from '../../Attributes';
import {MethodNode} from '../../Common';
const css = classNames.bind(require('./Balloon.scss'));

export interface BalloonType {}

export enum BalloonPosition {
    Top = 1,
    Bottom,
    Left,
    Right
}

export enum BalloonAlignment {
    Start = 1,
    Center,
    End
}

export interface BalloonAttributes {
    container?: SpanProps;
    balloonContainer?: DivProps;
    balloon?: SpanProps;
}

export interface BalloonProps extends React.Props<BalloonType> {
    /** Contents of balloon */
    tooltip: MethodNode;

    /**
     * Where to display Balloon relative to child element
     * 
     * `BalloonPosition.[Top | Bottom | Left | Right]`
     * 
     * Default: BalloonPosition.Top
     */
    position?: BalloonPosition;
    /**
     * Alignment of Balloon relative to child
     * 
     * `BalloonAlignment.[Start | Center | End]`
     * 
     * Default: BalloonAllignment.Center
     */
    align?: BalloonAlignment;
    /** Allow Balloon to be multiple lines */
    multiline?: boolean;

    /** Classname to append to top level element */
    className?: string;
    /** Classname to append to inner balloon element */
    balloonClassName?: string;
    /** Forces the balloon to be expanded */
    expanded?: boolean;

    attr?: BalloonAttributes;
}

export interface BalloonState {
    hovered?: boolean;
    visible?: boolean;
    position?: BalloonPosition;
    align?: BalloonAlignment;
}

const hasOverflow = (element: HTMLElement, direction: 'x' | 'y' = 'x'): boolean => {
    const style = window.getComputedStyle(element);
    const overflow = style.getPropertyValue(`overflow-${direction}`);
    if (overflow === 'hidden' || overflow === 'scroll') {
        return true;
    }
    if (overflow === 'auto') {
        return true;
        // const inner = direction === 'x' ? element.clientWidth : element.clientHeight;
        // const outer = direction === 'x' ? element.scrollWidth : element.scrollWidth;

        // return outer > inner;
    }
    return false;
};

const fitsXContainer = (inner: ClientRect, outer: ClientRect): boolean => {
    return inner.left >= outer.left && inner.right <= outer.right;    
};

const fitsYContainer = (inner: ClientRect, outer: ClientRect): boolean => {
    return inner.top >= outer.top && inner.bottom <= outer.bottom;    
};

const fitsContainer = (inner: ClientRect, outer: ClientRect): boolean => {
    return fitsXContainer(inner, outer) && fitsYContainer(inner, outer);
};

const atTopOf = (inner, outer) => {
    return inner.top <= outer.top && inner.bottom >= outer.top;
};

const atBottomOf = (inner, outer) => {
    return inner.top <= outer.bottom && inner.bottom >= outer.bottom;
};

const atLeftOf = (inner, outer) => {
    return inner.left <= outer.left && inner.right >= outer.left;
};

const atRightOf = (inner, outer) => {
    return inner.left <= outer.right && inner.right >= outer.right;
};

const mirrorX = (balloon: ClientRect, container: ClientRect): ClientRect => {
    return {
        bottom: balloon.bottom,
        height: balloon.height,
        left: container.left - (balloon.right - container.right),
        right: container.right + (container.left - balloon.left),
        top: balloon.top,
        width: balloon.width,
    };
};

const mirrorY = (balloon: ClientRect, container: ClientRect): ClientRect => {
    return {
        bottom: container.bottom + (container.top - balloon.top),
        height: balloon.height,
        left: balloon.left,
        right: balloon.right,
        top: container.top - (balloon.bottom - container.bottom),
        width: balloon.width,
    };
};

/**
 * SimpleBalloon shows tooltip (with HTML) on hover over child
 * 
 * NOTE: If a parent element of this control is `overflow: hidden` then the
 * balloon may not show up.
 * 
 * @param props Control properties (defined in `SimpleBalloonProps` interface)
 */
export class Balloon extends React.Component<BalloonProps, BalloonState> {
    static defaultProps = {
        tooltip: undefined,
        position: BalloonPosition.Top,
        align: BalloonAlignment.Center,
        expanded: false,
        multiline: true,
        attr: {
            container: {},
            balloonContainer: {},
            balloon: {},
        }
    };

    private balloonRef: HTMLSpanElement;
    private containerRef: HTMLSpanElement;
    private overflowXParent: HTMLElement;
    private overflowYParent: HTMLElement;
    private viewportError: boolean;

    constructor(props: BalloonProps) {
        super(props);

        this.state = {
            hovered: false,
            visible: this.props.expanded,
            position: this.props.position,
            align: this.props.align
        };

        this.viewportError = false;
    }

    componentWillReceiveProps(newProps: BalloonProps) {
        const posUpdated = this.props.position !== newProps.position;
        const alignUpdated = this.props.align !== newProps.align;
        if (this.props.expanded !== newProps.expanded || posUpdated || alignUpdated) {
            this.setState({
                visible: this.state.hovered || newProps.expanded,
                position: posUpdated ? newProps.position : this.state.position,
                align: alignUpdated ? newProps.align : this.state.align
            });
        }
    }

    shouldComponentUpdate(newProps: BalloonProps, newState: BalloonState): boolean {
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

    componentDidMount() {
        let node: HTMLElement = this.containerRef;
        do {
            node = node.parentElement;
        } while (node && !hasOverflow(node, 'x'));
        this.overflowXParent = node || document.body;

        node = this.containerRef;
        do {
            node = node.parentElement;
        } while (node && !hasOverflow(node, 'y'));
        this.overflowYParent = node || document.body;
    }

    fitBounds(bounds: ClientRect): {position: BalloonPosition, align: BalloonAlignment} | false {

        return false;
    }

    componentDidUpdate(oldProps: BalloonProps, oldState: BalloonState) {
        if (!this.state.visible || this.viewportError) {
            return;
        }

        const self = this.balloonRef.getBoundingClientRect();
        const xRect = this.overflowXParent.getBoundingClientRect();
        const yRect = this.overflowYParent.getBoundingClientRect();
        const bounds = {
            top: yRect.top,
            bottom: yRect.bottom,
            left: yRect.left,
            right: yRect.right,
            height: yRect.top - yRect.bottom,
            width: xRect.left - xRect.right
        };
        const newBounds = this.fitBounds(bounds);
        if (newBounds) {
            this.setState({position: newBounds.position, align: newBounds.align});
        } else {
            const newBounds = this.fitBounds(document.body.getBoundingClientRect());
            if (newBounds) {
                
            } else {
                this.viewportError = true;
            }
        }


        console.log(this.balloonRef.getBoundingClientRect());
    }

    onMouseEnter = (event) => {
        this.setState({
            hovered: true,
            visible: true
        });
    }

    onMouseLeave = (event) => {
        this.setState({
            hovered: false,
            visible: this.props.expanded
        });
    }

    render() {
        let position;
        switch (this.state.position) {
            case BalloonPosition.Bottom:
                position = 'bottom';
                break;
            case BalloonPosition.Left:
                position = 'left';
                break;
            case BalloonPosition.Right:
                position = 'right';
                break;
            default:
                position = 'top';
        }
        let align;
        switch (this.state.align) {
            case BalloonAlignment.Start:
                align = 'start';
                break;
            case BalloonAlignment.End:
                align = 'end';
                break;
            default:
                align = 'center';
        }
        const balloonClassName = css('balloon', `${position}-${align}`, this.props.balloonClassName);
        const innerClassName = css('inner-container', {'multiline': this.props.multiline});
        const containerClassName = css('balloon-container', this.props.className, { 'is-expanded': this.state.visible });
    
        return (
            <Attr.span
                className={containerClassName}
                attr={this.props.attr.container}
                onMouseEnter={this.onMouseEnter}
                onMouseLeave={this.onMouseLeave}
                methodRef={(element) => this.containerRef = element}
            >
                {this.props.children}
                <Attr.span
                    className={balloonClassName}
                    attr={this.props.attr.balloonContainer}
                    methodRef={(element) => this.balloonRef = element}
                >
                    <Attr.div
                        className={innerClassName}
                        attr={this.props.attr.balloon}
                    >
                        {this.props.tooltip}
                    </Attr.div>
                </Attr.span>
            </Attr.span>
        );
    }
};

export default Balloon;
