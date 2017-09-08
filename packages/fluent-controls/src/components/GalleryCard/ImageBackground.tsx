import * as React from 'react';
import * as classNames from 'classnames/bind';
const css = classNames.bind(require('./GalleryCard.scss'));

export interface ImageBackgroundType {}

export interface ImageBackgroundProps extends React.Props<ImageBackgroundType> {
    /** Background image url */
    src: string;

    /** Fixed width and height (284 x ?? pixels) */
    fixed?: boolean;
    
    /** Classname to append to top level element */
    className?: string;
}

/**
 * Image background for `GalleryCard`
 * 
 * Should usually be marked as `fixed`, otherwise it will have no dimensions
 * 
 * @param props Control properties (Defined in `ImageBackgroundProps` interface)
 */
export const ImageBackground = (props: ImageBackgroundProps) => {
    let cls = css({
        'background-image': true,
        'fixed': !!props.fixed
    }, props.className);

    let style = {
        backgroundImage: `url(${props.src})`
    };

    return (
        <div className={cls} style={style}>
            {props.children}
        </div>
    );
};
