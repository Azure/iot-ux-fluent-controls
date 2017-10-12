import * as React from 'react';
import * as classNames from 'classnames/bind';
import {DivProps, Elements as Attr} from '../../Attributes';
const css = classNames.bind(require('./GalleryCard.scss'));

export interface ImageBackgroundType {}

export interface ImageBackgroundAttributes {
    container?: DivProps;
}

export interface ImageBackgroundProps extends React.Props<ImageBackgroundType> {
    /** Background image url */
    src: string;

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
export const ImageBackground: React.StatelessComponent<ImageBackgroundProps> = (props: ImageBackgroundProps) => {
    let cls = css({
        'background-image': true,
        'fixed': !!props.fixed
    }, props.className);

    let style = {
        backgroundImage: `url(${props.src})`
    };

    return (
        <Attr.div className={cls} style={style} attr={props.attr.container}>
            {props.children}
        </Attr.div>
    );
};

ImageBackground.defaultProps = {
    src: undefined,
    fixed: true,
    attr: {
        container: {}
    }
};

export default ImageBackground;
