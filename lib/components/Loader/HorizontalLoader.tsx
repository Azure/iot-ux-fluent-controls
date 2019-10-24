import * as React from 'react';
import * as classNames from 'classnames/bind';
const css = classNames.bind(require('./HorizontalLoader.module.scss'));

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
export const HorizontalLoader: React.StatelessComponent<HorizontalLoaderProps> = (props: HorizontalLoaderProps) => {
    const className = css('horizontal-loader-inner');
    const containerClassName = css('horizontal-loader');

    let dots = [];
    for (let i = 0; i < props.dots; i++) {
        dots.push(<div className={className} key={i}><div /></div>);
    }

    return (
        <div className={containerClassName}>
            {dots}
        </div>
    );
};

HorizontalLoader.defaultProps = {
    dots: 6
};

export default HorizontalLoader;
