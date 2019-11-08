import * as React from 'react';
import * as classnames from 'classnames/bind';
import { ActionTriggerButton, ActionTriggerButtonAttributes, ActionTriggerAttributes } from '../ActionTrigger';
import { Elements as Attr, HeadingProps, SectionProps, AsideProps, DivProps } from '../../Attributes';
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
        header?: HeadingProps;
        content?: SectionProps;
        footer?: SectionProps;
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
            <div className={cx('content-container', 'panel-container')}>
                <div className={cx('header')}>
                    {header && <Attr.h2 
                        id='context-panel-title' 
                        className={cx('title', 'inline-text-overflow')} 
                        attr={attr?.header}
                        >
                        {header}
                    </Attr.h2>}
                    {onClose && <ActionTriggerButton
                        icon='cancel'
                        onClick={onClose}
                        attr={attr?.closeButton}
                    />}
                </div>
                <Attr.section className={cx('content')} attr={attr?.content}>
                    {children}
                </Attr.section>
            </div>
            {footer && <Attr.section className={cx('footer', 'panel-container')} attr={attr?.footer}>
                {footer}
            </Attr.section>}
        </Attr.aside>
    );
}

export default ContextPanel;