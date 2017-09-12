import * as React from 'react';
import * as classNames from 'classnames/bind';
const css = classNames.bind(require('./Toggle.scss'));

export interface ToggleType {}

export interface ToggleProps extends React.Props<ToggleType> {
    on?: boolean;
    /** Disable Action Trigger */
    disabled?: boolean;

    name: string;

    onChange: (newValue: boolean) => void;

    /** Classname to append to top level element */
    className?: string;
}

/**
 * Toggle button that is an on or off state
 * 
 * @param props Control properties (defined in `ToggleProps` interface)
 */
export const Toggle: React.StatelessComponent<ToggleProps> = (props: ToggleProps) => {
    const containerClassName = css('toggle', {'toggle-on': props.on, 'disabled': props.disabled});
    const buttonClassName = css('toggle-button');
    const switchClassName = css('toggle-switch');
    const focusClassName = css('toggle-border');
    const labelClassName = css('toggle-label');

    const onClick = (event) => {
        if (!props.disabled && props.onChange) {
            props.onChange(!props.on);
        }
    };

    const tabIndex = props.disabled ? -1 : null;
    const label = props.on ? 'On' : 'Off';

    return (
        <div className={containerClassName}>
            <button
                className={buttonClassName}
                onClick={onClick}
                tabIndex={tabIndex}
                name={props.name}
            />
            <div className={focusClassName} />
            <div className={switchClassName} />
            <div className={labelClassName}>{label}</div>
        </div>
    );
};

Toggle.defaultProps = {

};

export default Toggle;
