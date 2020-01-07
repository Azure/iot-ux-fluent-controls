import * as React from 'react';
import * as classNames from 'classnames/bind';
import {DivProps, SpanProps, mergeAttributes, Elements as Attr} from '../../Attributes';
import {Dropdown, DropdownPosition, DropdownAlignment} from '../Dropdown';
import {MethodNode} from '../../Common';
const css = classNames.bind(require('./Balloon.module.scss'));

export interface BalloonAttributes {
    container?: SpanProps;
    balloonContainer?: DivProps;
    balloon?: SpanProps;
    balloonContent?: SpanProps;
}

export interface BalloonProps {
    /** Contents of balloon */
    tooltip: MethodNode;

    /**
     * Allow Balloon contents to span multiple lines
     *
     * default: true
     */
    multiline?: boolean;

    /** Classname to append to top level element */
    className?: string;
    /** Classname to append to inner balloon element */
    balloonClassName?: string;
    /** Forces the balloon to be expanded */
    expanded?: boolean;

    positionHint?: DropdownPosition;
    alignmentHint?: DropdownAlignment;

    attr?: BalloonAttributes;
    
    /**
     * Element for which the balloon will be position relative to.
     */
    children: React.ReactNode;
}

export interface BalloonState {
    hovered?: boolean;
    visible?: boolean;
}

/**
 * SimpleBalloon shows tooltip (with HTML) on hover over child
 *
 * NOTE: If a parent element of this control is `overflow: hidden` then the
 * balloon may not show up.
 *
 * @param props Control properties (defined in `SimpleBalloonProps` interface)
 */
export const Balloon = React.memo((props: BalloonProps) => {
    const [hovered, setHovered] = React.useState(false);

    const visible = React.useMemo(() => hovered || props.expanded, 
        [hovered, props.expanded]);

    const onMouseEnter = React.useCallback(() => setHovered(true), [setHovered]);
    const onMouseLeave = React.useCallback(() => setHovered(false), [setHovered]);

    const balloonClassName = css('balloon-dropdown', props.balloonClassName);
    const className = css('balloon-container', props.className);
    const innerClassName = css('balloon-inner-container', { multiline: props.multiline ?? true });
    return (
        <Dropdown
            dropdown={
                <Attr.span className={innerClassName} attr={props.attr?.balloonContent}>
                    {props.tooltip}
                </Attr.span>
            }
            visible={visible}
            className={className}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            showArrow={true}
            positionHint={props.positionHint}
            alignmentHint={props.alignmentHint}
            dropdownSeparation={1}
            attr={{
                host: props.attr?.container,
                dropdownContainer: props.attr?.balloonContainer,
                dropdown: mergeAttributes(
                    props.attr?.balloon,
                    {className: balloonClassName}
                )
            }}
        >
            {props.children}
        </Dropdown>
    );
});

export default Balloon;
