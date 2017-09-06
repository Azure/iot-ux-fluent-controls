import * as React from 'react';
import * as classNames from 'classnames/bind';
const css = classNames.bind(require('./SimpleBalloon.scss'));

export interface BalloonType {}

export enum BallonPosition {
    Top = 'top',
    Bottom = 'bottom',
    Left = 'left',
    Right = 'right'
}

export enum BalloonAlignment {
    Start = 'start',
    Center = 'center',
    End = 'end'
}

export interface BalloonProps extends React.Props<BalloonType> {
    /** Contents of balloon */
    tooltip: React.ReactNode | React.ReactNode[];

    /**
     * Where to display Balloon relative to child element
     * 
     * `BalloonPosition.[Top | Bottom | Left | Right]`
     * 
     * Default: BalloonPosition.Top
     */
    position?: BallonPosition;
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
}

/**
 * SimpleBalloon shows tooltip (with HTML) on hover over child
 * 
 * NOTE: If the parent element of this control is `overflow: hidden` then the
 * balloon will NOT show up.
 * 
 * @param props Control properties (defined in `SimpleBalloonProps` interface)
 */
export const Balloon = (props: BalloonProps) => {
    const position = props.position || 'top';
    const align = props.align || 'center';
    const balloonClassName = css('balloon', `${position}-${align}`, props.balloonClassName);
    const innerClassName = css('inner-container', {'multiline': props.multiline});
    const containerClassName = css('balloon-container', props.className);

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

export default Balloon;
