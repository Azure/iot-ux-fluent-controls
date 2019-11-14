import * as React from 'react';
import * as classnames from 'classnames/bind';
import { ActionTriggerButton, ActionTriggerButtonAttributes, ActionTriggerAttributes } from '../ActionTrigger';
import { Elements as Attr, SectionProps, AsideProps, DivProps, HeaderProps, HeadingProps, FooterProps } from '../../Attributes';
import { Portal } from './portal';

const cx = classnames.bind(require('./ContextPanel.module.scss'));

export interface ContextPanelProperties {
    onClose: React.EventHandler<any>;
    omitPortal?: boolean;
    header: React.ReactNode;
    children?: React.ReactNode;
    footer?: React.ReactNode;
    attr?: {
        container?: AsideProps;
        contentContainer?: DivProps;
        header?: HeaderProps;
        title?: HeadingProps;
        content?: SectionProps;
        footer?: FooterProps;
        closeButton?: ActionTriggerButtonAttributes & ActionTriggerAttributes;
    };
}

export function ContextPanel(props: ContextPanelProperties) {
    const panel = <Panel {...props} />;
    
    if (props.omitPortal) {
        return panel;
    }

    return (
        <Portal>
            {panel}
        </Portal>
    );
}

function Panel({ header, children, footer, onClose, attr }: ContextPanelProperties) {
    return (
        <Attr.aside 
            className={cx('panel')} 
            attr={attr?.container}>
            <Attr.header className={cx('panel-container')} attr={attr?.header}>
                {header && <Attr.h2 
                    id='context-panel-title' 
                    className={cx('title', 'inline-text-overflow')} 
                    attr={attr?.title}>
                    {header}
                </Attr.h2>}
                {onClose && <ActionTriggerButton
                    icon='cancel'
                    onClick={onClose}
                    attr={attr?.closeButton}
                />}
            </Attr.header>
            <Attr.section className={cx('content', 'panel-container', { 'with-header': !!header, 'with-footer': !!footer })} attr={attr?.content}>
                {children}
            </Attr.section>
            {footer && <Attr.footer className={cx('panel-container')} attr={attr?.footer}>
                {footer}
            </Attr.footer>}
        </Attr.aside>
    );
}

export default ContextPanel;