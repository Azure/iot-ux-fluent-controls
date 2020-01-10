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
        header?: {
            container?: HeaderProps;
            title?: HeadingProps;
            closeButton?: ActionTriggerButtonAttributes & ActionTriggerAttributes;
        }
        content?: SectionProps;
        footer?: FooterProps;
    };
}

export const ContextPanel = React.memo((props: ContextPanelProperties) => {
    const panel = <Panel {...props} />;
    
    if (props.omitPortal) {
        return panel;
    }

    return (
        <Portal>
            {panel}
        </Portal>
    );
});

function Panel({ header, children, footer, onClose, attr }: ContextPanelProperties) {
    return (
        <Attr.aside
            className={cx('panel')} 
            attr={attr?.container}>
            <Attr.header className={cx('header', 'panel-container')} attr={attr?.header?.container}>
                <Attr.h2 
                    id='context-panel-title' 
                    className={cx('title', 'inline-text-overflow')} 
                    attr={attr?.header?.title}>
                    {header}
                </Attr.h2>
                <ActionTriggerButton
                    autoFocus={true}
                    icon='cancel'
                    onClick={onClose}
                    attr={attr?.header?.closeButton}
                />
            </Attr.header>
            <Attr.section className={cx('content', 'panel-container', { 'with-footer': !!footer })} attr={attr?.content}>
                {children}
            </Attr.section>
            {footer && <Attr.footer className={cx('footer', 'panel-container')} attr={attr?.footer}>
                {footer}
            </Attr.footer>}
        </Attr.aside>
    );
}

export default ContextPanel;
