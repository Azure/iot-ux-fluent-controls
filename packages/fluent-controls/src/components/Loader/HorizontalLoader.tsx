import * as React from 'react';
import * as classNames from 'classnames/bind';
import {Icon, IconSize} from '../Icon';
const css = classNames.bind(require('./HorizontalLoader.scss'));

export interface HorizontalLoaderType {}

export interface HorizontalLoaderProps extends React.Props<HorizontalLoaderType> {
    /** Icon name (from Segoe UI MDL font) */
    dots?: number;

    /** Classname to append to top level element */
    className?: string;
}

/**
 * HorizontalLoader showing Information, Warning, or Error with text, icon, and optional close button
 * 
 * @param props Control properties (defined in `HorizontalLoaderProps` interface)
 */
export const HorizontalLoader = (props: HorizontalLoaderProps) => {
    const className = css('cs-loader-inner');
    const containerClassName = css('cs-loader');
    
    return (
        <div className={containerClassName}>
            <div className={className}><div></div></div>
            <div className={className}><div></div></div>
            <div className={className}><div></div></div>
            <div className={className}><div></div></div>
            <div className={className}><div></div></div>
            <div className={className}><div></div></div>
        </div>
    );
};

export default HorizontalLoader;



