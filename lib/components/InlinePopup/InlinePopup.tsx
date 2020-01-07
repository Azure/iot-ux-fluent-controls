import * as React from 'react';
import * as classNames from 'classnames/bind';
const cx = classNames.bind(require('./InlinePopup.module.scss'));

const inlinePopupDefaultProps = {
    attr: {
        tabIndex: 0,
        dataTestHook: null,
        ariaLabel: null,
        ariaDescribedBy: null
    },
};

export interface Attributes {
    tabIndex?: number;
    dataTestHook?: string;
    ariaLabel?: string;
    ariaDescribedBy?: string;
}

export interface Properties {
    expanded?: boolean; 
    className?: string;   
    disabled?: boolean;
    attr?: Attributes;
}

export class Container extends React.PureComponent<Properties> {
    public static defaultProps: Partial<Properties> = inlinePopupDefaultProps;

    render() {
        return <div data-test-hook={this.props.attr.dataTestHook} className={cx('inline-popup-container', {
            'expanded': this.props.expanded,
            'disabled': this.props.disabled
        }, this.props.className)}>
            {this.props.children}
        </div>;
    }
}

export class Label extends React.Component<Properties & { title?: string; onClick?: React.EventHandler<any>; }> {
    public static defaultProps: Partial<Properties> = inlinePopupDefaultProps;

    render() {
        const tabIndex = this.props.attr.tabIndex || 0;
        return <button
            aria-label={this.props.attr.ariaLabel}
            aria-expanded={!!this.props.expanded}
            aria-describedby={this.props.attr.ariaDescribedBy}
            title={this.props.title}
            type='button'
            className={cx('inline-popup-label', 'inline-btn', {
                'disabled': this.props.disabled
            }, this.props.className)}
            disabled={this.props.disabled}
            tabIndex={tabIndex}
            onClick={this.props.onClick}>
            {this.props.children}
        </button>;
    }
}

export class Panel extends React.Component<Properties & { alignment?: 'left' | 'right'; scrollIntoView?: boolean; }> {
    public static defaultProps: Partial<Properties> = inlinePopupDefaultProps;
    rawElement: HTMLElement;

    componentDidUpdate() {
       if (this.props.expanded && this.props.scrollIntoView) {
           this.rawElement.scrollIntoView();
        }
    }

    render() {
        if (!this.props.expanded) { return null; }
        return <div
            className={cx('inline-popup-panel', this.props.alignment, {
                'disabled': this.props.disabled
            }, this.props.className)}
            onClick={e => e.stopPropagation()}
            ref={rawElement => this.rawElement = rawElement}>
            {this.props.children}
        </div>;
    }
}
