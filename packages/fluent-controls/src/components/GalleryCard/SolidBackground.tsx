import * as React from 'react';
import * as classNames from 'classnames/bind';
const css = classNames.bind(require('./GalleryCard.scss'));

export interface SolidBackgroundType {}

export interface SolidBackgroundProps extends React.Props<SolidBackgroundType> {
    backgroundColor?: string;

    fixed?: boolean;

    className?: string;
}

export const SolidBackground = (props: SolidBackgroundProps) => {
    let bgColor = props.backgroundColor || '#eaeaea';

    let cls = css({
        'background-color': true,
        'fixed': !!props.fixed
    }, props.className);

    let style = {
        backgroundColor: bgColor
    };

    return (
        <div className={cls} style={style}>
            {props.children}            
        </div>
    );
};