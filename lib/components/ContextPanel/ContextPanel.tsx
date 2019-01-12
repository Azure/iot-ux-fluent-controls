import * as React from 'react';
import * as classnames from 'classnames/bind';
import { ActionTriggerButton, ActionTriggerButtonAttributes, ActionTriggerAttributes } from '../ActionTrigger';
import { Elements as Attr, DivProps, HeaderProps, FooterProps } from '../../Attributes';
import { Portal } from './portal';

const cx = classnames.bind(require('./ContextPanel.module.scss'));

export interface ContextPanelProperties {
    header: React.ReactNode;
    children?: React.ReactNode;
    footer?: React.ReactNode;
    onClose: React.EventHandler<any>;
    attr?: {
        header?: HeaderProps;
        childContainer?: DivProps;
        footer?: FooterProps;
        closeButton?: ActionTriggerButtonAttributes & ActionTriggerAttributes;
    };
}

export function ContextPanel({ header, children, footer, onClose, attr }: ContextPanelProperties) {
    return (
        <Portal>
            <Attr.div key='context-panel' role='dialog' aria-labelledby='context-panel-title' aria-describedby='context-panel-content' className={cx('content-panel')}>
                <ActionTriggerButton
                    icon='cancel'
                    className={cx('close-button')}
                    onClick={onClose}
                    attr={attr && attr.closeButton}
                />
                <Attr.header id='context-panel-title' className={cx('title', 'inline-text-overflow')} attr={attr && attr.header}>{header}</Attr.header>
                <Attr.div id='context-panel-content' className={cx('content')} attr={attr && attr.childContainer}>
                    {children}
                </Attr.div>
                {footer && <React.Fragment>
                    <span className={cx('separator')} />
                    <Attr.footer className={cx('footer')} attr={attr && attr.footer}>{footer}</Attr.footer>
                </React.Fragment>}
            </Attr.div>
        </Portal>
    );
}

export default ContextPanel;