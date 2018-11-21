import * as React from 'react';
import * as classNames from 'classnames/bind';
import {Icon, IconSize} from '../Icon';
const css = classNames.bind(require('./Spinner.module.scss'));

export interface SpinnerType {}

export interface SpinnerProps extends React.Props<SpinnerType> {
    /** Classname to append to top level element */
    className?: string;
}

/**
 * Spinner showing Information, Warning, or Error with text, icon, and optional close button
 *
 * @param props Control properties (defined in `SpinnerProps` interface)
 */
export const Spinner = (props: SpinnerProps) => {
    const className = css('cs-loader-inner');
    const containerClassName = css('cs-loader', props.className);

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

export default Spinner;



