import * as React from 'react';
import * as classNames from 'classnames/bind';
import {DivProps, Elements as Attr} from '../../Attributes';
import {Icon, IconSize, IconAttributes} from '../Icon';
const css = classNames.bind(require('./Alert.scss'));

export enum AlertType {
    Information,
    Warning,
    Error
}

export interface AlertComponentType {}

export interface AlertAttributes {
    container?: DivProps;
    icon?: IconAttributes;
    text?: DivProps;
    closeIcon?: IconAttributes;
}

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

    attr?: AlertAttributes;
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
    const icon = <Icon
        className={iconClassName} 
        size={IconSize.xsmall}
        icon={iconName}
        attr={props.attr.icon}
    />;

    const textClassName = css('text');
    const text = (
        <Attr.div
            className={textClassName}
            attr={props.attr.text}
        >
            {props.children}
        </Attr.div>
    );

    let close;
    if (props.onClose) {
        const closeClassName = css('close');
        const closeProps = {
            ...props.attr.closeIcon,
            container: {onClick: props.onClose}
        };
        close = (
            <Icon 
                className={closeClassName} 
                size={IconSize.xsmall}
                icon='cancelLegacy'
                attr={closeProps}
            />
        );
    }

    return (
        <Attr.div className={className} attr={props.attr.container}>
            {icon}
            {text}
            {close}
        </Attr.div>
    );
};

Alert.defaultProps = {
    type: AlertType.Information,
    attr: {
        container: {},
        icon: {},
        text: {},
        closeIcon: {},
    }
};

export default Alert;
