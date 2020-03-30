import * as React from 'react';
import * as classNames from 'classnames/bind';
import {DivProps, Elements as Attr} from '../../Attributes';
const css = classNames.bind(require('./GalleryCard.module.scss'));

export interface SolidBackgroundAttributes {
    container?: DivProps;
}

export interface SolidBackgroundProps {
    /**
     * Fixed width and height (284 x ?? pixels)
     *
     * Default: true
     */
    fixed?: boolean;

    /**
     * Indicates if the background should set primary styles (use accent colors)
     */
    primary?: boolean;

    /**
     * Indicates if the background should set disabled styles
     */
    disabled?: boolean;

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
export const SolidBackground = React.memo(({ fixed, primary, disabled, children, className, attr }: SolidBackgroundProps) => {
    const cls = css('background-color', { 
        fixed: fixed == null || fixed, 
        primary,
        disabled
    }, className);

    return (
        <Attr.div className={cls} attr={attr?.container}>
            {children}
        </Attr.div>
    );
});

export default SolidBackground;
