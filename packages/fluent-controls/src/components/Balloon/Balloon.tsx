import * as React from 'react';
import * as classNames from 'classnames/bind';
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
        <span className={containerClassName}>
            {props.children}
            <span className={balloonClassName}>
                <div className={innerClassName}>
                    {props.tooltip}
                </div>
            </span>
        </span>
    );
};

Balloon.defaultProps = {
    position: BalloonPosition.Top,
    align: BalloonAlignment.Center
};

export default Balloon;
