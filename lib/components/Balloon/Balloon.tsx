import * as React from 'react';
import * as classNames from 'classnames/bind';
import {DivProps, SpanProps, mergeAttributes, Elements as Attr} from '../../Attributes';
import {Dropdown} from '../Dropdown';
import {MethodNode} from '../../Common';
const css = classNames.bind(require('./Balloon.module.scss'));

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
    balloonContent?: SpanProps;
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
    /**
     * Allow Balloon contents to span multiple lines
     *
     * default: true
     */
    multiline?: boolean;
    /**
     * Allow balloon to reposition itself if it isn't completely visible
     *
     * default: true
     */
    autoPosition?: boolean;

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
        autoPosition: true,
        attr: {
            container: {},
            balloonContainer: {},
            balloon: {},
        }
    };

    constructor(props: BalloonProps) {
        super(props);

        this.state = {
            hovered: false,
            visible: this.props.expanded,
            position: this.props.position,
            align: this.props.align
        };
    }

    componentWillReceiveProps(newProps: BalloonProps) {
        this.setState({
            visible: this.state.hovered || newProps.expanded,
            position: newProps.position,
            align: newProps.align
        });
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

    getClassName(reverse: boolean): string {
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
        let {
            balloonClassName,
            autoPosition,
            multiline,
            className
        } = this.props;

        balloonClassName = css(
            'balloon-dropdown',
            this.getClassName(false),
            balloonClassName
        );
        className = css('balloon-container', className);
        const innerClassName = css('balloon-inner-container', { multiline });
        const positions = [this.getClassName(false), this.getClassName(true)];
        return (
            <Dropdown
                dropdown={
                    <Attr.span className={innerClassName} attr={this.props.attr.balloonContent}>
                        {this.props.tooltip}
                    </Attr.span>
                }
                visible={this.state.visible}
                className={className}
                positionClassNames={this.props.autoPosition ? positions : []}
                onMouseEnter={this.onMouseEnter}
                onMouseLeave={this.onMouseLeave}
                attr={{
                    container: this.props.attr.container,
                    dropdownContainer: this.props.attr.balloonContainer,
                    dropdown: mergeAttributes(
                        this.props.attr.balloon,
                        {className: balloonClassName}
                    )
                }}
            >
                {this.props.children}
            </Dropdown>
        );
    }
}

export default Balloon;
