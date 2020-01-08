import * as React from 'react';
import * as classNames from 'classnames/bind';
import {DivProps, Elements as Attr} from '../../Attributes';
const css = classNames.bind(require('./GalleryCard.module.scss'));

const defaultColor = '#eaeaea';

export interface SolidBackgroundAttributes {
    container?: DivProps;
}

export interface SolidBackgroundProps {
    /**
     * Background color (accepts string color names and RGB hex values)
     *
     * Default: #eaeaea
     */
    backgroundColor?: string;

    /**
     * Fixed width and height (284 x ?? pixels)
     *
     * Default: true
     */
    fixed?: boolean;

    /** Classname to append to top level element */
    className?: string;

    children?: React.ReactNode;

    attr?: SolidBackgroundAttributes;
}

/**
 * Solid color background for `GalleryCard`
 *
 * Should usually be marked as `fixed`, otherwise it will have no dimensions
 *
 * @param props Control properties (Defined in `ImageBackgroundProps` interface)
 */
export const SolidBackground = React.memo((props: SolidBackgroundProps) => {
    const bgColor = props.backgroundColor ?? defaultColor;
    const isClass = bgColor ? bgColor.substr(0, 1) !== '#' : false;

    const cls = css(
        {
            'background-color': true,
            'fixed': props.fixed == null || props.fixed,
            [bgColor]: isClass
        },
        props.className
    );

    const style = isClass 
        ? { backgroundColor: bgColor }
        : undefined;

    return (
        <Attr.div className={cls} style={style} attr={props.attr?.container}>
            {props.children}
        </Attr.div>
    );
});

export default SolidBackground;
