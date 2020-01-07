import * as React from 'react';
import * as classNames from 'classnames/bind';
import {DivProps, ImageProps, Elements as Attr} from '../../Attributes';
const css = classNames.bind(require('./GalleryCard.module.scss'));

export interface ImageBackgroundAttributes {
    container?: DivProps;
    image?: ImageProps;
}

export interface ImageBackgroundProps {
    /** Background image url */
    src: string;
    alt?: string;
    title?: string;

    /**
     * Fixed width and height (284 x ?? pixels)
     *
     * Default: true
     */
    fixed?: boolean;

    /** Classname to append to top level element */
    className?: string;

    attr?: ImageBackgroundAttributes;
}

/**
 * Image background for `GalleryCard`
 *
 * Should usually be marked as `fixed`, otherwise it will have no dimensions
 *
 * @param props Control properties (Defined in `ImageBackgroundProps` interface)
 */
export const ImageBackground = React.memo((props: ImageBackgroundProps) => {
    const cls = css({
        'background-image-container': true,
        'fixed': props.fixed == null || props.fixed
    }, props.className);
    return (
        <Attr.div className={cls} attr={props.attr.container}>
            <Attr.image className={css('background-image')} src={props.src} title={props.title} alt={props.alt} attr={props.attr.image}/>
        </Attr.div>
    );
});

export default ImageBackground;
