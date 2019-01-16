import * as React from 'react';
import * as classnames from 'classnames/bind';
import { ActionTriggerButton, ActionTriggerButtonAttributes, ActionTriggerAttributes } from '../ActionTrigger';
import { Elements as Attr, DivProps, HeaderProps, FooterProps } from '../../Attributes';
import { Portal } from './portal';

const cx = classnames.bind(require('./ContextPanel.module.scss'));

export interface ContextPanelProperties {
    onClose: React.EventHandler<any>;
    header: React.ReactNode;
    children?: React.ReactNode;
    footer?: React.ReactNode;
    attr?: {
        container?: DivProps;
        header?: HeaderProps;
        content?: DivProps;
        footer?: FooterProps;
        closeButton?: ActionTriggerButtonAttributes & ActionTriggerAttributes;
    };
}

export function ContextPanel({ header, children, footer, onClose, attr }: ContextPanelProperties) {
    return (
        <Portal>
            <Attr.div 
                role='complementary' 
                aria-labelledby='context-panel-title' 
                aria-describedby='context-panel-content' 
                className={cx('panel')} 
                attr={attr && attr.container}
            >
                {onClose && <ActionTriggerButton
                    icon='cancel'
                    className={cx('close-button')}
                    onClick={onClose}
                    attr={attr && attr.closeButton}
                />}
                {header && <Attr.header 
                    id='context-panel-title' 
                    className={cx('title', 'inline-text-overflow')} 
                    attr={attr && attr.header}
                    >
                    {header}
                </Attr.header>}
                <Attr.div id='context-panel-content' className={cx('content')} attr={attr && attr.content}>
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