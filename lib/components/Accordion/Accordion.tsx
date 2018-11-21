import * as React from 'react';
import * as classnames from 'classnames/bind';

const cx = classnames.bind(require('./Accordion.module.scss'));

export interface AccordionAttributes {
    ariaRole?: string;
    dataTestHook?: string;
}

export interface AccordionProperties {
    children: React.ReactElement<any> | Array<React.ReactElement<any>> | React.ReactChildren | React.ReactNode;
    expanded?: boolean;
    id: string;
    label: string;
    onToggle: () => void;
    attr?: AccordionAttributes;
}

export class Accordion extends React.PureComponent<AccordionProperties> {
    public static defaultProps: Partial<AccordionProperties> = {
        attr: {
            ariaRole: null,
            dataTestHook: null
        }
    };

    render() {
        return <div>
            <button
                role={this.props.attr.ariaRole}
                id={`${this.props.id}-label`}
                aria-expanded={!!this.props.expanded}
                aria-controls={`${this.props.id}-content`}
                data-test-hook={this.props.attr.dataTestHook && `${this.props.attr.dataTestHook}-label`}
                onClick={this.props.onToggle}
                className={cx('accordion-label')}
            >
                <div className={cx('inline-text-overflow')}>{this.props.label}</div>
                <i className={cx('icon', {'icon-chevronDown': !this.props.expanded, 'icon-chevronUp': !!this.props.expanded})} />
            </button>
            <div
                id={`${this.props.id}-content`}
                role='region'
                aria-labelledby={`${this.props.id}-label`}
                data-test-hook={this.props.attr.dataTestHook && `${this.props.attr.dataTestHook}-content`}
                className={cx('accordion-content', {open: !!this.props.expanded})}>
                {this.props.children}
            </div>
        </div>;
    }
}