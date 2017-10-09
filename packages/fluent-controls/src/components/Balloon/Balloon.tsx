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

/**
 * SimpleBalloon shows tooltip (with HTML) on hover over child
 * 
 * NOTE: If a parent element of this control is `overflow: hidden` then the
 * balloon may not show up.
 * 
 * @param props Control properties (defined in `SimpleBalloonProps` interface)
 */
export const Balloon: React.StatelessComponent<BalloonProps> = (props: BalloonProps) => {
    let position;
    switch (props.position) {
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
    switch (props.align) {
        case BalloonAlignment.Start:
            align = 'start';
            break;
        case BalloonAlignment.End:
            align = 'end';
            break;
        default:
            align = 'center';
    }
    const balloonClassName = css('balloon', `${position}-${align}`, props.balloonClassName);
    const innerClassName = css('inner-container', {'multiline': props.multiline});
    const containerClassName = css('balloon-container', props.className, { 'is-expanded': props.expanded });

    return (
        <Attr.span className={containerClassName} attr={props.attr.container}>
            {props.children}
            <Attr.span className={balloonClassName} attr={props.attr.balloonContainer}>
                <Attr.div className={innerClassName} attr={props.attr.balloon}>
                    {props.tooltip}
                </Attr.div>
            </Attr.span>
        </Attr.span>
    );
};

Balloon.defaultProps = {
    position: BalloonPosition.Top,
    align: BalloonAlignment.Center,
    attr: {
        container: {},
        balloonContainer: {},
        balloon: {},
    }
};

export default Balloon;
