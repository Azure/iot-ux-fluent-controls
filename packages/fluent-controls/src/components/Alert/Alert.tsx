import * as React from 'react';
import * as classNames from 'classnames/bind';
import {Icon, IconSize} from '../Icon';
const cssName = classNames.bind(require('./Alert.scss'));

export enum AlertType {
    Information,
    Warning,
    Error
}

export interface AlertComponentType {}

export interface AlertProps extends React.Props<AlertComponentType> {
    icon: string;
    type?: AlertType;
    
    onClose?: () => void;
    
    fixed?: boolean;
    multiline?: boolean;

    className?: string;
}

export const Alert = (props: AlertProps) => {
    const type = props.type || AlertType.Information;
    const className = cssName({
        'alert': true,
        'info': type === AlertType.Information,
        'warning': type === AlertType.Warning,
        'error': type === AlertType.Error,
        'multiline': props.multiline,
        'fixed': !!props.fixed
    }, props.className);

    const iconClassName = cssName('icon');
    const icon = <Icon className={iconClassName} size={IconSize.xsmall} icon={props.icon} />;

    const textClassName = cssName('text');
    const text = <div className={textClassName}>{props.children}</div>;

    let close;
    if (props.onClose) {
        const closeClassName = cssName('close');
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
