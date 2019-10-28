import * as React from 'react';
import * as classnames from 'classnames/bind';
import { ActionTriggerButton, ActionTriggerButtonAttributes, ActionTriggerAttributes } from '../ActionTrigger';
import { Elements as Attr, DivProps, HeadingProps } from '../../Attributes';
import { Portal } from './portal';

const cx = classnames.bind(require('./ContextPanel.module.scss'));

export interface ContextPanelProperties {
    onClose: React.EventHandler<any>;
    omitPortal?: boolean;
    header: React.ReactNode;
    children?: React.ReactNode;
    footer?: React.ReactNode;
    attr?: {
        container?: DivProps;
        header?: HeadingProps;
        content?: DivProps;
        footer?: DivProps;
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
        <Attr.div 
            role='complementary' 
            aria-labelledby='context-panel-title' 
            aria-describedby='context-panel-content' 
            className={cx('panel')} 
            attr={attr && attr.container}
        >
            <div className={cx('header')}>
                {header && <Attr.h2 
                    id='context-panel-title' 
                    className={cx('title', 'inline-text-overflow')} 
                    attr={attr && attr.header}
                    >
                    {header}
                </Attr.h2>}
                {onClose && <ActionTriggerButton
                    icon='cancel'
                    onClick={onClose}
                    attr={attr && attr.closeButton}
                />}
            </div>
            <Attr.div id='context-panel-content' className={cx('content')} attr={attr && attr.content}>
                {children}
            </Attr.div>
            {footer && <React.Fragment>
                <span className={cx('separator')} />
                <Attr.div className={cx('footer')} attr={attr && attr.footer}>{footer}</Attr.div>
            </React.Fragment>}
        </Attr.div>
    );
}

export default ContextPanel;