import * as React from 'react';
import * as classNames from 'classnames/bind';
import {DivProps, Elements as Attr} from '../../Attributes';
import {Icon, IconSize, IconAttributes} from '../Icon';
import ActionTriggerButton from '../ActionTrigger/ActionTriggerButton';
const css = classNames.bind(require('./Alert.module.scss'));

export enum AlertType {
    Information,
    Warning,
    Error,
    Success
}

export interface AlertAttributes {
    container?: DivProps;
    icon?: IconAttributes;
    contents?: DivProps;
    closeButtonTitle?: string;
}

export interface AlertProps {
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

    children?: React.ReactNode;
}

/**
 * Alert showing Information, Warning, or Error with text, icon, and optional close button
 *
 * @param props Control properties (defined in `AlertProps` interface)
 */
export const Alert = React.memo((props: AlertProps) => {
    const className = css({
        'alert-container': true,
        'alert-info': props.type == null || props.type === AlertType.Information,
        'alert-warning': props.type === AlertType.Warning,
        'alert-error': props.type === AlertType.Error,
        'alert-success': props.type === AlertType.Success,
        'alert-multiline': props.multiline,
        'alert-fixed': !!props.fixed
    }, props.className);

    let iconName = props.icon;
    if (!props.icon) {
        if (props.type == null || props.type === AlertType.Information) {
            iconName = 'info';
        } else if (props.type === AlertType.Warning) {
            iconName = 'warning';
        } else if (props.type === AlertType.Error) {
            iconName = 'errorBadge';
        } else if (props.type === AlertType.Success) {
            iconName = 'checkMark';
        }
    }

    const iconClassName = css('alert-icon');
    const icon = <Icon
        className={iconClassName}
        size={IconSize.xsmall}
        icon={iconName}
        attr={props.attr?.icon}
    />;

    const textClassName = css('alert-text');
    const text = (
        <Attr.div
            className={textClassName}
            attr={props.attr?.contents}
        >
            {props.children}
        </Attr.div>
    );

    let close: React.ReactNode;
    if (props.onClose) {
        close = (
            <ActionTriggerButton
                className={css('close-button')}
                onClick={props.onClose}
                icon={'cancel'}
                attr={{
                    button: {
                        title: props.attr?.closeButtonTitle
                    },
                    container: {
                        className: css('close-button-container')
                    }
                }}
            />
        );
    }

    return (
        <Attr.div className={className} attr={props.attr?.container}>
            {icon}
            {text}
            {close}
        </Attr.div>
    );
});

export default Alert;
