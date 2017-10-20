import * as React from 'react';
import * as classNames from 'classnames/bind';
import {DivProps, SpanProps, Elements as Attr} from '../../Attributes';
import {Dropdown} from '../Dropdown';
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

const compareClientRect = (first: ClientRect, second: ClientRect): boolean => {
    return (
        first.left === second.left &&
        first.right === second.right &&
        first.top === second.top &&
        first.bottom === second.bottom
    );
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
    private fixedBalloon: HTMLSpanElement;

    private balloonRect: {top: number, left: number, width: number, height: number};
    private previousPosition: ClientRect;

    private needsUpdate: boolean;
    private eventsConnected: boolean;

    constructor(props: BalloonProps) {
        super(props);

        this.state = {
            hovered: false,
            visible: this.props.expanded,
            position: this.props.position,
            align: this.props.align
        };

        this.fixedBalloon = null;
        this.needsUpdate = false;
        this.eventsConnected = false;
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
        switch (this.props.position) {
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
        const balloonClassName = css('balloon', `${position}-${align}`, this.props.balloonClassName);
        const innerClassName = css('inner-container', {'multiline': this.props.multiline});
        const containerClassName = css('balloon-container', this.props.className);

        return (
            <Dropdown
                dropdown={<span className={innerClassName}>{this.props.tooltip}</span>}
                visible={this.state.visible}
                attr={{
                    dropdownContainer: {className: containerClassName},
                    dropdown: {className: balloonClassName}
                }}
            >
                <Attr.span
                    onClick={e => this.setState({visible: !this.state.visible})}
                >
                    {this.props.children}
                </Attr.span>
            </Dropdown>
        );
    
        // return (
        //     <Attr.span
        //         className={containerClassName}
        //         attr={this.props.attr.container}
        //         onMouseEnter={this.onMouseEnter}
        //         onMouseLeave={this.onMouseLeave}
        //         methodRef={(element) => this.containerRef = element}
        //     >
        //         {this.props.children}
        //         <Attr.span
        //             className={balloonClassName}
        //             attr={this.props.attr.balloonContainer}
        //             methodRef={(element) => this.balloonRef = element}
        //         >
        //             <Attr.div
        //                 className={innerClassName}
        //                 attr={this.props.attr.balloon}
        //             >
        //                 {this.props.tooltip}
        //             </Attr.div>
        //         </Attr.span>
        //     </Attr.span>
        // );
    }
}

export default Balloon;
