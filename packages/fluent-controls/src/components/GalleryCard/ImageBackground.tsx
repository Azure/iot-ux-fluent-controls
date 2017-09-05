import * as React from 'react';
import * as classNames from 'classnames/bind';
const css = classNames.bind(require('./GalleryCard.scss'));

export interface ImageBackgroundType {}

export interface ImageBackgroundProps extends React.Props<ImageBackgroundType> {
    src: string;

    fixed?: boolean;
    
    className?: string;
}

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
