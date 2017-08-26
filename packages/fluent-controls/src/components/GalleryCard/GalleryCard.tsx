import * as React from 'react';
import * as classNames from 'classnames/bind';
import * as md from '../../utilities/css';
const cx = classNames.bind(require('./GalleryCard.scss'));

let container = cx("md-card", "md-fixed");
let background = cx("md-card-background");
let icon = cx("md-card-icon");
let content = cx("md-card-content");

export interface CardSolidBackgroundType {

}

export interface CardImageBackgroundType {
    
}

export interface CardIconType {
    
}

export interface CardBannerType {
    
}

export interface GalleryCardType {

}

export const CardTest = () => {
    

    const out = () => (<div className={container}>
        <div className={background}>

        </div>
        <div className={icon}>

        </div>
        <div className={content}>
            <h1>Title</h1>
            <p>Lorem ipsum</p>
            <button>Action!</button>
        </div>
    </div>);


    return (
        <div>
            {out()}
            {out()}
            {out()}
        </div>
    );
}

export interface CardSolidBackgroundProps extends React.Props<CardSolidBackgroundType> {

}

export interface GalleryCardProps extends React.Props<GalleryCardType> {
    banner?: JSX.Element | string;
    background: JSX.Element;
    icon?: JSX.Element;

    href?: string;
    onClick?: any;

    fixed?: boolean;

    className?: string;
    dataTestHook?: string;
}

export const GalleryCard = (props: GalleryCardProps) => {
    let css = cx({
        "md-card": true,
        "md-fixed": !!props.fixed
    }, props.className || '');

    let output_props: any = {
        className: css,
        href: props.href || ''
    };
    if (props.dataTestHook) {
        output_props['data-test-hook'] = props.dataTestHook;
    }

    return (
        <a {...output_props} >
            <div className={background}>
                {props.background}
            </div>
            <div className={icon}>
                {props.icon}
            </div>
            <div className={content}>
                {props.children}
            </div>
        </a >
    );
};