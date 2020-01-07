import * as React from 'react';
import * as classNames from 'classnames/bind';
const css = classNames.bind(require('./HorizontalLoader.module.scss'));

export interface HorizontalLoaderProps {
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
export const HorizontalLoader = React.memo((props: HorizontalLoaderProps) => {
    const className = css('horizontal-loader-inner');
    const containerClassName = css('horizontal-loader');
    const numberOfDots = props.dots ?? 6;

    let dots = [];
    for (let i = 0; i < numberOfDots; i++) {
        dots.push(<div className={className} key={i}><div /></div>);
    }

    return (
        <div className={containerClassName} data-test-hook='progressbar'>
            {dots}
        </div>
    );
});

export default HorizontalLoader;
