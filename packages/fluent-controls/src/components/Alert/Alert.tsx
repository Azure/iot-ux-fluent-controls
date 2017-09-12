import * as React from 'react';
import * as classNames from 'classnames/bind';
import {Icon, IconSize} from '../Icon';
const css = classNames.bind(require('./Alert.scss'));

export enum AlertType {
    Information,
    Warning,
    Error
}

export interface AlertComponentType {}

export interface AlertProps extends React.Props<AlertComponentType> {
    /** Icon name (from Segoe UI MDL font) */
    icon?: string;
    /**
     * Alert type described using `AlertType` enum
     * 
     * (`AlertType.[Information | Warning | Error]`)
     */
    type?: AlertType;
    
    /** 
     * Callback for close button
     * 
     * (If empty, the close button is not displayed)
     */    
    onClose?: () => void;
    
    /** Fixed width (284 pixels) */
    fixed?: boolean;
    /**
     * Alert displays multiple lines
     * 
     * (By default, alerts only show one line with ellipsis overflow)
     */
    multiline?: boolean;

    /** Classname to append to top level element */
    className?: string;
}

/**
 * Alert showing Information, Warning, or Error with text, icon, and optional close button
 * 
 * @param props Control properties (defined in `AlertProps` interface)
 */
export const Alert: React.StatelessComponent<AlertProps> = (props: AlertProps) => {
    const className = css({
        'alert': true,
        'info': props.type === AlertType.Information,
        'warning': props.type === AlertType.Warning,
        'error': props.type === AlertType.Error,
        'multiline': props.multiline,
        'fixed': !!props.fixed
    }, props.className);

    let iconName = props.icon;
    if (!props.icon) {
        if (props.type === AlertType.Information) {
            iconName = 'info';
        } else if (props.type === AlertType.Warning) {
            iconName = 'warning';
        } else if (props.type === AlertType.Error) {
            iconName = 'error';
        }
    }

    const iconClassName = css('icon');
    const icon = <Icon className={iconClassName} size={IconSize.xsmall} icon={iconName} />;

    const textClassName = css('text');
    const text = <div className={textClassName}>{props.children}</div>;

    let close;
    if (props.onClose) {
        const closeClassName = css('close');
        const closeProps = { onClick: props.onClose };
        close = (
            <Icon 
                className={closeClassName} 
                size={IconSize.xsmall}
                icon='cancelLegacy'
                props={closeProps}
            />
        );
    }

    return (
        <div className={className} >
            {icon}
            {text}
            {close}
        </div>
    );
};

Alert.defaultProps = {
    type: AlertType.Information
};

export default Alert;
